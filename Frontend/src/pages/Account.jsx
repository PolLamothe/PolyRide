
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import polyrideDAO from "../dao/PolyrideDAO";
import Header from "../components/Header.jsx";
import './Account.css'

function Account() {

    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
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
    const editing = () =>{
        setFormData(user);
        setIsEditing(true);
    }

    const cancelEditing = () =>{
        setFormData(null);
        setIsEditing(false);
    }

    const saveInformations = () =>{
        setUser(formData);
        setIsEditing(false);
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
                {/* affichage sans modif */}
                {user  && !isEditing && (
                    <div>
                        <h2>Informations du compte</h2>
                        <p><strong>Nom d'utilisateur:</strong> {user.userName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Usage:</strong> {user.usage}</p>
                        <p><strong>Emploi du temps:</strong> {user.calendarLink}</p>
                        <p><strong>Numéro de téléphone:</strong> {user.phoneNumber}</p>
                        <button onClick={() => editing()}>Modifier les informations</button>
                        <button onClick={() => handleLogout()}>Déconnexion</button>
                    </div>
                )
                }
                {/* affichage en modifiant */}
                {user  && isEditing && (
                    <div className="">
                        <h2 className="test">Informations du compte</h2>
                        <p><strong>Nom d'utilisateur:</strong> <input type="text" value={formData.userName} 
                        onChange={(e)=> setFormData({...formData, userName: e.target.value})}/> </p>
                        <p><strong>Email:</strong><input type="email" value={formData.email} 
                        onChange={(e)=> setFormData({...formData, email: e.target.value})}/></p>
                        <p></p>
                        <p><strong>Emploi du temps :</strong> <input type="text" value={formData.calendarLink} 
                        onChange={(e)=> setFormData({...formData, calendarLink: e.target.value})}/> </p>
                        <p><strong>Numéro de téléphone:</strong> <input type="text" value={formData.phoneNumber} 
                        onChange={(e)=> setFormData({...formData, phoneNumber: e.target.value})}/> </p>
                        <p><strong>Usage:</strong>
                        
                        <input type="radio" name="usage" id="usage1" value={"Conducteur"}
                        checked={formData.usage === "Conducteur"}
                        onChange={(e)=> setFormData({...formData, usage: e.target.value})}/>
                        <label htmlFor="usage1">Conducteur</label>

                        <input type="radio" name="usage" value={"Passager"} 
                        checked={formData.usage === "Passager"}
                        onChange={(e)=> setFormData({...formData, usage: e.target.value})}/>
                        <label htmlFor="usage1">Passager</label> 
                        </p>
                        
                        <button onClick={() => cancelEditing()}>Annuler</button>
                        <button onClick={() => saveInformations()}>Enregistrer</button>
                        <button onClick={() => handleLogout()}>Déconnexion</button>
                    </div>
                )
                }
                {/* affichage si non connecté */}
                {!user && (
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
