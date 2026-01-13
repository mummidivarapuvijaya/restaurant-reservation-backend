const router = require("express").Router();
const controller = require("./reservation.controller");
const auth = require("../../middleware/auth");
const role = require("../../middleware/role");

router.post("/", auth, controller.createReservation);
router.get("/my", auth, controller.getMyReservations);
router.delete("/:id", auth, controller.cancelMyReservation);

router.get("/all", auth, role("ADMIN"), controller.getAllReservations);
router.get("/by-date", auth, role("ADMIN"), controller.getReservationsByDate);
router.put("/:id", auth, role("ADMIN"), controller.updateReservation);
router.delete("/admin/:id", auth, role("ADMIN"), controller.cancelReservation);

module.exports = router;
