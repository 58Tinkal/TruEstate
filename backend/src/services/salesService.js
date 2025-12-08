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

  // 🔍 1. Search: Customer Name + Phone Number (case-insensitive)
  const searchTerm = search.trim();
  if (searchTerm) {
    const regex = new RegExp(searchTerm, "i");
    mongoQuery.$or = [{ customerName: regex }, { phoneNumber: regex }];
  }

  // 🧊 2. Filters
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
  if (minAge !== null || maxAge !== null) {
    mongoQuery.age = {};
    if (minAge !== null) mongoQuery.age.$gte = minAge;
    if (maxAge !== null) mongoQuery.age.$lte = maxAge;
  }

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  if (start || end) {
    mongoQuery.date = {};
    if (start) mongoQuery.date.$gte = start;
    if (end) mongoQuery.date.$lte = end;
  }

  // 🔁 3. Sorting
  const sortMap = {
    date: "date",
    quantity: "quantity",
    customerName: "customerName"
  };
  const sortField = sortMap[sortBy] || "date";
  const sortDir = sortOrder === "asc" ? 1 : -1;

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const skip = (pageNum - 1) * PAGE_SIZE;

  // 📊 4. Query + Summary
  const [rows, total, summaryAgg] = await Promise.all([
    Sale.find(mongoQuery)
      .sort({ [sortField]: sortDir })
      .skip(skip)
      .limit(PAGE_SIZE),
    Sale.countDocuments(mongoQuery),
    Sale.aggregate([
      { $match: mongoQuery },
      {
        $group: {
          _id: null,
          totalUnits: { $sum: "$quantity" },
          // Total amount = sum of finalAmount (after discount)
          totalAmount: { $sum: "$finalAmount" },
          // Total discount = sum(totalAmount - finalAmount)
          totalDiscount: {
            $sum: {
              $subtract: ["$totalAmount", "$finalAmount"]
            }
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
