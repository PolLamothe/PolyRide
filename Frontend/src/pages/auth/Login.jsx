import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="login-card">
        <h1 className="brand">PolyRide</h1>

        <form>
          <input type="email" placeholder="Email universitaire" required />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
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
            Se connecter
          </button>

          <div className="divider">
            <span>ou</span>
          </div>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/register")}
          >
            S’inscrire
          </button>
        </form>
      </div>
    </div>
  );
}
