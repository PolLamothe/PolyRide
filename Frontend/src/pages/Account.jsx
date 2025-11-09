
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import polyrideDAO from "../dao/PolyrideDAO";

function Account() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        polyrideDAO.getProfile()
            .then(data => {
                setUser(data);
            })
            .catch(err => {
                navigate("/auth/login");
            });
    }, []);

    return (
        <>
            <h1>Bravo Vous êtes Connecté !!</h1>
            {user ? (
                <div>
                    <h2>Informations du compte</h2>
                    <p><strong>Nom d'utilisateur:</strong> {user.userName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Usage:</strong> {user.usage}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}

export default Account;