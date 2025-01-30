const express = require("express");
const {
  getProduit,
  addProduit,
  deleteProduit,
  updateProduit,
} = require("../Controllers/produitsControllers");
const authPost = require("../Middlewares/authPost");
const Router = express.Router();

Router.get("/produits", getProduit);
Router.post("/addproduits", authPost, addProduit);
Router.delete("/deleteproduits/:id", deleteProduit);
Router.put("/produits/:id", authPost, updateProduit);

module.exports = Router;
