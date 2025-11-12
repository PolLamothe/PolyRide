import React, { useState } from "react";
import "../App.css";
import logo from "../assets/Polyride_logo.png";

const Header = () => {
    const [active, setActive] = useState("Accueil");

    const links = [
        "Accueil",
        "Recherche",
        "Emploi du Temps",
        "Compte",
        "À propos",
    ];

    return (
        <>
            <div className="logo-container">
                <img
                    src={logo}
                    alt="Polyride logo"
                    className="logo-header"
                />
            </div>

            <header className="header">
                <nav className="nav-bar">
                    {links.map((link) => (
                        <button
                            key={link}
                            onClick={() => setActive(link)}
                            className={`nav-link ${active === link ? "active" : ""}`}
                        >
                            {link}
                        </button>
                    ))}
                </nav>
            </header>

        </>

    );
};

export default Header;
