import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import "./Login.css";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    // À remplacer par une vraie authentification
    if (
      credentials.username === "admin" &&
      credentials.password === "password"
    ) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/products");
    } else {
      showNotification("Identifiants incorrects", "error");
    }
  };

  return (
    <div className="admin-login">
      <h2>Administration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;
