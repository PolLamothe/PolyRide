import { useNavigate } from "react-router-dom";
import "./TutoEDT.css";
import Header from "../components/Header.jsx";
import logo from "../assets/PolyRide_LOGO-removebg-preview.png";

export default function TutoEDT() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Header></Header>
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Tutoriel 	&#x23F0;</h1>
          <p className="hero-subtitle">
            Comment récupérer le lien ICS de ton emploi du temps ?
          </p>
        </div>
      </header>

      <ol style={{"--length": 4}} role="list">
	<li style={{"--i": 1}}>
		<h3>Accès au service "Emploi du temps"</h3>
		<p>Commence par accéder au service "Emploi du temps" de Nantes Université via le <a href="http://edt.univ-nantes.fr/">lien suivant</a> (accessible depuis l'intranet).</p>
	</li>
	<li style={{"--i": 2}}>
		<h3>ETAPE 2</h3>
		<p>La page est down, compléter quand c'est réglé</p>
	</li>
    <li style={{"--i": 3}}>
		<h3>ETAPE 3</h3>
		<p>La page est down, compléter quand c'est réglé</p>
	</li>
	<li style={{"--i": 4}}>
		<h3>ETAPE 4</h3>
		<p>La page est down, compléter quand c'est réglé</p>
	</li>
</ol>
    </div>
    
  );
}