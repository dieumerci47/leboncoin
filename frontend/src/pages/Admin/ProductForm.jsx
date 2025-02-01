import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNotification } from "../../context/NotificationContext";
import "./ProductForm.css";
import { compressImage, validateImage } from "../../utils/imageUtils";

function ProductForm({ product, onSave, onCancel }) {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    available: true,
    image: "",
  });

  // Nouvel état pour la recherche
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedProduct, setSearchedProduct] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        available: product.available,
        image: product.image,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fonction de recherche de produit
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      showNotification("Veuillez entrer un terme de recherche.", "error");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/leboncoin/getorders?search=${searchTerm}`
      ); // Adapter l'URL si nécessaire
      if (!response.ok) {
        throw new Error("Erreur lors de la recherche du produit");
      }
      const data = await response.json();

      if (data.length === 0) {
        showNotification("Produit non trouvé.", "error");
        setSearchedProduct(null);
      } else {
        const foundProduct = data[0]; // Supposant que le nom est unique
        setSearchedProduct(foundProduct);
        setFormData({
          name: foundProduct.name,
          price: foundProduct.price,
          description: foundProduct.description,
          category: foundProduct.category,
          available: foundProduct.available,
          image: foundProduct.image,
        });
        showNotification("Produit trouvé. Vous pouvez le modifier.", "success");
      }
    } catch (error) {
      showNotification("Erreur lors de la recherche du produit.", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price ? Number(formData.price) : 0);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("available", formData.available ? "true" : "false");
    if (e.target.image.files[0]) {
      formDataToSend.append("file", e.target.image.files[0]);
    }

    try {
      const method = searchedProduct ? "PUT" : "POST";
      const url = searchedProduct
        ? `http://localhost:5000/leboncoin/produits/${searchedProduct._id}`
        : "http://localhost:5000/leboncoin/addproduits";

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(
          "Erreur lors de l'ajout ou de la modification du produit"
        );
      }

      const result = await response.json();
      showNotification("Produit enregistré avec succès", "success");
      onSave(result);
    } catch (error) {
      showNotification(
        "Erreur lors de l'enregistrement du produit. Veuillez réessayer.",
        error
      );
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        validateImage(file);
        const compressedImage = await compressImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, image: reader.result });
        };
        reader.readAsDataURL(compressedImage);
      } catch (error) {
        showNotification(error.message, "error");
      }
    }
  };

  return (
    <div className="product-form-container">
      <h2>{searchedProduct ? "Modifier Produit" : "Ajouter Produit"}</h2>

      {/* Section de recherche */}
      <div className="search-product">
        <input
          type="text"
          placeholder="Rechercher un produit par nom"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSearch}
        >
          Rechercher
        </button>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        {/* Champs du formulaire */}
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Prix (€)</label>
          <input
            type="number"
            id="price"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Catégorie</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={formData.available}
              onChange={(e) =>
                setFormData({ ...formData, available: e.target.checked })
              }
            />
            En stock
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image du produit</label>
          <input
            type="file"
            id="image"
            name="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {formData.image && (
            <img src={formData.image} alt="Aperçu" className="image-preview" />
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Annuler
          </button>
          <button type="submit" className="btn btn-primary">
            {searchedProduct ? "Modifier" : "Ajouter"}
          </button>
        </div>
      </form>
    </div>
  );
}

ProductForm.propTypes = {
  product: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ProductForm;
