import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNotification } from "../context/NotificationContext";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();
  const { showNotification } = useNotification();

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
        setFilteredProducts(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filtre par prix
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, products]);

  const handleAddToCart = (product) => {
    addToCart(product);
    showNotification(`${product.name} ajouté au panier`, "success");
  };

  if (loading) {
    return <div>Chargement des produits...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className="products">
      <h2>Nos Produits</h2>

      <div className="filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Toutes les catégories</option>
            {[...new Set(products.map((product) => product.category))].map(
              (category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              )
            )}
          </select>
        </div>

        <div className="price-filter">
          <input
            type="range"
            min="0"
            max="1000000"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange((prev) => ({
                ...prev,
                max: Number(e.target.value),
              }))
            }
          />
          <span>Prix max: {priceRange.max}€</span>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <div
                className={`product-status ${
                  product.available ? "in-stock" : "on-order"
                }`}
              >
                {product.available ? "En Stock" : "Sur Commande"}
              </div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">{product.price.toFixed(2)} €</p>
              <p className="availability">
                <span
                  className={`status-dot ${
                    product.available ? "available" : "unavailable"
                  }`}
                ></span>
                {product.available
                  ? "Disponible"
                  : "Sur commande - délai 1-2 semaines"}
              </p>
              <p className="description">{product.description}</p>
              <p className="category">{product.category}</p>
              <button
                className="btn btn-primary"
                onClick={() => handleAddToCart(product)}
              >
                Ajouter au panier
                {!product.available && " (Sur commande)"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
