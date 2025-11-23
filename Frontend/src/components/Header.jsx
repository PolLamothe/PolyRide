import React, { useState, useEffect } from "react";
import logo from "../assets/PolyRide_LOGO-removebg-preview.png";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const location = useLocation();
    const [active, setActive] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const pathToLink = {
            "/": "Accueil",
            "/about": "À propos",
            "/schedule": "Emploi du Temps",
            "/account": "Compte",
            "/search": "Recherche",
            "/tracking": "Suivi",
        };
        setActive(pathToLink[location.pathname] || "");
    }, [location.pathname]);

    const links = [
        "Accueil",
        "Recherche",
        "Suivi",
        "Emploi du Temps",
        "Compte",
        "À propos",
    ];

    const handleClick = (link) => {
        const linkToPath = {
            "Accueil": "/",
            "Recherche": "/search",
            "Suivi" : "/tracking",
            "Emploi du Temps": "/schedule",
            "Compte": "/account",
            "À propos": "/about",
        };
        navigate(linkToPath[link]);
        setMenuOpen(false);
        console.log(menuOpen);
    };

    const [headerPC, setHeaderPC] = useState(
        window.innerWidth >= 860
    );

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 860) {
                setHeaderPC(false);
            } else {
                setHeaderPC(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="header-container">
            <div className="logoContainer">
                <img
                    src={logo}
                    alt="Polyride logo"
                    className="logo"
                />
            </div>
            {headerPC ? (
                    <header className="nav-container">
                        <nav className="navBar">
                            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </button>
                            <div className={`navLinks ${menuOpen ? "open" : ""}`}>
                                {links.map((link) => (
                                    <button
                                        key={link}
                                        onClick={() => handleClick(link)}
                                        className={`navLink ${active === link ? "active" : ""}`}
                                    >
                                        {link}
                                    </button>
                                ))}
                            </div>
                        </nav>
                    </header>
            ) : (
                <>
                    <header className="nav-container">
                        <nav className="navBar">
                            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </button>
                        </nav>
                    </header>
                    <div className={`navLinks ${menuOpen ? "open" : ""}`}>
                        {links.map((link) => (
                            <button
                                key={link}
                                onClick={() => handleClick(link)}
                                className={`navLink ${active === link ? "active" : ""}`}
                            >
                                {link}
                            </button>
                        ))}
                    </div>
                </>
            )}
            <div className="spacer"></div>
        </div>
    );
};

export default Header;
