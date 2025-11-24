
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Box, Button, Text} from "@radix-ui/themes";
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
                console.log(data);
                setUser(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleLogout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUser(null);
    }
    const editing = () => {
        const initialFormData = {
            ...user,
            address: user.address || { numero: '', rue: '', codePostal: '', ville: '' }
        };
        setFormData(initialFormData);
        setIsEditing(true);
    }

    const cancelEditing = () => {
        setFormData(null);
        setIsEditing(false);
    }

    const saveInformations = () => {
        setUser(formData);
        setIsEditing(false);
        polyrideDAO.updateProfile(formData.usage, formData.calendarLink, formData.phoneNumber, formData.address.numero, formData.address.rue, formData.address.codePostal, formData.address.ville)
            .then(r => {
                console.log(r.data);
            }
            )
            .catch(err => {
                console.log(err);
            })
    }
    const deleteAccount = async () => {
        const confirmDelete = window.confirm("Voulez-vous vraiment supprimer votre compte ?");
        if (!confirmDelete) return;
        try {
            await polyrideDAO.deleteProfile();
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setUser(null);
            navigate("/auth/register");
        } catch (err) {
            console.log(err);
        }
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
                <h2 className="title_account">Informations du compte</h2>
                {/* affichage sans modif */}
                {user && !isEditing && (
                    <div>
                        <div className="account_form">
                            <p><strong>Nom d'utilisateur:</strong> {user.userName}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Usage:</strong> {user.usage || 'Non renseigné'}</p>
                            <p><strong>Emploi du temps:</strong> {user.calendarLink || 'Non renseigné'}</p>
                            <p><strong>Numéro de téléphone:</strong> {user.phoneNumber || 'Non renseigné'}</p>
                            <p><strong>Adresse Postale:</strong> {user.address ? `${user.address.numero} ${user.address.rue}, ${user.address.ville} ${user.address.codePostal}` : 'Non renseignée'}</p>
                        </div>
                        <div className="account_form_but">
                            <button onClick={() => editing()}>Modifier les informations</button>
                            <button onClick={() => handleLogout()}>Déconnexion</button>
                            <button onClick={() => deleteAccount()}>Supprimer le compte</button>
                        </div>
                    </div>
                )
                }
                {/* affichage en modifiant */}
                {user && isEditing && (
                    <div>
                        <div className="account_form">
                            <p><strong>Emploi du temps :</strong> <input type="text" value={formData.calendarLink}
                                onChange={(e) => setFormData({ ...formData, calendarLink: e.target.value })} /> </p>
                            <p><strong>Numéro de téléphone:</strong> <input type="text" value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} /> </p>
                            <p><strong>Usage:</strong>

                                <select name="usage" value={formData.usage} onChange={(e) => setFormData({ ...formData, usage: e.target.value })}>
                                    <option value="Conducteur">Conducteur</option>
                                    <option value="Passager">Passager</option>
                                    <option value="Conducteur et Passager">Conducteur et Passager</option>
                                </select>
                            </p>

                            <p>
                                <strong>Numéro :</strong>
                                <input
                                    type="text"
                                    value={formData.address.numero}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        address: { ...formData.address, numero: Number(e.target.value) }
                                    })}
                                />
                            </p>

                            <p>
                                <strong>Rue :</strong>
                                <input
                                    type="text"
                                    value={formData.address.rue}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        address: { ...formData.address, rue: e.target.value }
                                    })}
                                />
                            </p>

                            <p>
                                <strong>Code Postal :</strong>
                                <input
                                    type="text"
                                    value={formData.address.codePostal}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        address: { ...formData.address, codePostal: e.target.value }
                                    })}
                                />
                            </p>

                            <p>
                                <strong>Ville :</strong>
                                <input
                                    type="text"
                                    value={formData.address.ville}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        address: { ...formData.address, ville: e.target.value }
                                    })}
                                />
                            </p>

                        </div>

                        <div className="account_form_but">
                            <button onClick={() => saveInformations()}>Enregistrer</button>
                            <button onClick={() => cancelEditing()}>Annuler</button>
                        </div>
                    </div>
                )
                }
                {/* affichage si non connecté */}
                {!user && (
                    <Box className="searchNotConnect" style={{ padding: "2rem", textAlign: "center" }}>
                        <Text>Vous devez être connecté pour accéder à cette page.</Text>
                        <Button
                            onClick={() => (navigate("/auth/login"))}
                            style={{ marginTop: "1rem" }}
                        >
                            Se connecter
                        </Button>
                    </Box>
                )}
            </div>
        </>
    )
}

export default Account;
