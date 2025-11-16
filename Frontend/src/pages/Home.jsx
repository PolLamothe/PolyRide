import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../../assets/PolyRide_LOGO-removebg-preview.png"

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Header></Header>
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <img 
            src={logo} 
            alt="PolyRide Logo" 
            className="hero-logo"
          />
          <h1 className="hero-title">PolyRide</h1>
          <p className="hero-subtitle">
            Le covoiturage étudiant qui change la donne
          </p>
          <button 
            className="cta-button"
            onClick={() => navigate("/search")}
          >
            Commencer l'aventure 🚗
          </button>
        </div>
      </header>

      {/* Section Mission */}
      <section className="mission-section">
        <div className="section-content">
          <h2 className="section-title">Notre Mission</h2>
          <p className="mission-text">
            PolyRide connecte les étudiants de Polytech pour partager leurs trajets quotidiens. 
            Fini les trajets solitaires, place à une communauté solidaire et respectueuse de l'environnement !
          </p>
        </div>
      </section>

      {/* Stats Impact */}
      <section className="stats-section">
        <div className="section-content">
          <h2 className="section-title">Notre Impact Écologique</h2>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🌱</div>
              <div className="stat-number">-60%</div>
              <div className="stat-label">d'émissions CO₂</div>
              <p className="stat-description">
                En partageant un trajet à 3, vous réduisez de 60% les émissions par personne
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🚗</div>
              <div className="stat-number">2.5 tonnes</div>
              <div className="stat-label">de CO₂ économisées/an</div>
              <p className="stat-description">
                Un étudiant qui covoiture 3 fois par semaine économise 2.5 tonnes de CO₂ par an
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-number">-75%</div>
              <div className="stat-label">de frais de transport</div>
              <p className="stat-description">
                Divisez vos frais d'essence et de péage par le nombre de passagers
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🌍</div>
              <div className="stat-number">32kg</div>
              <div className="stat-label">de CO₂ par trajet évité</div>
              <p className="stat-description">
                Chaque trajet partagé entre Nantes et le campus évite 32kg de CO₂
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="benefits-section">
        <div className="section-content">
          <h2 className="section-title">Pourquoi PolyRide ?</h2>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🤝</div>
              <h3>Communauté Étudiante</h3>
              <p>
                Rencontre d'autres étudiants de Polytech, crée des liens et partage ton quotidien
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">⏰</div>
              <h3>Synchronisé avec EDT</h3>
              <p>
                Trouve automatiquement des covoitureurs qui ont les mêmes horaires de cours que toi
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🔒</div>
              <h3>Sécurisé & Vérifié</h3>
              <p>
                Tous les utilisateurs sont des étudiants vérifiés de Polytech Nantes
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🌿</div>
              <h3>Engagement Écologique</h3>
              <p>
                Participe activement à la réduction de l'empreinte carbone de ton école
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">📱</div>
              <h3>Simple & Rapide</h3>
              <p>
                Trouve un covoiturage en quelques clics, reçois des notifications instantanées
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">💚</div>
              <h3>Gratuit & Sans Pub</h3>
              <p>
                Service 100% gratuit, développé par des étudiants pour des étudiants
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Équivalences */}
      <section className="equivalence-section">
        <div className="section-content">
          <h2 className="section-title">Concrètement, ça représente quoi ?</h2>
          
          <div className="equivalence-grid">
            <div className="equivalence-card">
              <div className="equivalence-number">2.5 tonnes</div>
              <div className="equivalence-equal">=</div>
              <div className="equivalence-comparison">
                <span className="equivalence-icon">🌳</span>
                <span className="equivalence-text">125 arbres plantés par an</span>
              </div>
            </div>

            <div className="equivalence-card">
              <div className="equivalence-number">32kg CO₂</div>
              <div className="equivalence-equal">=</div>
              <div className="equivalence-comparison">
                <span className="equivalence-icon">✈️</span>
                <span className="equivalence-text">Un vol Paris-Londres évité</span>
              </div>
            </div>

            <div className="equivalence-card">
              <div className="equivalence-number">1 trajet/jour</div>
              <div className="equivalence-equal">=</div>
              <div className="equivalence-comparison">
                <span className="equivalence-icon">🌲</span>
                <span className="equivalence-text">L'équivalent de 50 arbres par an</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Prêt à faire la différence ?</h2>
          <p className="cta-text">
            Rejoins les centaines d'étudiants qui ont déjà réduit leur empreinte carbone
          </p>
          <button 
            className="cta-button-large"
            onClick={() => navigate("/search")}
          >
            Trouver un covoiturage maintenant
          </button>
        </div>
      </section>

      
    </div>
  );
}