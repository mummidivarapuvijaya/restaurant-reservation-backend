require("dotenv").config();
const mongoose = require("mongoose");
const Table = require("../models/table/table.schema");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

const tables = [
  { tableNumber: 1, capacity: 2 },
  { tableNumber: 2, capacity: 4 },
  { tableNumber: 3, capacity: 6 }
];

const seedTables = async () => {
  try {
    await Table.insertMany(tables);
    console.log("Tables seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedTables();
