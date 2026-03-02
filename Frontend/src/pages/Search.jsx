import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import {Box, Button, Text} from "@radix-ui/themes";
import {useEffect, useState} from "react";
import "./Search.css";
import ResultSearchCard from "../components/ResultSearchCard.jsx";
import polyrideDAO from "../dao/PolyrideDAO.js";
import config from "../config.js";

function getDateOfCurrentWeek(dayName) {
    const days = {
        "Lundi": 1,
        "Mardi": 2,
        "Mercredi": 3,
        "Jeudi": 4,
        "Vendredi": 5,
        "Samedi": 6,
        "Dimanche": 0,
    };

    const now = new Date();
    const currentDay = now.getDay();
    const target = days[dayName];

    const diff = target - currentDay;
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + diff);

    return targetDate.toISOString().split("T")[0];
}

function getNameFromEmail(email) {
    const base = email.split("@")[0];
    const parts = base.split(".");
    const prenom = parts[0] || "";
    const nom = parts.slice(1).join(" ") || "";
    return { prenom, nom };
}

function getCookie(name) {
    if (config.demoMode && name === "token") return "demo-token";
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
}

function isPastOrToday(dateString) {
    const today = new Date();
    today.setHours(0,0,0,0);

    const date = new Date(dateString);
    date.setHours(0,0,0,0);

    return date <= today;
}

function Search() {
    const navigate = useNavigate();
    const [isConnected, setIsConnected] = useState(config.demoMode);
    const [day, setDay] = useState("Lundi");
    const [direction, setDirection] = useState("start");
    const [trajet, setTrajet] = useState([]);
    const [loading, setLoading] = useState(false);
    const [badProfile,setBadProfile] = useState(config.demoMode ? false : undefined);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const checkProfile = async () => {
            if (config.demoMode) {
                setIsConnected(true);
                setBadProfile(false);
                return;
            }
            const token = getCookie("token");
            setIsConnected(!!token);
            if (token) {
                try {
                    const user = await polyrideDAO.getProfile();
                    if(user.calendarLink == null || user.usage == null || user.address == null){
                        setBadProfile(true);
                    } else {
                        setBadProfile(false);
                    }
                } catch(e) {
                    console.error("Failed to get profile:", e);
                    setBadProfile(true);
                }
            } else {
                setBadProfile(true);
            }
        };
        checkProfile();
    }, []);

    const allProposal = async (selectedDay, selectedDirection = direction) => {
        const dateKey = getDateOfCurrentWeek(selectedDay);

        if (!config.demoMode && isPastOrToday(dateKey)) {
            setMessage("Impossible de rechercher un trajet pour un jour passé ou le jour même.");
            setTrajet([]);
            return;
        }

        setMessage(""); // pas de message de succès ici
        await getTrajets(selectedDirection, dateKey);
    };

    const getTrajets = async (direction, date) => {
        setLoading(true);

        polyrideDAO.getProposal(direction, date)
            .then((res) => {
                setTrajet(res);
            })
            .catch((err) => console.log("Erreur getTrajets:", err))
            .finally(() => setLoading(false));
    };

    const dayComponents = (traj) => {
        if (loading) return <Text>Chargement...</Text>;

        if (!traj || traj.length === 0)
            return <Text>Aucun trajet trouvé.</Text>;

        return (
            <div className="gridCard">
                {traj.map((element, index) => {
                    const { prenom, nom } = getNameFromEmail(element.email);
                    const dateKey = getDateOfCurrentWeek(day);
                    const iso = new Date(dateKey + "T00:00:00Z").toISOString();

                    return (
                        <ResultSearchCard
                            key={index}
                            nom={nom}
                            prenom={prenom}
                            temps={element.difference}
                            when={direction}
                            distance={Number(element.distance).toFixed(2)}
                            conducteur={element.email}
                            jour={iso}
                        />
                    );
                })}
            </div>
        );
    };

    useEffect(() => {
        // 🎯 Check automatique au chargement
        allProposal(day, direction);
    }, []);

    return (
        <>
            <Header />

            <h2 className="title_search">Recherche</h2>

            {config.demoMode && (
                <div style={{
                    backgroundColor: "#e7f3ff",
                    color: "#0c5460",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    margin: "0 auto 1.5rem",
                    maxWidth: "600px",
                    fontSize: "0.9rem",
                    textAlign: "center",
                    border: "1px solid #bee5eb"
                }}>
                    <strong>Mode Démo :</strong> Le site est actuellement en mode démonstration. Les informations affichées sont fictives et non reliées au serveur.
                </div>
            )}

            {!isConnected ? (
                <Box className="searchNotConnect" style={{ padding: "2rem", textAlign: "center" }}>
                    <Text>Vous devez être connecté pour accéder à cette page.</Text>
                    <Button
                        onClick={() => navigate("/auth/login")}
                        style={{ marginTop: "1rem" }}
                    >
                        Se connecter
                    </Button>
                </Box>
            ) : (

                badProfile ?(
                    <p>Veuillez renseigner vos informations pour pouvoir utiliser la recherche</p>
                ) : (
                    <div className="search">

                        {message && (
                            <Box mb="3" style={{ color: "red", fontWeight: "bold" }}>
                                {message}
                            </Box>
                        )}

                        <Box mb="4">
                            <select
                                value={day}
                                onChange={(e) => {
                                    const selectedDay = e.target.value;
                                    setDay(selectedDay);
                                    allProposal(selectedDay);
                                }}
                            >
                                <option value="Lundi">Lundi</option>
                                <option value="Mardi">Mardi</option>
                                <option value="Mercredi">Mercredi</option>
                                <option value="Jeudi">Jeudi</option>
                                <option value="Vendredi">Vendredi</option>
                                <option value="Samedi">Samedi</option>
                                <option value="Dimanche">Dimanche</option>
                            </select>

                            <select
                                value={direction}
                                onChange={(e) => {
                                    const newDirection = e.target.value;
                                    setDirection(newDirection);
                                    allProposal(day, newDirection);
                                }}
                            >
                                <option value="start">Aller à Polytech</option>
                                <option value="end">Partir de Polytech</option>
                            </select>
                        </Box>

                        <Box pt="3">{dayComponents(trajet)}</Box>
                    </div>
                )
            )}
        </>
    );
}

export default Search;
