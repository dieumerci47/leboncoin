const express = require("express");
const { createOrder, getOrder } = require("../Controllers/ordersControllers");
const router = express.Router();

router.post("/addorders", createOrder);
router.get("/getorders", getOrder);

module.exports = router;
