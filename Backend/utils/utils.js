const userDAO = require('../dao/user.dao.js');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const ical = require('node-ical');

const utils = {
    verifyPassword : (password)=>{
        if (password.length < 9){
            return false
        }

        if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)){
            return false
        }
        return true
    
    },
    async getUserFromJWT(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userDAO.findUserByEmail(decoded.email);
            if (user == null){
                return {
                    sucess : false,
                    message : "Utilisateur inexistant"
                }
            }
            return {
                sucess : true,
                user : user
            }
        } catch (error) {
            console.log(error)
            return {
                sucess : false,
                message : "Token JWT invalide"
            }
        }
    },
    isCalendarLinkValid(link){
        return link.startWith("http://edt-v2.univ-nantes.fr/calendar/ics?")
    },
    validateCalendar : async (url) => {
        try {
            const response = await axios.get(url);
            const data = ical.parseICS(response.data);
            if (Object.keys(data).length === 0) {
                throw new Error('Le calendrier est vide ou invalide.');
            }
        } catch (error) {
            console.error("Validation Error: ", error);
            throw new Error('Le lien fourni ne semble pas être un calendrier iCal valide ou est inaccessible.');
        }
    },
    async geocodeAddress(address) {
        const { numero, rue, codePostal, ville } = address;
        // Formate l'adresse pour l'URL
        const query = `${numero} ${rue}, ${codePostal} ${ville}, France`;
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

        try {
            const response = await axios.get(url, {
            headers: {
                // !! IMPORTANT: Nominatim bloque les requêtes sans User-Agent spécifique
                'User-Agent': 'PolyRide/1.0'
            }
            });

            if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            return { lat: parseFloat(lat), lon: parseFloat(lon) };
            } else {
            throw new Error('Adresse non trouvée.');
            }
        } catch (error) {
            console.error(`[GECODING ERROR] ${error.message}`);
            throw new Error('Erreur lors de la géolocalisation de l\'adresse.');
        }
    },
    getDistance(lat1, lon1, lat2, lon2) {

    function toRad(deg) {
        return deg * (Math.PI / 180);
    }

    // Rayon moyen de la Terre en kilomètres
    const R = 6371; 

    // Convertir les latitudes et longitudes de degrés en radians
    const radLat1 = toRad(lat1);
    const radLon1 = toRad(lon1);
    const radLat2 = toRad(lat2);
    const radLon2 = toRad(lon2);

    // Calculer les différences (delta) en radians
    const dLat = radLat2 - radLat1; // Δφ
    const dLon = radLon2 - radLon1; // Δλ

    // Appliquer la formule de Haversine
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(radLat1) * Math.cos(radLat2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance finale (d = R * c)
    const distance = R * c;

    return distance; // Retourne la distance en km
    }
}

module.exports = utils;