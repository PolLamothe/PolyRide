import "/ConducteurDemande.css";
import {Box, Card} from "@radix-ui/themes";
import polyrideDAO from "../dao/PolyrideDAO.js";
import {useState} from "react";

function ConducteurDemande(trajet,trajectID){
    trajet = trajet.trajet
    console.log("trajet : ",trajet)

    const handleRefuse = async (trajectID) => {
        polyrideDAO.replyTrajet(trajectID, 'refuse')
            .then(result => {
                console.log("denyTrajet lancé",result);
            })
            .catch(error => {})
    }
    const handleAccept = async (trajectID) => {
        polyrideDAO.replyTrajet(trajectID, 'accept')
            .then(result => {
                console.log("acceptTrajet lancé",result);
            })
            .catch(error => {})
    }
    return <Box className="replyTrajetBox">
            <Card>
                <div className="replyTrajetInfos">
                    <div>{trajet.driverName} - Habite à environ {Math.round(trajet.distance*10)/10} Km de votre domicile</div>
                    {trajet.direction === "aller" ? (
                        <p>Ce trajet est de votre domicile vers l'école</p>
                    ): <p>Ce trajet est de l'école vers votre domicile</p>}
                    <p>Etat de la requête : {trajet.état}</p>
                    <p>Date du trajet : {new Date(trajet.jour).toLocaleDateString()}</p>
                </div>
                <div className="replyTrajetButtons">
                    <button onClick={() => handleAccept(trajectID)}>Accepter</button>
                    <button onClick={() => handleRefuse(trajectID)}>Refuser</button>
                </div>
            </Card>
        </Box>
}

export default ConducteurDemande