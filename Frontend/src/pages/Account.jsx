
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
            });
    }, []);

    const handleLogout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUser(null);
    }

    const login = () => {
        navigate("/auth/login");
    }

    const register = () => {
        navigate("/auth/register");
    }


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
                        <button onClick={() => handleLogout()}>Déconnexion</button>
                    </div>
                ) : (
                    <>
                        <button onClick={() => login()}>Se Connecter</button>
                        <button onClick={() => register()}>S'inscrire</button>
                    </>
                )}
            </div>
        </>
    )
}

export default Account;