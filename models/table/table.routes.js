const router = require("express").Router();
const controller = require("./table.controller");
const auth = require("../../middleware/auth");
const role = require("../../middleware/role");

router.post("/", auth, role("ADMIN"), controller.createTable);
router.get("/", auth, controller.getTables);
router.get("/tables",auth,role("ADMIN"),async (req, res) => {const tables = await controller.find();res.json(tables);});


module.exports = router;
