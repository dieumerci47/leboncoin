import PropTypes from "prop-types";
import { useNotification } from "../../context/NotificationContext";
import "./ProductList.css";

function ProductList({ onEdit }) {
  const { showNotification } = useNotification();

  // Simulation de données (à remplacer par des données réelles du backend)
  const products = [
    {
      id: 1,
      name: "Exemple de produit",
      price: 99.99,
      category: "Catégorie",
      available: true,
    },
  ];

  const handleDelete = (productId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      // Ici, ajoutez la logique de suppression avec le backend
      console.log("Suppression du produit:", productId);
      showNotification("Produit supprimé avec succès", "success");
    }
  };

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
            <tr key={product.id}>
              <td>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-thumbnail"
                  />
                ) : (
                  <div className="no-image">Pas d'image</div>
                )}
              </td>
              <td>{product.name}</td>
              <td>{product.price.toFixed(2)} €</td>
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
                  onClick={() => handleDelete(product.id)}
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
