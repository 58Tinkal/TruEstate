import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    // From CSV
    transactionId: String,          // Transaction ID
    date: Date,                     // Date

    customerId: String,             // Customer ID
    customerName: String,           // Customer Name
    phoneNumber: String,            // Phone Number
    gender: String,                 // Gender
    age: Number,                    // Age
    customerRegion: String,         // Customer Region
    customerType: String,           // Customer Type

    productId: String,              // Product ID
    productName: String,            // Product Name
    brand: String,                  // Brand
    productCategory: String,        // Product Category
    tags: [String],                 // Tags (comma-separated in CSV)

    quantity: Number,               // Quantity
    pricePerUnit: Number,           // Price per Unit
    discountPercentage: Number,     // Discount Percentage
    totalAmount: Number,            // Total Amount (before discount?)
    finalAmount: Number,            // Final Amount (after discount)

    paymentMethod: String,          // Payment Method
    orderStatus: String,            // Order Status
    deliveryType: String,           // Delivery Type

    storeId: String,                // Store ID
    storeLocation: String,          // Store Location

    salespersonId: String,          // Salesperson ID
    employeeName: String            // Employee Name
  },
  { timestamps: false }
);

export default mongoose.model("Sale", saleSchema);
