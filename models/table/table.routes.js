const router = require("express").Router();
const controller = require("./table.controller");
const auth = require("../../middleware/auth");
const role = require("../../middleware/role");

// Get all tables - Any authenticated user
router.get("/", auth, controller.getTables);

// Admin only routes
router.post("/", auth, role("ADMIN"), controller.createTable);
router.put("/:id", auth, role("ADMIN"), controller.updateTable);
router.delete("/:id", auth, role("ADMIN"), controller.deleteTable);

module.exports = router;
