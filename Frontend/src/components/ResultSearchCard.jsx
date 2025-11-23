import {Box, Card} from "@radix-ui/themes";
import "./ResultSearchCard.css"
import polyrideDAO from "../dao/PolyrideDAO.js";
import {useState} from "react";

function ResultSearchCard({prenom, nom, distance, temps, when, conducteur, jour}) {
    const [direction, setDirection] = useState(
        when === "start" ? "aller" : "retour"
    );

    const handleSubmit = async (conducteur, jour, direction) => {
        polyrideDAO.askForTrajet(conducteur, jour, direction)
            .then(result => {
                console.log("askTrajet lancé",result);
            })
            .catch(error => {})
    }

    return (
        <Box className="ResultSearchCardBox">
            <Card>
                <div className="ResultSearchCardInfos">
                    <div>{prenom} {nom} - Habite à environ {distance} Km de votre domicile</div>
                    {when === "start" ? (
                        temps === 0 ? (
                            <div>Vous commencez les cours à la même heure</div>
                        ) : (
                            <div>Vous commencez les cours avec {temps} min d'écarts</div>
                        )
                    ) : (
                        temps === 0 ? (
                            <div>Vous finissez les cours à la même heure</div>
                        ) : (
                            <div>Vous finissez les cours avec {temps} min d'écarts</div>
                        )
                    )}


                </div>

                <div className="ResultSearchCardButton">
                    <button className="askButton" onClick={() => handleSubmit(conducteur, jour, direction)}>Demander</button>
                </div>
            </Card>
        </Box>
    )
}

export default ResultSearchCard;