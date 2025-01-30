import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Votre panier est vide</h2>
        <p>Ajoutez des produits pour commencer vos achats</p>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart">
      <h2>Votre Panier</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="price">{item.price.toFixed(2)} €</p>
            </div>
            <div className="quantity-controls">
              <button
                className="btn"
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="btn"
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              className="btn btn-secondary remove-btn"
              onClick={() => removeFromCart(item._id)}
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="total">
          <span>Total:</span>
          <span>{getCartTotal().toFixed(2)} €</span>
        </div>
        <button
          className="btn btn-primary checkout-btn"
          onClick={handleCheckout}
        >
          Procéder au paiement
        </button>
      </div>
    </div>
  );
}

export default Cart;
