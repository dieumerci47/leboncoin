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
      message: "Erreur lors du chargement des commandes",
      error: err,
    });
  }
};

module.exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du statut de la commande",
      error: err,
    });
  }
};
