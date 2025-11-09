import { useState } from "react";
import { useNavigate } from "react-router-dom";
import polyrideDAO from "../../dao/PolyrideDAO.js";
import "./Auth.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // 👉 Connexion avec l'email et le mot de passe
            const result = await polyrideDAO.fetchLogin(email, password);
            console.log(result);
            setLoading(false);

            if (result) {
                console.log("✅ Connexion réussie, redirection vers /account");
                navigate("/account");
            } else {
                setError("Adresse e-mail ou mot de passe incorrect.");
            }
        } catch (err) {
            setLoading(false);
            setError(err.message || "Erreur lors de la connexion.");
        }
    }

    return (
        <div className="page-container">
            <div className="login-card">
                <h1 className="brand">PolyRide</h1>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email universitaire"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? "Connexion..." : "Se connecter"}
                    </button>

                    <div className="divider">
                        <span>ou</span>
                    </div>

                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => navigate("/auth/register")}
                    >
                        S’inscrire
                    </button>
                </form>
            </div>
        </div>
    );
}
