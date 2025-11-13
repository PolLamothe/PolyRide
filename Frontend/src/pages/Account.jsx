
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import polyrideDAO from "../dao/PolyrideDAO";
import Header from "../components/Header.jsx";

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
            <Header />
            <div className="account">
                {user ? (
                    <div>
                        <h2>Informations du compte</h2>
                        <p><strong>Nom d'utilisateur:</strong> {user.userName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Usage:</strong> {user.usage}</p>
                        <button onClick={() => navigate("/auth/login")}>Déconnexion</button>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    )
}

export default Account;