require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user/user.schema");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@restaurant.com" });
    
    if (existingAdmin) {
      console.log("Admin already exists: admin@restaurant.com");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin User",
      email: "admin@restaurant.com",
      password: hashedPassword,
      role: "ADMIN"
    });

    console.log("Admin created: admin@restaurant.com / admin123");
    process.exit();
  } catch (error) {
    console.error("Failed:", error.message);
    process.exit(1);
  }
};

createAdmin();
