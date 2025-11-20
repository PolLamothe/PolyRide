import {Box, Card} from "@radix-ui/themes";
import "./ResultSearchCard.css"

function ResultSearchCard({prenom, nom, distance, temps, when}) {

    function handleSubmit() {

    }

    return (
        <Box className="ResultSearchCardBox">
            <Card>
                <div className="ResultSearchCardInfos">
                    <div>{prenom} {nom} - Se situe à environ {distance} Km</div>
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
                    <button className="askButton" onClick={handleSubmit}>Demander</button>
                </div>
            </Card>
        </Box>
    )
}

export default ResultSearchCard;