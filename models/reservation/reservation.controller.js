const service = require("./reservation.service");

exports.createReservation = async (req, res) => {
  try {
    const reservation = await service.createReservation(req.user.id, req.body);
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMyReservations = async (req, res) => {
  try {
    const reservations = await service.getUserReservations(req.user.id);
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await service.getAllReservations();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReservationsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: "Date parameter is required" });
    }
    const reservations = await service.getReservationsByDate(date);
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelMyReservation = async (req, res) => {
  try {
    const result = await service.cancelUserReservation(req.params.id, req.user.id);
    if (!result) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json({ message: "Reservation cancelled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const result = await service.cancelReservation(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json({ message: "Reservation cancelled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const updated = await service.updateReservation(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
