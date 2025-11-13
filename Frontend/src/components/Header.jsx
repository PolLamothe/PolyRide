import React, { useState } from "react";
import "../App.css";
import logo from "../assets/Polyride_logo.png";
import {useNavigate} from "react-router-dom";

const Header = () => {
    let init_Page = ""
    if (location.pathname === "/") {
        init_Page = "Accueil"
    } else if (location.pathname === "/about") {
        init_Page = "À propos"
    } else if (location.pathname === "/schedule") {
        init_Page = "Emploi du Temps"
    } else if (location.pathname === "/account") {
        init_Page = "Compte"
    } else if (location.pathname === "/search") {
        init_Page = "Recherche"
    }

    const [active, setActive] = useState(init_Page);
    const navigate = useNavigate();

    const links = [
        "Accueil",
        "Recherche",
        "Emploi du Temps",
        "Compte",
        "À propos",
    ];

    const handleClick = (link) => {
        setActive(link);
        if (link === "Accueil") {
            navigate("/");
        }
        if (link === "Recherche") {
            navigate("/search");
        }
        if (link === "Emploi du Temps") {
            navigate("/schedule");
        }
        if (link === "Compte") {
            navigate("/account");
        }
        if (link === "À propos") {
            navigate("/about");
        }
    }

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
                            onClick={() => handleClick(link)}
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
