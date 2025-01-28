import { Link, useLocation } from "react-router-dom";
import "./AdminNav.css";

function AdminNav() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/";
  };

  return (
    <div className="admin-nav">
      <div className="admin-nav-container">
        <h1>Administration</h1>
        <nav>
          <Link
            to="/admin/products"
            className={`nav-link ${
              location.pathname === "/admin/products" ? "active" : ""
            }`}
          >
            Produits
          </Link>
          <Link
            to="/admin/orders"
            className={`nav-link ${
              location.pathname === "/admin/orders" ? "active" : ""
            }`}
          >
            Commandes
          </Link>
          <Link
            to="/admin/settings"
            className={`nav-link ${
              location.pathname === "/admin/settings" ? "active" : ""
            }`}
          >
            Paramètres
          </Link>
          <button onClick={handleLogout} className="nav-link logout-btn">
            Déconnexion
          </button>
        </nav>
      </div>
    </div>
  );
}

export default AdminNav;
