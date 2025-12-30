const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  table: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  guests: { type: Number, required: true }
});

module.exports = mongoose.model("Reservation", reservationSchema);
