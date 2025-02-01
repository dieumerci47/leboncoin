import { useState, useEffect } from "react";
import { useNotification } from "../../context/NotificationContext";
import OrderDetailsPopup from "./OrderDetailsPopup";
import "./OrderManager.css";

function OrderManager() {
  const { showNotification } = useNotification();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Nouveaux états pour la recherche et le filtrage
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

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

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/leboncoin/updateorder/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la mise à jour du statut de la commande"
        );
      }

      const updatedOrder = await response.json();

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: updatedOrder.status }
            : order
        )
      );
      showNotification("Statut de la commande mis à jour", "success");
    } catch (error) {
      showNotification(
        "Erreur lors de la mise à jour du statut",
        error.message
      );
    }
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

  // Fonction de filtrage des commandes
  const filteredOrders = orders.filter((order) => {
    const fullName = order.customer.name.toLowerCase();
    const email = order.customer.email.toLowerCase();
    const firstName = order.customer.name.split(" ")[0].toLowerCase();

    const searchMatch =
      fullName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      firstName.includes(searchTerm.toLowerCase());

    const statusMatch = filterStatus === "all" || order.status === filterStatus;

    return searchMatch && statusMatch;
  });

  if (loading) {
    return <div>Chargement des commandes...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className="order-manager">
      <h2>Gestion des Commandes</h2>

      {/* Section Recherche et Filtrage */}
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Rechercher par nom, prénom ou email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">Tous les statuts</option>
          <option value="attente">En attente</option>
          <option value="traitement">En traitement</option>
          <option value="expedie">Expédiée</option>
          <option value="livre">Livrée</option>
          <option value="annulee">Annulée</option>
        </select>
      </div>

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
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>
                  <button
                    className="link-button"
                    onClick={() => setSelectedOrder(order)}
                  >
                    {order._id}
                  </button>
                </td>
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

      {/* Popup pour les détails de la commande */}
      {selectedOrder && (
        <OrderDetailsPopup
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}

export default OrderManager;
