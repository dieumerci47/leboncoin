import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNotification } from "../context/NotificationContext";
import "./Checkout.css";

const ADMIN_EMAIL = "dieumercitsimba04@gmail.com";

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

  const formatOrderForEmail = () => {
    const orderDetails = {
      customerInfo: formData,
      orderItems: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
        isOnOrder: !item.available,
      })),
      totalAmount: getCartTotal(),
      orderDate: new Date().toISOString(),
      orderNumber: `ORD-${Date.now()}`,
    };

    // Simuler l'envoi d'email (à remplacer par une vraie API)
    const emailContent = {
      to: ADMIN_EMAIL,
      subject: `Nouvelle commande ${orderDetails.orderNumber}`,
      body: `
        Nouvelle commande reçue !

        Numéro de commande: ${orderDetails.orderNumber}
        Date: ${new Date(orderDetails.orderDate).toLocaleString()}

        Informations client:
        Nom: ${orderDetails.customerInfo.firstName} ${
        orderDetails.customerInfo.lastName
      }
        Email: ${orderDetails.customerInfo.email}
        Téléphone: ${orderDetails.customerInfo.phone}
        Adresse: ${orderDetails.customerInfo.address}
        Ville: ${orderDetails.customerInfo.city}
        Code postal: ${orderDetails.customerInfo.postalCode}

        Articles commandés:
        ${orderDetails.orderItems
          .map(
            (item) => `
          - ${item.name}
            Quantité: ${item.quantity}
            Prix unitaire: ${item.price.toFixed(2)}€
            Total: ${item.total.toFixed(2)}€
            ${item.isOnOrder ? "(Sur commande)" : "(En stock)"}
        `
          )
          .join("\n")}

        Montant total: ${orderDetails.totalAmount.toFixed(2)}€
      `,
    };

    return emailContent;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const emailContent = formatOrderForEmail();

      // Simulation d'un appel API pour envoyer l'email
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // En production, remplacez ceci par un vrai appel API
      console.log("Email qui serait envoyé:", emailContent);

      showNotification("Commande envoyée avec succès!", "success");
      clearCart();
      navigate("/");
    } catch (error) {
      showNotification(
        "Erreur lors de l'envoi de la commande. Veuillez réessayer.",
        "error"
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
            Commander ({getCartTotal().toFixed(2)} €)
          </button>
        </form>

        <div className="order-summary">
          <h3>Récapitulatif de la commande</h3>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Quantité: {item.quantity}</p>
                  <p className="price">
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="total">
            <span>Total:</span>
            <span>{getCartTotal().toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
