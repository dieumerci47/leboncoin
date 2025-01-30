import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNotification } from "../../context/NotificationContext";
import "./ProductList.css";

function ProductList({ onEdit }) {
  const { showNotification } = useNotification();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/leboncoin/produits"
        );
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des produits");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (productId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      // Ici, ajoutez la logique de suppression avec le backend
      console.log("Suppression du produit:", productId);
      showNotification("Produit supprimé avec succès", "success");
    }
  };

  if (loading) {
    return <div>Chargement des produits...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className="product-list">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Prix</th>
            <th>Catégorie</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-thumbnail"
                  />
                ) : (
                  <div className="no-image">Pas d&apos;image</div>
                )}
              </td>
              <td>{product.name}</td>
              <td>
                {product.price} <strong>FCFA</strong>{" "}
              </td>
              <td>{product.category}</td>
              <td>
                <span
                  className={`status ${
                    product.available ? "in-stock" : "out-of-stock"
                  }`}
                >
                  {product.available ? "En stock" : "Sur commande"}
                </span>
              </td>
              <td className="actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => onEdit(product)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleDelete(product._id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ProductList.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default ProductList;
