const express = require("express");
const mongoose = require("mongoose");
const RouterProduits = require("./Routes/produitsRoutes");
require("dotenv").config();
const app = express();
mongoose
  .connect(process.env.DBCONNECTION)
  .then(console.log("Connection réussi à la base de donnéé"))
  .catch((e) => {
    console.log("Connection échoué à la base de donneé", e);
  });
const port = process.env.PORT;
app.get("/", (req, res) => {
  res.status(200).json("Bienvenu sur l'api");
});
app.use("/leboncoin", RouterProduits);
app.listen(port, () => {
  console.log(`le server est lancé sur le port ${port} `);
});
