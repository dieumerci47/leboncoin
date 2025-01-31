import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNotification } from "../context/NotificationContext";
import "./Checkout.css";

// const ADMIN_EMAIL = "dieumercitsimba04@gmail.com";

function Checkout() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        tel: formData.phone,
      },
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: getCartTotal(),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/leboncoin/addorders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la commande");
      }

      await response.json();
      showNotification("Commande envoyée avec succès!", "success");
      clearCart();
      navigate("/");
    } catch (e) {
      showNotification(
        "Erreur lors de l'envoi de la commande. Veuillez réessayer.",
        e
      );
    }
  };

  return (
    <div className="checkout">
      <h2>Finaliser la commande</h2>

      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Informations personnelles</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Prénom</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Nom</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Adresse de livraison</h3>
            <div className="form-group">
              <label htmlFor="address">Adresse</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">Ville</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">Code postal</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Commander ({getCartTotal()}
            <strong>FCFA</strong>)
          </button>
        </form>

        <div className="order-summary">
          <h3>Récapitulatif de la commande</h3>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Quantité: {item.quantity}</p>
                  <p className="price">
                    {item.price * item.quantity} <strong>FCFA</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="total">
            <span>Total:</span>
            <span>
              {getCartTotal()} <strong>FCFA</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
