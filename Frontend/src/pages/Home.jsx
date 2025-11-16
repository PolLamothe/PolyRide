import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pages/auth/Auth.css"; // on garde le même style visuel

export default function Home() {
  const navigate = useNavigate();

  const [day, setDay] = useState("");
  const [route, setRoute] = useState("");
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRides([]);

    try {
      const response = await fetch(
        `https://api.polyride.fr/api/rides/search?route=${encodeURIComponent(route)}&date=${day}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Erreur serveur");
      }

      const data = await response.json();
      setRides(data.rides || []); // ton backend devra renvoyer un champ "rides"
    } catch (err) {
      setError("Impossible de récupérer les covoitureurs pour le moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="login-card home-card">
        <h1 className="brand">PolyRide</h1>
        <h2 style={{ color: "#0066ff", marginBottom: "25px" }}>
          Planifie ton covoiturage
        </h2>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Ton itinéraire ou point de départ"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
            required
          />
          <input
            type="date"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            Trouver des covoitureurs
          </button>
        </form>

        {/* État de chargement */}
        {loading && <p style={{ marginTop: "20px" }}>Recherche en cours...</p>}

        {/* Erreur */}
        {error && (
          <p style={{ color: "red", marginTop: "20px", textAlign: "center" }}>
            {error}
          </p>
        )}

        {/* Résultats du backend */}
        {rides.length > 0 && (
          <div className="suggestions">
            <h3 style={{ marginTop: "30px", color: "#0066ff" }}>
              Covoitureurs trouvés
            </h3>
            <ul>
              {rides.map((r, index) => (
                <li key={index} className="suggestion-item">
                  <span className="name">{r.driverName}</span>
                  <span className="info">
                    {r.distance} km – {r.matchLevel}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Barre de menu en bas */}
        <div className="bottom-menu">
          <button onClick={() => navigate("/account")}>Profil</button>
          <button onClick={() => navigate("/rides")}>Covoiturages</button>
          <button onClick={() => navigate("/chat")}>Chat</button>
        </div>
      </div>
    </div>
  );
}
