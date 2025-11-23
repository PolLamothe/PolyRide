import polyrideDAO from "../dao/PolyrideDAO";
import Header from "../components/Header.jsx";
import { useState, useEffect } from "react";
import "./Tracking.css";
import {Box} from "@radix-ui/themes";


function Tracking(){
    const [user, setUser] = useState(null);
    const [usage,setUsage] = useState(null)
    const [passengerRequest,setPassengerRequest] = useState(null)
    const [myDriverRequest,setMyDriverRequest] = useState(null)

    useEffect(() => {
        polyrideDAO.getProfile()
            .then(data => {
                console.log(data);
                setUser(data);
                if(data.usage == "Passager"){
                    setUsage("Passager")
                }else if(data.usage == "Conducteur et Passager" || data.usage == "Conducteur"){
                    setUsage("Conducteur")
                }

            })
            .catch(err => {
                console.log(err);
            });

        polyrideDAO.getTrajetRequest()
            .then(data => {
                console.log(data);
                setPassengerRequest(data.driver);
                setMyDriverRequest(data.passenger);
            })
            .catch(err => {
                console.log(err);
            });

    }, []);

    function updateUsage(newUsage){
        if(newUsage != usage){
            setUsage(newUsage)
        }
    }

    return <div>
        <Header />
        <h2 className="title_Tracking">Suivi</h2>
        {user && usage && (
            <div>
                {user.usage == "Conducteur et Passager" && (
                    <div className="buttonChoice">
                        <button id={usage == "Conducteur" ? "activeUsageButton" : ""} onClick={()=>{updateUsage("Conducteur")}}>Conducteur</button>
                        <button id={usage == "Passager" ? "activeUsageButton" : ""} onClick={()=>{updateUsage("Passager")}}>Passager</button>
                    </div>
                )}
                {usage == "Conducteur" && (
                    <div className="mainContent">
                        <h2>Demandes de trajets reçues</h2>
                        {passengerRequest ? (
                            passengerRequest.map((passenger, index) => (
                                <span key={index} style={{padding: "2em"}}>{passenger.passager}</span>
                            ))
                        ) : (
                            <span>Chargement ...</span>
                        )}
                    </div>
                )}
                {usage == "Passager" && (
                    <div className="mainContent">
                        <h2>Demandes de trajets envoyées</h2>
                        {myDriverRequest ? (
                            myDriverRequest.map((driver, index) => (
                                <span key={index} style={{padding: "2em"}}>{driver.conducteur}</span>
                            ))
                        ) : (
                            <span>Chargement ...</span>
                        )}
                    </div>
                )}
            </div>
        )}
        {!user && (
            <p>Chargement</p>
        )}
    </div>
}

export default Tracking;