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
        return link.startsWith("http://edt-v2.univ-nantes.fr/calendar/ics?")
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

        return distance;
    },
    async getEventsForDate(calendarUrl, date) {
        if (!(date instanceof Date && !isNaN(date))) {
            console.error("Invalid date provided to getEventsForDate");
            return [];
        }
        try {
            const response = await axios.get(calendarUrl);
            const data = ical.parseICS(response.data);
            const events = [];
            for (const k in data) {
                if (data.hasOwnProperty(k)) {
                    const ev = data[k];
                    if (ev.type === 'VEVENT') {
                        const eventDate = new Date(ev.start);
                        if (eventDate.toDateString() === date.toDateString()) {
                            events.push(ev);
                        }
                    }
                }
            }
            return events.sort((a, b) => new Date(a.start) - new Date(b.start));
        } catch (error) {
            console.error("Error fetching or parsing calendar: ", error);
            return [];
        }
    },

    async startTimeDifference(user1, user2, date) {
        if (!user1.calendarLink) {
            throw Error(user1," Calander undefined")
        }
        if (!user2.calendarLink) {
            throw Error(user2," Calander undefined")
        }

        const events1 = await this.getEventsForDate(user1.calendarLink, date);
        const events2 = await this.getEventsForDate(user2.calendarLink, date);

        if (events1.length === 0 || events2.length === 0) {
            return false;
        }

        const firstEvent1 = events1[0];
        const firstEvent2 = events2[0];

        const diff = Math.abs(new Date(firstEvent1.start) - new Date(firstEvent2.start));

        return diff;
    },

    async endTimeDifference(user1, user2, date) {
        if (!user1.calendarLink || !user2.calendarLink) {
            return false;
        }

        const events1 = await this.getEventsForDate(user1.calendarLink, date);
        const events2 = await this.getEventsForDate(user2.calendarLink, date);

        if (events1.length === 0 || events2.length === 0) {
            return false;
        }

        const lastEvent1 = events1[events1.length - 1];
        const lastEvent2 = events2[events2.length - 1];

        const diff = Math.abs(new Date(lastEvent1.end) - new Date(lastEvent2.end));
        return diff;
    },

    async getUserAgenda(user,week){
        if (!user.calendarLink) {
            throw Error("Aucun agenda enregistré pour cet utilisateur")
        }

        const agenda = {};
        const startOfWeek = new Date(week);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + (startOfWeek.getDay() === 0 ? -6 : 1)); // Lundi de la semaine (ISO week date, Monday is 1, Sunday is 7)
        startOfWeek.setHours(1, 0, 0, 0);

        for (let i = 0; i < 7; i++) {
            const currentDay = new Date(startOfWeek);
            currentDay.setDate(startOfWeek.getDate() + i);
            const events = await this.getEventsForDate(user.calendarLink, currentDay);
            agenda[currentDay.toISOString().split('T')[0]] = events.map(event => ({
                uid: event.uid,
                summary: event.summary,
                location: event.location,
                start: event.start,
                end: event.end,
                description: event.description
            }));
        }
        return agenda;
    },

    async isUserDriver(user){
        return user.usage == "Conducteur" || user.usage == "Conducteur et Passager"
    },

    async isUserPassenger(user){
        return user.usage == "Passager" || user.usage == "Conducteur et Passager"
    }
}

module.exports = utils;