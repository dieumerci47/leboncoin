import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNotification } from "../../context/NotificationContext";
import "./ProductList.css";

function ProductList({ onEdit }) {
  const { showNotification } = useNotification();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Nouvel état pour la recherche
  const [searchTerm, setSearchTerm] = useState("");

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

  // Fonction de filtrage des produits
  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const descriptionMatch = product.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch = product.category
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return nameMatch || descriptionMatch || categoryMatch;
  });

  const handleDelete = async (productId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/leboncoin/produits/${productId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la suppression du produit");
        }

        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        showNotification("Produit supprimé avec succès", "success");
      } catch (error) {
        showNotification("Erreur lors de la suppression du produit", error);
      }
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
      <h2>Liste des Produits</h2>

      {/* Section Recherche */}
      <div className="search-product">
        <input
          type="text"
          placeholder="Rechercher par nom, description ou catégorie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Catégorie</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
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
              <td>{product.description}</td>
              <td>
                {product.price} <strong>FCFA</strong>
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
