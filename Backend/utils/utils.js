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
    }
}

module.exports = utils;