import polyrideDAO from "../dao/PolyrideDAO";
import Header from "../components/Header.jsx";
import { useState, useEffect } from "react";
import "./Tracking.css";


function Tracking(){
    const [user, setUser] = useState(null);
    const [usage,setUsage] = useState(null)

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
    }, []);

    function updateUsage(newUsage){
        if(newUsage != usage){
            setUsage(newUsage)
        }
    }

    return <div>
        <Header />
        {user && usage && (
            <div>
                <h2>Page de suivi des demandes de trajets</h2>
                <p>Page de suivi des reqûetes des trajets</p>
                <p>Pense à mettre ton compte en usage "Passager et Conducteur" (jte laisse stylisé tout ça)</p>
                {user.usage == "Conducteur et Passager" && (
                    <div>
                        <button id={usage == "Conducteur" ? "activeUsageButton" : ""} onClick={()=>{updateUsage("Conducteur")}}>Conducteur</button>
                        <button id={usage == "Passager" ? "activeUsageButton" : ""} onClick={()=>{updateUsage("Passager")}}>Passager</button>
                    </div>
                )}
                {usage == "Conducteur" && (
                    <div>
                        <p>Affichages des trajets que des passagé on demandé</p>    
                    </div>
                )}
                {usage == "Passager" && (
                    <div>
                        <p>Affichage des trajets que j'ai demandé aux conducteurs</p>
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