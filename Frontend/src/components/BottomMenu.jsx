import { useNavigate, useLocation } from "react-router-dom";
import "./BottomMenu.css";

export default function BottomMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  // Fonction pour vérifier si une route est active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bottom-menu">
      <button 
        className={`bottom-menu-btn ${isActive('/account') ? 'active' : ''}`}
        onClick={() => navigate("/account")}
      >
        <svg className="menu-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
        </svg>
        <span className="menu-label">Profil</span>
      </button>
      
      <button 
        className={`bottom-menu-btn ${isActive('/search') ? 'active' : ''}`}
        onClick={() => navigate("/search")}
      >
        {isActive('/search') ? (
          <div className="menu-icon-wrapper">
            <svg className="menu-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
            </svg>
          </div>
        ) : (
          <svg className="menu-icon" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
          </svg>
        )}
        <span className="menu-label">Rechercher</span>
      </button>

      <button 
        className={`bottom-menu-btn ${isActive('/schedule') ? 'active' : ''}`}
        onClick={() => navigate("/schedule")}
      >
        <svg className="menu-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"/>
        </svg>
        <span className="menu-label">Proposer</span>
      </button>
      
      <button 
        className={`bottom-menu-btn ${isActive('/chat') ? 'active' : ''}`}
        onClick={() => navigate("/chat")}
      >
        <svg className="menu-icon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
        </svg>
        <span className="menu-label">Messages</span>
      </button>
    </nav>
  );
}