require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); 

const app = express();

connectDB();

// CORS CONFIG
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://restaurant-reservation-system-fe.netlify.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

require("./routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
