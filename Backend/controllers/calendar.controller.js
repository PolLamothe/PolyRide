const userDAO = require('../dao/user.dao.js');
const utils = require('../utils/utils.js');
const validator = require('validator');
const axios = require('axios');
const ical = require('node-ical');

const validateCalendar = async (url) => {
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
};


const calendarController = {
    registerCalendar : async (req,res)=>{
        try{
            const { calendarLink } = req.body;

            if (!calendarLink || !validator.isURL(calendarLink)) {
                return res.status(400).json({ message: 'Lien de calendrier invalide' });
            }

            try {
                await validateCalendar(calendarLink);
            } catch (error) {
                return res.status(400).json({ message: error.message });
            }

            let user = await utils.getUserFromJWT(req.headers.authorization);
            if (user.sucess == false){
                return res.status(400).json({message : user.message})
            }
            user = user.user
            await userDAO.updateCalendar(user.email, calendarLink)
            res.status(200).json({message : "Calendrier enregistré"})
        }catch(e){
            console.log("[CALENDAR ERROR] : ",e)
            res.status(500).json({message: "Erreur serveur lors de l'enregistrement du calendrier." })
        }
    }
}

module.exports = calendarController