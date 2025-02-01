const express = require("express");
const { createAdmin, loginAdmin } = require("../Controllers/adminControllers");
const router = express.Router();

router.post("/addadmin", createAdmin);
router.post("/loginadmin", loginAdmin);

module.exports = router;
