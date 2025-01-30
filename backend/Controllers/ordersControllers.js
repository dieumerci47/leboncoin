const Order = require("../model/orderModel");

module.exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la création de la commande",
      error: err,
    });
  }
};
module.exports.getOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la création de la commande",
      error: err,
    });
  }
};
