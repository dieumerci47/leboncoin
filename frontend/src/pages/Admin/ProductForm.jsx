import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNotification } from "../../context/NotificationContext";
import "./ProductForm.css";
import { compressImage, validateImage } from "../../utils/imageUtils";

function ProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    available: true,
    image: "",
  });

  const { showNotification } = useNotification();

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

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
      const method = product ? "PUT" : "POST";
      const url = product
        ? `http://localhost:5000/leboncoin/produits/${product._id}`
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
      showNotification(error.message, "error");
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
    <form className="product-form" onSubmit={handleSubmit}>
      <h3>{product ? "Modifier le produit" : "Nouveau produit"}</h3>

      <div className="form-group">
        <label htmlFor="name">Nom du produit</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Catégorie</label>
        <input
          type="text"
          id="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
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
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Annuler
        </button>
        <button type="submit" className="btn btn-primary">
          {product ? "Modifier" : "Ajouter"}
        </button>
      </div>
    </form>
  );
}

ProductForm.propTypes = {
  product: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ProductForm;
