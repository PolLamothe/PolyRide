import { useState } from "react";
import { useNavigate } from "react-router-dom";
import polyrideDAO from "../../dao/PolyrideDAO.js";
import "./Auth.css";
import logo from "../../assets/PolyRide_LOGO-removebg-preview.png";

export default function Register() {
    const navigate = useNavigate();

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const result = await polyrideDAO.fetchRegister(
                email,
                password
            );


            setLoading(false);

            if (result) {
                navigate("/auth/login");
            } else {
                setError("Échec de l’inscription. Vérifie tes informations.");
            }
        } catch (err) {
            setLoading(false);
            setError(err.message || "Erreur lors de l’inscription.");
        }
    }

    return (
        <div className="page-container">
            <div className="register-card">
                <img src={logo} className="logo-login" alt="Polyride logo" />
                <h1 className="brand">Créer un compte</h1>

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
                            placeholder="Créer un mot de passe"
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
                        {loading ? "Inscription..." : "S’inscrire"}
                    </button>

                    <div className="divider">
                        <span>ou</span>
                    </div>

                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => navigate("/auth/login")}
                    >
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
}
