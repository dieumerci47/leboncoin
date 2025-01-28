import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNotification } from "../context/NotificationContext";
import "./Products.css";

// Données temporaires améliorées pour les produits
const tempProducts = [
  {
    id: 1,
    name: "iPhone 13",
    price: 899.99,
    description: "Le dernier iPhone avec une performance exceptionnelle",
    available: true,
    image: "https://via.placeholder.com/200",
    category: "Smartphones",
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    price: 799.99,
    description: "Un smartphone Android haut de gamme",
    available: true,
    image:
      "https://th.bing.com/th/id/OIP.sK-eLQXZqkMVJmib8cWvQAHaJi?rs=1&pid=ImgDetMain",
    category: "Smartphones",
  },
  {
    id: 3,
    name: "MacBook Pro",
    price: 1299.99,
    description: "Ordinateur portable puissant pour les professionnels",
    available: false,
    image:
      "data:image/jpeg;base64,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",
    category: "Ordinateurs",
  },
  // Ajoutez d'autres produits...
];

function Products() {
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const [products] = useState(tempProducts);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

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
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "Toutes les catégories" : category}
              </option>
            ))}
          </select>
        </div>

        <div className="price-filter">
          <input
            type="range"
            min="0"
            max="2000"
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
          <div key={product.id} className="product-card">
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
