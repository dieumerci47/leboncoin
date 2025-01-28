const express = require("express");
const { getProduit } = require("../Controllers/produitsControllers");
const Router = express.Router();

Router.get("/produits", getProduit);

module.exports = Router;
