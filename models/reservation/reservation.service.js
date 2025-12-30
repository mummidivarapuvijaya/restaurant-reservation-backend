const Reservation = require("./reservation.schema");
const Table = require("../table/table.schema");

exports.createReservation = async (userId, data) => {
  const { date, timeSlot, guests } = data;

  const tables = await Table.find({ capacity: { $gte: guests } });

  for (const table of tables) {
    const conflict = await Reservation.findOne({
      table: table._id,
      date,
      timeSlot
    });

    if (!conflict) {
      return Reservation.create({
        user: userId,
        table: table._id,
        date,
        timeSlot,
        guests
      });
    }
  }

  throw new Error("No available tables for selected time");
};

exports.getUserReservations = (userId) => {
  return Reservation.find({ user: userId }).populate("table");
};

exports.getAllReservations = () => {
  return Reservation.find()
    .populate("user", "email")
    .populate("table", "tableNumber capacity");
};


exports.cancelReservation = (id) => {
  return Reservation.findByIdAndDelete(id);
};

exports.getReservationsByDate = (date) => {
  return Reservation.find({ date })
    .populate("user", "email")
    .populate("table", "tableNumber capacity");
};

exports.updateReservation = (id, data) => {
  return Reservation.findByIdAndUpdate(id, data, { new: true });
};
