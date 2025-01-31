const express = require("express");
const {
  createOrder,
  getOrder,
  updateOrderStatus,
} = require("../Controllers/ordersControllers");
const router = express.Router();

router.post("/addorders", createOrder);
router.get("/getorders", getOrder);
router.put("/updateorder/:id", updateOrderStatus);

module.exports = router;
