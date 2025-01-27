import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const { cart } = useCart();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <nav className={`navbar ${visible ? "" : "hidden"}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          LeBoncoin CG
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">
              Produits
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link cart-link">
              Panier
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
