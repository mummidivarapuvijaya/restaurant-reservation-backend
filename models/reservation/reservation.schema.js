const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  table: { type: mongoose.Schema.Types.ObjectId, ref: "Table", required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  guests: { type: Number, required: true },
  status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reservation", reservationSchema);
