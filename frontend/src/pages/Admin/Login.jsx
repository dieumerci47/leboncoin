import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import "./Login.css";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    try {
      await fetch("http://localhost:5000/leboncoin/loginadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          navigate("/admin/products");
        })
        .catch((e) => {
          console.log(e);
          showNotification("Identifiants incorrects");
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="admin-login">
      <h2>Administration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nom d&apos;utilisateur</label>
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
