import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Bienvenue sur LeBoncoin CG</h1>
        <p>Découvrez notre sélection de produits de qualité</p>
        <Link to="/products" className="btn btn-primary">
          Voir nos produits
        </Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <i className="fas fa-truck"></i>
          <h3>Livraison rapide</h3>
          <p>Livraison dans toute la région</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-check-circle"></i>
          <h3>Qualité garantie</h3>
          <p>Des produits sélectionnés avec soin</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-headset"></i>
          <h3>Service client</h3>
          <p>Une équipe à votre écoute</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
