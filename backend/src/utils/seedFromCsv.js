import "dotenv/config";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import Sale from "../models/Sale.js";

const __dirname = path.resolve();
const CSV_PATH = process.env.CSV_PATH || path.join(__dirname, "data.csv");

// Try to parse common date formats safely
function parseDateSafe(rawDate) {
  if (!rawDate) return null;

  const s = String(rawDate).trim();
  if (!s) return null;

  // 1) native Date
  const native = new Date(s);
  if (!isNaN(native.valueOf())) return native;

  // 2) DD/MM/YYYY or DD-MM-YYYY
  let m = s.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
  if (m) {
    const [_, dd, mm, yyyy] = m;
    const d = Number(dd);
    const mon = Number(mm) - 1;
    const y = Number(yyyy);
    const dObj = new Date(y, mon, d);
    if (!isNaN(dObj.valueOf())) return dObj;
  }

  // 3) YYYY/MM/DD or YYYY-MM-DD
  m = s.match(/^(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})$/);
  if (m) {
    const [_, yyyy, mm, dd] = m;
    const d = Number(dd);
    const mon = Number(mm) - 1;
    const y = Number(yyyy);
    const dObj = new Date(y, mon, d);
    if (!isNaN(dObj.valueOf())) return dObj;
  }

  return null; // store as null if not parseable
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    await Sale.deleteMany({});
    console.log("🧹 Cleared existing sales data");

    const BATCH_SIZE = 5000; // adjust if you want
    let batch = [];
    let rowCount = 0;
    let insertedCount = 0;
    let invalidDateCount = 0;

    await new Promise((resolve, reject) => {
      const stream = fs.createReadStream(CSV_PATH).pipe(csv());

      stream.on("data", (raw) => {
        rowCount++;
        try {
          const parsedDate = parseDateSafe(raw["Date"]);
          if (!parsedDate) {
            invalidDateCount++;
            if (invalidDateCount <= 3) {
              console.warn(
                `⚠️ Invalid date on row ${rowCount}:`,
                raw["Date"]
              );
            }
          }

          const doc = {
            transactionId: raw["Transaction ID"],
            date: parsedDate, // can be null

            customerId: raw["Customer ID"],
            customerName: raw["Customer Name"] || "",
            phoneNumber: raw["Phone Number"]
              ? String(raw["Phone Number"])
              : "",
            gender: raw["Gender"] || "",
            age: raw["Age"] ? Number(raw["Age"]) : null,
            customerRegion: raw["Customer Region"] || "",
            customerType: raw["Customer Type"] || "",

            productId: raw["Product ID"],
            productName: raw["Product Name"] || "",
            brand: raw["Brand"] || "",
            productCategory: raw["Product Category"] || "",
            tags: (raw["Tags"] || "")
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),

            quantity: raw["Quantity"] ? Number(raw["Quantity"]) : 0,
            pricePerUnit: raw["Price per Unit"]
              ? Number(raw["Price per Unit"])
              : 0,
            discountPercentage: raw["Discount Percentage"]
              ? Number(raw["Discount Percentage"])
              : 0,
            totalAmount: raw["Total Amount"]
              ? Number(raw["Total Amount"])
              : 0,
            finalAmount: raw["Final Amount"]
              ? Number(raw["Final Amount"])
              : 0,

            paymentMethod: raw["Payment Method"] || "",
            orderStatus: raw["Order Status"] || "",
            deliveryType: raw["Delivery Type"] || "",

            storeId: raw["Store ID"] || "",
            storeLocation: raw["Store Location"] || "",

            salespersonId: raw["Salesperson ID"] || "",
            employeeName: raw["Employee Name"] || ""
          };

          batch.push(doc);

          if (batch.length >= BATCH_SIZE) {
            // pause reading while we insert
            stream.pause();

            Sale.insertMany(batch)
              .then((res) => {
                insertedCount += res.length;
                batch = [];
                console.log(`💾 Inserted ${insertedCount} docs so far...`);
                stream.resume();
              })
              .catch((err) => {
                console.error("❌ Batch insert error:", err);
                reject(err);
              });
          }
        } catch (e) {
          console.error(`Row ${rowCount} parse error:`, e.message);
        }
      });

      stream.on("end", async () => {
        try {
          // flush remaining docs
          if (batch.length > 0) {
            const res = await Sale.insertMany(batch);
            insertedCount += res.length;
          }

          console.log(`📄 Parsed rows: ${rowCount}`);
          console.log(`💾 Total inserted: ${insertedCount}`);
          if (invalidDateCount > 0) {
            console.log(
              `⚠️ Rows with invalid dates (stored as null): ${invalidDateCount}`
            );
          }

          resolve();
        } catch (err) {
          reject(err);
        }
      });

      stream.on("error", (err) => {
        console.error("❌ Stream error:", err);
        reject(err);
      });
    });

    console.log("✅ Seeding completed successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();
