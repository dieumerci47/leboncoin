const adminModel = require("../model/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.createAdmin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Email et mot de passe sont requis" });
    }
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new adminModel({ email, password: hashedPassword });
    await admin.save();
    res.status(201).json("Admin créé avec succès");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Admin non trouvé" });
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Mot de passe incorrect" });
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
