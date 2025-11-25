import polyrideDAO from "../dao/PolyrideDAO";
import Header from "../components/Header.jsx";
import { useState, useEffect } from "react";
import "./Tracking.css";
import {Box} from "@radix-ui/themes";
import PassagerSuiviRequete from "../components/PassagerSuiviRequete.jsx";
import {Button, Text} from "@radix-ui/themes/dist/esm/index.js";
import ConducteurDemande from "../components/ConducteurDemande.jsx";


function Tracking(){
    const [user, setUser] = useState(null);
    const [usage,setUsage] = useState(null)
    const [passengerRequest,setPassengerRequest] = useState(null)
    const [myDriverRequest,setMyDriverRequest] = useState(null)

    // Nouveau state pour afficher le message d’erreur / succès
    const [feedback, setFeedback] = useState(null);

    const refreshTrajets = () => {
        polyrideDAO.getTrajetRequest()
            .then(data => {
                setPassengerRequest(data.driver);
                setMyDriverRequest(data.passenger);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        polyrideDAO.getProfile()
            .then(data => {
                setUser(data);
                if (data.usage === "Passager") {
                    setUsage("Passager");
                } else if (data.usage === "Conducteur et Passager" || data.usage === "Conducteur") {
                    setUsage("Conducteur");
                }
            })
            .catch(err => {
                console.log(err);
            });

        refreshTrajets();

        polyrideDAO.getTrajetRequest()
            .then(data => {
                if (data.message === "request_sent") {
                    setFeedback({ type: "success", text: "Votre demande de trajet a bien été envoyée !" });
                }

                if (data.error === "past_or_today_not_allowed") {
                    setFeedback({ type: "error", text: "Impossible d'envoyer une demande pour aujourd'hui ou un jour déjà passé." });
                }
            })
            .catch(err => {
                console.log(err);
                setFeedback({ type: "error", text: "Une erreur est survenue lors de l’envoi de la demande." });
            });

    }, []);

    function updateUsage(newUsage){
        if(newUsage !== usage){
            setUsage(newUsage)
        }
    }

    return <div>
        <Header />
        <h2 className="title_Tracking">Suivi</h2>

        {/* Message feedback */}
        {feedback && (
            <div
                style={{
                    margin: "1em auto",
                    padding: "1em",
                    width: "80%",
                    borderRadius: "10px",
                    textAlign: "center",
                    background: feedback.type === "error" ? "#ffdddd" : "#ddffdd",
                    border: feedback.type === "error" ? "1px solid #ff9090" : "1px solid #60c060",
                    color: feedback.type === "error" ? "#c00000" : "#006000",
                    fontWeight: "bold",
                }}
            >
                {feedback.text}
            </div>
        )}

        {user && usage && (
            <div>
                {user.usage === "Conducteur et Passager" && (
                    <div className="buttonChoice">
                        <button id={usage === "Conducteur" ? "activeUsageButton" : ""} onClick={()=>{updateUsage("Conducteur")}}>Conducteur</button>
                        <button id={usage === "Passager" ? "activeUsageButton" : ""} onClick={()=>{updateUsage("Passager")}}>Passager</button>
                    </div>
                )}

                {usage === "Conducteur" && (
                    <div className="mainContent">
                        <h2>Demandes de trajets reçues</h2>
                        {passengerRequest ? (
                            passengerRequest.length === 0 ?
                                <span style={{marginTop:"2em"}}>Vous n'avez envoyé aucune demande de trajet pour cette semaine</span>
                                :
                                passengerRequest.map((passenger) => (
                                    <ConducteurDemande trajet={passenger} onTrajetUpdate={refreshTrajets}></ConducteurDemande>
                                ))
                        ) : (
                            <span>Chargement ...</span>
                        )}
                    </div>
                )}

                {usage === "Passager" && (
                    <div className="mainContent">
                        <h2>Demandes de trajets envoyées</h2>
                        <div className="contentContainer">
                            {myDriverRequest ? (
                                myDriverRequest.length === 0 ?
                                    <span style={{marginTop:"2em"}}>Vous n'avez envoyé aucune demande de trajet pour cette semaine</span>
                                    :
                                    myDriverRequest.map((driver) => (
                                        <div key={driver._id}>
                                            <PassagerSuiviRequete trajet={driver}></PassagerSuiviRequete>
                                        </div>
                                    ))

                            ) : (
                                <span>Chargement ...</span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        )}

        {!user && (
            <Box className="trackingNotConnect" style={{ padding: "2rem", textAlign: "center" }}>
                <Text>Vous devez être connecté pour accéder à cette page.</Text>
                <Button
                    onClick={() => (window.location.href = "/auth/login")}
                    style={{ marginTop: "1rem" }}
                >
                    Se connecter
                </Button>
            </Box>
        )}
    </div>
}

export default Tracking;
