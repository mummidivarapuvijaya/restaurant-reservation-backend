const router = require("express").Router();
const controller = require("./user.controller");
const auth = require("../../middleware/auth");

// Public routes
router.post("/register", controller.register);
router.post("/login", controller.login);

// Protected routes
router.get("/profile", auth, controller.getProfile);

module.exports = router;
