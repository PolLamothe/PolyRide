import Header from "../components/Header.jsx";
import { Box, Text } from "@radix-ui/themes";
import { useState } from "react";
import "./Search.css"
import ResultSearchCard from "../components/ResultSearchCard.jsx";

// Exemples de composants différents pour chaque jour
function LundiComponent() {
    return <Text size="3">Make changes to your account.</Text>;
}

function MardiComponent() {
    return <Text size="3">Access and update your documents.</Text>;
}

function MercrediComponent() {
    return <Text size="3">Edit your profile or update contact information.</Text>;
}

function ReposComponent() {
    return <Text size="3">Repos bien mérité</Text>;
}

function Search() {
    const [day, setDay] = useState("Lundi");

    // On stocke les composants dans un objet
    const dayComponents = {
        Lundi:
            <div className="gridCard">
                <ResultSearchCard prenom="pol" nom="lamothe" distance="5km" heure_debut="8H00"/>
                <ResultSearchCard prenom="anouar" nom="al khatbi imani" distance="5km" heure_debut="8H00"/>
                <ResultSearchCard prenom="julien" nom="Pitré" distance="5km" heure_debut="8H00"/>
            </div>,
        Mardi: <ResultSearchCard prenom="kyllian" nom="arnaud" distance="5km" heure_debut="8H00"/>,
        Mercredi: <MercrediComponent />,
        Jeudi: <MercrediComponent />,
        Vendredi: <MercrediComponent />,
        Samedi: <MercrediComponent />,
        Dimanche: <ReposComponent />,
    };

    return (
        <>
            <Header />

            <h2 className="title_search">Recherche</h2>
            <div className="search">
                <Box mb="4">
                    <select
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        style={{
                            fontSize: "1rem",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            cursor: "pointer"
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
                </Box>

                <Box pt="3">
                    {dayComponents[day]}
                </Box>
            </div>
        </>
    );
}

export default Search;
