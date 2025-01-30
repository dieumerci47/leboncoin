const productModel = require("../model/productModel");
module.exports.getProduit = async (req, res) => {
  await productModel
    .find()
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((e) => {
      return res.status(401).json(e);
    });
};
module.exports.addProduit = async (req, res) => {
  let ImageURL = "";
  if (req.file) {
    ImageURL = `${req.protocol}://${req.get("host")}/public/images/${
      req.file.filename
    }`;
  } else {
    console.log("no file");
  }
  const Product = new productModel({
    ...req.body,
    image: ImageURL,
  });
  try {
    await Product.save();
    res.status(200).json("Produit ajouté");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur lors de l'ajout du produit" });
  }
};
module.exports.deleteProduit = async (req, res) => {
  try {
    await productModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json("Produit supprimé");
  } catch (err) {
    res.status(500).json("Erreur lors de la suppression du produit");
  }
};
module.exports.updateProduit = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.status(200).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du produit" });
  }
};
