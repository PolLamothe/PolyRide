import { useState } from 'react';
import './ActiveRequestCard.css';

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
}

function ActiveRequestCard({ request, onRequestCancelled }) {
    const [isLoading, setIsLoading] = useState(false);

    // Fonction pour obtenir la couleur selon le statut
    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return '#FFA726'; // Orange
            case 'accepted': return '#66BB6A'; // Vert
            case 'rejected': return '#EF5350'; // Rouge
            case 'cancelled': return '#BDBDBD'; // Gris
            default: return '#1a9ba8'; // Turquoise par défaut
        }
    };

    // Fonction pour obtenir le texte selon le statut
    const getStatusText = (status) => {
        switch(status) {
            case 'pending': return '⏳ En attente de réponse';
            case 'accepted': return '✅ Accepté !';
            case 'rejected': return '❌ Refusé';
            case 'cancelled': return '🚫 Annulé';
            default: return status;
        }
    };

    // Fonction pour annuler une demande
    const cancelRequest = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://api.polyride.fr/api/rides/request/${request.id}/cancel`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${getCookie("token")}`
                }
            });

            if (response.ok) {
                if (onRequestCancelled) {
                    onRequestCancelled();
                }
            } else {
                console.error("Erreur lors de l'annulation");
            }
        } catch (err) {
            console.error("Erreur cancelRequest:", err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!request) return null;

    return (
        <div 
            className="active-request-card"
            style={{
                borderColor: getStatusColor(request.status),
                animation: request.status === 'pending' ? 'pulse 2s ease-in-out infinite' : 'none'
            }}
        >
            <div className="request-header">
                <h3 className="request-title">
                    🚗 Ma demande en cours
                </h3>
                <span 
                    className="request-status-badge"
                    style={{
                        backgroundColor: getStatusColor(request.status)
                    }}
                >
                    {getStatusText(request.status)}
                </span>
            </div>

            <div className="driver-info">
                <div 
                    className="driver-avatar"
                    style={{
                        background: 'linear-gradient(135deg, #1a9ba8 0%, #a8e063 100%)'
                    }}
                >
                    {request.driverName?.charAt(0).toUpperCase() || '?'}
                </div>
                <div className="driver-details">
                    <div className="driver-name">
                        {request.driverName || 'Conducteur inconnu'}
                    </div>
                    <div className="driver-label">
                        Conducteur
                    </div>
                </div>
            </div>

            <div className="trip-details">
                <div className="trip-detail-item">
                    <span className="detail-icon">🏠 Départ:</span>
                    <span className="detail-value">{request.departure || 'Non spécifié'}</span>
                </div>
                <div className="trip-detail-item">
                    <span className="detail-icon">🎯 Arrivée:</span>
                    <span className="detail-value">{request.destination || 'Non spécifié'}</span>
                </div>
                <div className="trip-detail-item">
                    <span className="detail-icon">🕐 Heure:</span>
                    <span className="detail-value time-value">{request.time || 'Non spécifié'}</span>
                </div>
            </div>

            <div className="request-date">
                Demande envoyée le {new Date(request.requestDate).toLocaleDateString('fr-FR')}
            </div>

            {request.status === 'pending' && (
                <button
                    onClick={cancelRequest}
                    disabled={isLoading}
                    className="cancel-button"
                >
                    {isLoading ? 'Annulation...' : 'Annuler la demande'}
                </button>
            )}

            {request.status === 'accepted' && (
                <button className="details-button">
                    Voir les détails
                </button>
            )}
        </div>
    );
}

export default ActiveRequestCard;