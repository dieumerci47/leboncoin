import { useState, useEffect } from "react";
import { useNotification } from "../../context/NotificationContext";
import "./OrderManager.css";

function OrderManager() {
  const { showNotification } = useNotification();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/leboncoin/getorders"
        );
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des commandes");
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    // Ici, vous ajouterez la logique pour mettre à jour le statut dans le backend
    console.log(
      `Mise à jour du statut de la commande ${orderId} à ${newStatus}`
    );
    showNotification("Statut de la commande mis à jour", "success");
  };

  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      attente: "status-pending",
      traitement: "status-processing",
      expedie: "status-shipped",
      livre: "status-delivered",
      annulee: "status-cancelled",
    };
    return `status-badge ${statusClasses[status] || ""}`;
  };

  if (loading) {
    return <div>Chargement des commandes...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className="order-manager">
      <h2>Gestion des Commandes</h2>

      <div className="orders-list">
        <table>
          <thead>
            <tr>
              <th>Numéro</th>
              <th>Date</th>
              <th>Client</th>
              <th>Total</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                  <div>{order.customer.name}</div>
                  <div className="email">{order.customer.email}</div>
                  <div className="email">{order.customer.tel}</div>
                </td>
                <td>{order.total} FCFA</td>
                <td>
                  <span className={getStatusBadgeClass(order.status)}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="attente">En attente</option>
                    <option value="traitement">En traitement</option>
                    <option value="expedie">Expédiée</option>
                    <option value="livre">Livrée</option>
                    <option value="annulee">Annulée</option>
                  </select>
                  <button
                    className="btn btn-secondary"
                    onClick={() => window.print()}
                  >
                    Imprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderManager;
