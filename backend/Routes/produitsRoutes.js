const express = require("express");
const {
  getProduit,
  addProduit,
} = require("../Controllers/produitsControllers");
const authPost = require("../Middlewares/authPost");
const Router = express.Router();

Router.get("/produits", getProduit);
Router.post("/addproduits", authPost, addProduit);

module.exports = Router;
