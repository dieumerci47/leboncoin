import { useState } from "react";
import { useNotification } from "../../context/NotificationContext";
import "./OrderManager.css";

function OrderManager() {
  const { showNotification } = useNotification();
  const [orders] = useState([
    // Exemple de commande
    {
      id: "ORD-123456",
      date: new Date().toISOString(),
      customer: {
        name: "John Doe",
        email: "john@example.com",
      },
      items: [{ name: "Produit 1", quantity: 2, price: 99.99 }],
      total: 199.98,
      status: "pending",
    },
  ]);

  const handleStatusChange = (orderId, newStatus) => {
    // Ici, vous ajouterez la logique pour mettre à jour le statut dans le backend
    console.log(
      `Mise à jour du statut de la commande ${orderId} à ${newStatus}`
    );
    showNotification("Statut de la commande mis à jour", "success");
  };

  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      pending: "status-pending",
      processing: "status-processing",
      shipped: "status-shipped",
      delivered: "status-delivered",
      cancelled: "status-cancelled",
    };
    return `status-badge ${statusClasses[status] || ""}`;
  };

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
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                  <div>{order.customer.name}</div>
                  <div className="email">{order.customer.email}</div>
                </td>
                <td>{order.total.toFixed(2)} €</td>
                <td>
                  <span className={getStatusBadgeClass(order.status)}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    <option value="pending">En attente</option>
                    <option value="processing">En traitement</option>
                    <option value="shipped">Expédiée</option>
                    <option value="delivered">Livrée</option>
                    <option value="cancelled">Annulée</option>
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
