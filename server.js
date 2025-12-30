require("dotenv").config(); // 🔥 MUST be first line

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());

require("./routes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
