const express = require("express");
const cors = require("cors");
const app = express();

// CORS CONFIG (ALLOW NETLIFY)
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
