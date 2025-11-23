import Header from "../components/Header.jsx";
import {Box, Button, Text} from "@radix-ui/themes";
import {useEffect, useState} from "react";
import "./Search.css";
import ResultSearchCard from "../components/ResultSearchCard.jsx";
import ActiveRequestCard from "../components/ActiveRequestCard.jsx";
import polyrideDAO from "../dao/PolyrideDAO.js";

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
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
}

function Search() {
    const [isConnected, setIsConnected] = useState(false);
    const [day, setDay] = useState("Lundi");
    const [direction, setDirection] = useState("start");
    const [trajet, setTrajet] = useState([]);
    const [loading, setLoading] = useState(false);
    const [myActiveRequest, setMyActiveRequest] = useState(null);

    useEffect(() => {
        const token = getCookie("token");
        setIsConnected(!!token);
    }, []);

    // Fonction pour charger la requête active
    const loadActiveRequest = async (selectedDay) => {
        const dateKey = getDateOfCurrentWeek(selectedDay);
        
        try {
            const response = await fetch(`https://api.polyride.fr/api/rides/my-request?date=${dateKey}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${getCookie("token")}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setMyActiveRequest(data.request || null);
            } else {
                setMyActiveRequest(null);
            }
        } catch (err) {
            console.log("Erreur loadActiveRequest:", err);
            setMyActiveRequest(null);
        }
    };

    // Callback quand une demande est annulée
    const handleRequestCancelled = () => {
        setMyActiveRequest(null);
    };

    const allProposal = async (selectedDay, selectedDirection = direction) => {
        const dateKey = getDateOfCurrentWeek(selectedDay);
        await getTrajets(selectedDirection, dateKey);
        await loadActiveRequest(selectedDay);
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
        if (loading) return <Text className="loading-text">Chargement...</Text>;

        if (!traj || traj.length === 0)
            return <Text>Aucun trajet trouvé.</Text>;

        return (
            <div className="gridCard">
                {traj.map((element, index) => {
                    const { prenom, nom } = getNameFromEmail(element.email);

                    return (
                        <ResultSearchCard
                            key={index}
                            nom={nom}
                            prenom={prenom}
                            temps={element.difference}
                            when={direction}
                            distance={Number(element.distance).toFixed(2)}
                        />
                    );
                })}
            </div>
        );
    };

    useEffect(() => {
        const dateKey = getDateOfCurrentWeek(day);
        getTrajets(direction, dateKey);
        loadActiveRequest(day);
    }, []);

    return (
        <>
            <Header />

            <h2 className="title_search">Recherche</h2>

            {!isConnected ? (
                <Box className="searchNotConnect" style={{ padding: "2rem", textAlign: "center" }}>
                    <Text>Vous devez être connecté pour accéder à cette page.</Text>
                    <Button
                        onClick={() => (window.location.href = "/auth/login")}
                        style={{ marginTop: "1rem" }}
                    >
                        Se connecter
                    </Button>
                </Box>
            ) : (
                <div className="search">
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

                    {/* Composant de requête active */}
                    <ActiveRequestCard 
                        request={myActiveRequest}
                        onRequestCancelled={handleRequestCancelled}
                    />

                    <Box pt="3">{dayComponents(trajet)}</Box>
                </div>
            )}
        </>
    );
}

export default Search;