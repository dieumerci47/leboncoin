import React from "react";
import PropTypes from "prop-types";
import "./OrderManager.css"; // Assurez-vous que ce chemin est correct

function OrderDetailsPopup({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h3>Détails de la commande</h3>
        <p>
          <strong>Numéro de commande:</strong> {order._id}
        </p>
        <p>
          <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Client:</strong> {order.customer.name}
        </p>
        <p>
          <strong>Email:</strong> {order.customer.email}
        </p>
        <p>
          <strong>Téléphone:</strong> {order.customer.tel}
        </p>
        <h4>Articles commandés:</h4>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity} x {item.price} FCFA
            </li>
          ))}
        </ul>
        <p>
          <strong>Total:</strong> {order.total} FCFA
        </p>
      </div>
    </div>
  );
}

OrderDetailsPopup.propTypes = {
  order: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default OrderDetailsPopup;
