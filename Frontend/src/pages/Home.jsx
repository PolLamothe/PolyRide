import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/auth/Auth.css";

export default function Home() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState("today");
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Générer les 7 prochains jours
  const getUpcomingDays = () => {
    const days = [];
    const today = new Date();
    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      let label;
      if (i === 0) label = "Aujourd'hui";
      else if (i === 1) label = "Demain";
      else label = dayNames[date.getDay()];
      
      days.push({
        id: i === 0 ? 'today' : i === 1 ? 'tomorrow' : `day${i}`,
        label,
        date: date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
        fullDate: date
      });
    }
    return days;
  };

  const upcomingDays = getUpcomingDays();

  // Charger les utilisateurs proches
  useEffect(() => {
    loadNearbyUsers();
  }, [selectedDay]);

  const loadNearbyUsers = async () => {
    setLoading(true);
    
    try {
      const response = await fetch(
        `https://api.polyride.fr/api/users/nearby?day=${selectedDay}`,
        { method: "GET" }
      );

      if (!response.ok) throw new Error("Erreur serveur");
      const data = await response.json();
      setNearbyUsers(data.users || []);
    } catch (err) {
      console.error("Erreur lors du chargement des utilisateurs:", err);
      setNearbyUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="home-header-content">
          <div className="home-header-title">
            <img src="/assets/PolyRide_LOGO-removebg-preview.png" alt="PolyRide Logo" className="home-logo" />
            <h1>PolyRide</h1>
          </div>
          <p>🎯 Trouve des covoitureurs près de chez toi</p>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="home-content">
        {/* Sélecteur de jours */}
        <div className="days-selector-wrapper">
          <div className="days-selector">
            <div className="days-scroll">
              {upcomingDays.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className={`day-button ${selectedDay === day.id ? 'active' : ''}`}
                >
                  <span className="day-button-label">{day.label}</span>
                  <span className="day-button-date">{day.date}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Header de la liste */}
        <div className="users-header">
          <h2 className="users-title">
            <span>🚘</span>
            {loading ? 'Recherche...' : `${nearbyUsers.length} covoitureur${nearbyUsers.length > 1 ? 's' : ''} proche${nearbyUsers.length > 1 ? 's' : ''}`}
          </h2>
          <button className="filter-button">Filtrer</button>
        </div>

        {/* Liste des utilisateurs */}
        {loading ? (
          <div className="users-list">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-header">
                  <div className="skeleton-avatar"></div>
                  <div className="skeleton-text">
                    <div className="skeleton-line short"></div>
                    <div className="skeleton-line medium"></div>
                    <div className="skeleton-line"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : nearbyUsers.length > 0 ? (
          <div className="users-list">
            {nearbyUsers.map((user) => (
              <div key={user.id} className="user-card">
                {/* Header de la carte */}
                <div className="user-card-header">
                  <div className="user-info-left">
                    <div className="user-avatar">
                      {user.name.charAt(0)}
                    </div>
                    
                    <div className="user-details">
                      <h3>{user.name}</h3>
                      <div className="user-meta">
                        <span>⭐ {user.rating}</span>
                        <span>•</span>
                        <span>{user.trips} trajets</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="distance-badge">
                    📍 {user.distance} km
                  </div>
                </div>

                {/* Infos du trajet */}
                <div className="trip-info">
                  <div className="trip-info-row">
                    <span className="trip-info-label">🏠 Départ:</span>
                    <span className="trip-info-value">{user.address}</span>
                  </div>
                  <div className="trip-info-row">
                    <span className="trip-info-label">🎯 Arrivée:</span>
                    <span className="trip-info-value">{user.destination}</span>
                  </div>
                  <div className="trip-info-row">
                    <span className="trip-info-label">🕐 Heure:</span>
                    <span className="trip-info-value trip-time">{user.departure}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="user-card-footer">
                  <div className="available-seats">
                    <span className="available-seats-label">Places disponibles:</span>
                    <div className="seats-icons">
                      {[...Array(user.availableSeats)].map((_, i) => (
                        <div key={i} className="seat-icon">
                          <svg fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="reserve-button">
                    Réserver
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">😔</div>
            <h3>Aucun covoitureur disponible</h3>
            <p>Essaye un autre jour ou propose ton propre trajet !</p>
            <button className="propose-button">
              Proposer un trajet
            </button>
          </div>
        )}
      </div>

      {/* Menu du bas */}
      <nav className="bottom-menu">
        <button 
          className="bottom-menu-btn"
          onClick={() => navigate("/account")}
        >
          <svg className="menu-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
          </svg>
          <span className="menu-label">Profil</span>
        </button>
        
        <button className="bottom-menu-btn active">
          <div className="menu-icon-wrapper">
            <svg className="menu-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
          </div>
          <span className="menu-label">Accueil</span>
        </button>

        <button 
          className="bottom-menu-btn"
          onClick={() => navigate("/schedule")}
        >
          <svg className="menu-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"/>
          </svg>
          <span className="menu-label">Proposer</span>
        </button>
        
        <button 
          className="bottom-menu-btn"
          onClick={() => navigate("/chat")}
        >
          <svg className="menu-icon" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
          </svg>
          <span className="menu-label">Messages</span>
        </button>
      </nav>
    </div>
  );
}