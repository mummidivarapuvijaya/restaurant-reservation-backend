const router = require("express").Router();
const controller = require("./reservation.controller");
const auth = require("../../middleware/auth");
const role = require("../../middleware/role");

router.post("/", auth, controller.createReservation);
router.get("/my", auth, controller.getMyReservations);
router.get("/all", auth, role("ADMIN"), controller.getAllReservations);
router.delete("/:id", auth, controller.cancelReservation);
router.get(  "/by-date", auth,role("ADMIN"),controller.getReservationsByDate);
router.delete("/admin/:id",auth,role("ADMIN"),controller.cancelReservation);
router.put("/admin/:id",auth,role("ADMIN"),controller.updateReservation);

module.exports = router;
