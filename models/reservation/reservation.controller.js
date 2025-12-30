const service = require("./reservation.service");

exports.createReservation = async (req, res) => {
  try {
    const reservation = await service.createReservation(
      req.user.id,
      req.body
    );
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMyReservations = async (req, res) => {
  const reservations = await service.getUserReservations(req.user.id);
  res.json(reservations);
};

exports.getAllReservations = async (req, res) => {
  const reservations = await service.getAllReservations();
  res.json(reservations);
};

exports.cancelReservation = async (req, res) => {
  await service.cancelReservation(req.params.id);
  res.json({ message: "Reservation cancelled" });
};

exports.getReservationsByDate = async (req, res) => {
  const { date } = req.query;
  const reservations = await service.getReservationsByDate(date);
  res.json(reservations);
};

exports.updateReservation = async (req, res) => {
  const updated = await service.updateReservation(
    req.params.id,
    req.body
  );
  res.json(updated);
};
