import { useState } from "react";
import { useNotification } from "../../context/NotificationContext";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import "./ProductManager.css";

function ProductManager() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { showNotification } = useNotification();

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSave = (productData) => {
    // Ici, vous ajouterez la logique pour sauvegarder dans le backend
    console.log("Produit à sauvegarder:", productData);
    showNotification(
      `Produit ${editingProduct ? "modifié" : "ajouté"} avec succès`,
      "success"
    );
    setShowForm(false);
  };

  return (
    <div className="product-manager">
      <div className="manager-header">
        <h2>Gestion des Produits</h2>
        <button className="btn btn-primary" onClick={handleAddProduct}>
          Ajouter un produit
        </button>
      </div>

      {showForm ? (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <ProductList onEdit={handleEditProduct} />
      )}
    </div>
  );
}

export default ProductManager;
