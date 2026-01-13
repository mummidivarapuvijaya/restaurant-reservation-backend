const Reservation = require("./reservation.schema");
const Table = require("../table/table.schema");

exports.createReservation = async (userId, data) => {
  const { date, timeSlot, guests } = data;

  if (!date || !timeSlot || !guests) {
    throw new Error("Date, timeSlot, and guests are required");
  }

  if (guests < 1) {
    throw new Error("Number of guests must be at least 1");
  }

  // Find tables with enough capacity, sorted by smallest first
  const tables = await Table.find({ capacity: { $gte: guests } }).sort({ capacity: 1 });

  if (tables.length === 0) {
    throw new Error("No tables available for this party size");
  }

  // Find first available table (no conflict)
  for (const table of tables) {
    const conflict = await Reservation.findOne({
      table: table._id,
      date,
      timeSlot,
      status: "confirmed"
    });

    if (!conflict) {
      const reservation = await Reservation.create({
        user: userId,
        table: table._id,
        date,
        timeSlot,
        guests,
        status: "confirmed"
      });
      return reservation.populate("table");
    }
  }

  throw new Error("No available tables for selected date and time");
};

exports.getUserReservations = (userId) => {
  return Reservation.find({ user: userId })
    .populate("table")
    .sort({ date: -1 });
};

exports.getAllReservations = () => {
  return Reservation.find()
    .populate("user", "name email")
    .populate("table", "tableNumber capacity")
    .sort({ date: -1 });
};

exports.getReservationsByDate = (date) => {
  return Reservation.find({ date })
    .populate("user", "name email")
    .populate("table", "tableNumber capacity")
    .sort({ timeSlot: 1 });
};

exports.cancelUserReservation = async (id, userId) => {
  const reservation = await Reservation.findOne({ _id: id, user: userId });
  if (!reservation) return null;
  return Reservation.findByIdAndDelete(id);
};

exports.cancelReservation = (id) => {
  return Reservation.findByIdAndDelete(id);
};

exports.updateReservation = async (id, data) => {
  // Check for conflicts if updating date/timeSlot
  if (data.date || data.timeSlot) {
    const existing = await Reservation.findById(id);
    if (!existing) return null;

    const conflict = await Reservation.findOne({
      _id: { $ne: id },
      table: data.table || existing.table,
      date: data.date || existing.date,
      timeSlot: data.timeSlot || existing.timeSlot,
      status: "confirmed"
    });

    if (conflict) {
      throw new Error("Time slot conflict with existing reservation");
    }
  }

  return Reservation.findByIdAndUpdate(id, data, { new: true })
    .populate("user", "name email")
    .populate("table", "tableNumber capacity");
};
