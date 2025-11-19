import {Box, Card} from "@radix-ui/themes";
import "./ResultSearchCard.css"

function ResultSearchCard({prenom, nom, distance, heure_debut}) {

    function handleSubmit() {

    }

    return (
        <Box className="ResultSearchCardBox">
            <Card>
                <div className="ResultSearchCardInfos">
                    <span>{prenom} {nom} </span>
                    <span>&nbsp;- {distance}</span>
                    <br/>
                    <span>Commence les cours à {heure_debut}</span>
                </div>

                <div className="ResultSearchCardButton">
                    <button className="askButton" onClick={handleSubmit}>Demander</button>
                </div>
            </Card>
        </Box>
    )
}

export default ResultSearchCard;