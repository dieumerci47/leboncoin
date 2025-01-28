import { useState } from "react";
import { useNotification } from "../../context/NotificationContext";
import "./Settings.css";

function Settings() {
  const { showNotification } = useNotification();
  const [settings, setSettings] = useState({
    siteName: "LeBoncoin CG",
    contactEmail: "dieumercitsimba04@gmail.com",
    phoneNumber: "",
    address: "",
    deliveryFee: "0",
    minOrderAmount: "0",
    maintenanceMode: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous ajouterez la logique pour sauvegarder les paramètres dans le backend
    console.log("Paramètres à sauvegarder:", settings);
    showNotification("Paramètres mis à jour avec succès", "success");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="settings">
      <h2>Paramètres du Site</h2>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-section">
          <h3>Informations Générales</h3>

          <div className="form-group">
            <label htmlFor="siteName">Nom du site</label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactEmail">Email de contact</label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={settings.contactEmail}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Numéro de téléphone</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={settings.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Adresse</label>
            <textarea
              id="address"
              name="address"
              value={settings.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Paramètres de Commande</h3>

          <div className="form-group">
            <label htmlFor="deliveryFee">Frais de livraison (€)</label>
            <input
              type="number"
              id="deliveryFee"
              name="deliveryFee"
              value={settings.deliveryFee}
              onChange={handleChange}
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="minOrderAmount">
              Montant minimum de commande (€)
            </label>
            <input
              type="number"
              id="minOrderAmount"
              name="minOrderAmount"
              value={settings.minOrderAmount}
              onChange={handleChange}
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Maintenance</h3>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
              />
              Mode maintenance
            </label>
            <p className="help-text">
              Activez ce mode pour empêcher les commandes pendant la maintenance
            </p>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
