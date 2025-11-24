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
		<h3>Aller sur la page "Emploi du temps"</h3>
		<p>Commence par accéder au service "Emploi du temps" de Nantes Université via le <a href="http://edt.univ-nantes.fr/" target="_blank">lien suivant</a> (accessible depuis l'intranet).</p>
	</li>
	<li style={{"--i": 2}}>
		<h3>Accès aux emplois du temps</h3>
		<p>Sur la page des emplois du temps, sélectionne Polytech en cliquant sur "Nouvelle version" (penses bien à sélectionner cette nouvelle version, sinon tu n'aura pas accès au lien ICS !)</p>
	</li>
    <li style={{"--i": 3}}>
		<h3>Sélection de l'emploi du temps</h3>
		<p>Dans le menu de la sélection de groupes, coche toutes les cases auxquelles tu appartiens (n'oublies pas les groupes de langues, UE supplémentaires, ...)</p>
	</li>
	<li style={{"--i": 4}}>
		<h3>Export du lien ICS</h3>
		<p>Une fois ton emploi du temps complété avec les cases du menu, il te suffit d'appuyer sur le bouton "Export ICS", situé en haut à droite de l'emploi du temps, à côté du bouton pour imprimer.
      Il te suffit désormais de copier ton lien ICS et de le coller <a href="" onClick={() => navigate("/schedule")}>ici</a>! </p>
	</li>
</ol>
    </div>
    
  );
}
