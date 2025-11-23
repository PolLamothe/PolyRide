import "./PassagerSuiviRequete.css"
import {Box, Card} from "@radix-ui/themes";

function PassagerSuiviRequete(trajet){
    trajet = trajet.trajet
    console.log("trajet : ",trajet)

    return <Box className="ResultSearchCardBox">
            <Card>
                <div className="ResultSearchCardInfos">
                    <div>{trajet.driverName} - Habite à environ {Math.round(trajet.distance*10)/10} Km de votre domicile</div>
                    {trajet.direction === "aller" ? (
                        <p>Ce trajet est de votre domicile vers l'école</p>
                    ): <p>Ce trajet est de l'école vers votre domicile</p>}
                    <p>Etat de la requête : {trajet.état}</p>
                    <p>Date du trajet : {new Date(trajet.jour).toLocaleDateString()}</p>
                </div>
            </Card>
        </Box>
}

export default PassagerSuiviRequete