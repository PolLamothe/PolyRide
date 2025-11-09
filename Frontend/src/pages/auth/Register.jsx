import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // on réutilise ton style bleu/blanc

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // plus tard tu pourras ajouter la logique d'envoi vers ton backend ici
    alert("Compte créé avec succès !");
    navigate("/login");
  };

  return (
    <div className="page-container">
      <div className="login-card">
        <h1 className="brand">Créer un compte</h1>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nom" required />
          <input type="text" placeholder="Prénom" required />
          <input type="date" required />
          <input type="email" placeholder="Email universitaire" required />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Créer un mot de passe"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️‍🗨️" : "👁️"}
            </button>
          </div>

          <button type="submit" className="btn-primary">
            S’inscrire
          </button>

          <div className="divider">
            <span>ou</span>
          </div>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/login")}
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
