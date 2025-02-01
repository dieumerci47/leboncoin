const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const RouterProduits = require("./Routes/produitsRoutes");
const RouterOrders = require("./Routes/ordersRoutes");
const RouterAdmin = require("./Routes/adminRoutes");
require("dotenv").config();

const app = express();
mongoose
  .connect(process.env.DBCONNECTION)
  .then(() => {
    console.log("Connecté à MongoDB");
    // Démarrage du serveur après la connexion à MongoDB
  })
  .catch((err) => {
    console.error("Erreur de connexion à MongoDB", err);
  });

const path = require("path");

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).json("Bienvenu sur l'api");
});
app.use("/leboncoin", RouterProduits);
app.use("/leboncoin", RouterOrders);
app.use("/leboncoin", RouterAdmin);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur est lancé sur le port ${PORT}`);
});
