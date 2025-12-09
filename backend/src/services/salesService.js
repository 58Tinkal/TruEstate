import Sale from "../models/Sale.js";

function parseList(value) {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export async function getSales(query) {
  const {
    search = "",
    regions,
    genders,
    ageMin,
    ageMax,
    categories,
    tags,
    paymentMethods,
    startDate,
    endDate,
    sortBy = "date",
    sortOrder = "desc",
    page = 1
  } = query;

  const PAGE_SIZE = 10;
  const mongoQuery = {};

  const searchTerm = String(search || "").trim();
  if (searchTerm) {
    try {
      const escapedSearch = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escapedSearch, "i");
      mongoQuery.$or = [
        { customerName: { $exists: true, $regex: regex } },
        { phoneNumber: { $exists: true, $regex: regex } }
      ];
    } catch (err) {
      mongoQuery.$or = [
        { customerName: searchTerm },
        { phoneNumber: searchTerm }
      ];
    }
  }

  const regionList = parseList(regions);
  const genderList = parseList(genders);
  const categoryList = parseList(categories);
  const tagList = parseList(tags);
  const paymentList = parseList(paymentMethods);

  if (regionList.length) mongoQuery.customerRegion = { $in: regionList };
  if (genderList.length) mongoQuery.gender = { $in: genderList };
  if (categoryList.length) mongoQuery.productCategory = { $in: categoryList };
  if (paymentList.length) mongoQuery.paymentMethod = { $in: paymentList };
  if (tagList.length) mongoQuery.tags = { $in: tagList };

  const minAge = ageMin ? Number(ageMin) : null;
  const maxAge = ageMax ? Number(ageMax) : null;
  if (minAge !== null && !isNaN(minAge) && minAge >= 0) {
    if (!mongoQuery.age) mongoQuery.age = {};
    mongoQuery.age.$gte = minAge;
  }
  if (maxAge !== null && !isNaN(maxAge) && maxAge >= 0) {
    if (!mongoQuery.age) mongoQuery.age = {};
    mongoQuery.age.$lte = maxAge;
  }
  if (minAge !== null && maxAge !== null && !isNaN(minAge) && !isNaN(maxAge) && minAge > maxAge) {
    return {
      data: [],
      meta: {
        page: 1,
        pageSize: PAGE_SIZE,
        totalItems: 0,
        totalPages: 1
      },
      summary: {
        totalUnits: 0,
        totalAmount: 0,
        totalDiscount: 0
      }
    };
  }

  if (startDate || endDate) {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    if (start && isNaN(start.getTime())) {
      return {
        data: [],
        meta: {
          page: 1,
          pageSize: PAGE_SIZE,
          totalItems: 0,
          totalPages: 1
        },
        summary: {
          totalUnits: 0,
          totalAmount: 0,
          totalDiscount: 0
        }
      };
    }
    if (end && isNaN(end.getTime())) {
      return {
        data: [],
        meta: {
          page: 1,
          pageSize: PAGE_SIZE,
          totalItems: 0,
          totalPages: 1
        },
        summary: {
          totalUnits: 0,
          totalAmount: 0,
          totalDiscount: 0
        }
      };
    }

    if (start && end && start > end) {
      return {
        data: [],
        meta: {
          page: 1,
          pageSize: PAGE_SIZE,
          totalItems: 0,
          totalPages: 1
        },
        summary: {
          totalUnits: 0,
          totalAmount: 0,
          totalDiscount: 0
        }
      };
    }

    if (start || end) {
      mongoQuery.date = {};
      if (start) {
        start.setHours(0, 0, 0, 0);
        mongoQuery.date.$gte = start;
      }
      if (end) {
        end.setHours(23, 59, 59, 999);
        mongoQuery.date.$lte = end;
      }
    }
  }

  const sortMap = {
    date: "date",
    quantity: "quantity",
    customerName: "customerName"
  };
  const sortField = sortMap[sortBy] || "date";
  const validSortOrder = sortOrder === "asc" ? 1 : -1;

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const skip = (pageNum - 1) * PAGE_SIZE;

  // 📊 4. Query + Summary
  const [rows, total, summaryAgg] = await Promise.all([
    Sale.find(mongoQuery)
      .sort({ [sortField]: validSortOrder })
      .skip(skip)
      .limit(PAGE_SIZE),
    Sale.countDocuments(mongoQuery),
    Sale.aggregate([
      { $match: mongoQuery },
      {
        $project: {
          quantity: { $ifNull: ["$quantity", 0] },
          totalAmount: { $ifNull: ["$totalAmount", 0] },
          finalAmount: { $ifNull: ["$finalAmount", 0] }
        }
      },
      {
        $group: {
          _id: null,
          totalUnits: { $sum: "$quantity" },
          totalAmount: { $sum: "$finalAmount" },
          totalDiscount: {
            $sum: { $subtract: ["$totalAmount", "$finalAmount"] }
          }
        }
      }
    ])
  ]);

  const summaryDoc = summaryAgg[0] || {
    totalUnits: 0,
    totalAmount: 0,
    totalDiscount: 0
  };

  return {
    data: rows,
    meta: {
      page: pageNum,
      pageSize: PAGE_SIZE,
      totalItems: total,
      totalPages: Math.max(Math.ceil(total / PAGE_SIZE), 1)
    },
    summary: {
      totalUnits: summaryDoc.totalUnits,
      totalAmount: summaryDoc.totalAmount,
      totalDiscount: summaryDoc.totalDiscount
    }
  };
}
