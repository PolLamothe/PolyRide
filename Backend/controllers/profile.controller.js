const userDAO = require('../dao/user.dao.js');
const utils = require('../utils/utils.js');
const validator = require('validator');

const profileController = {
    getProfile : async (req,res)=>{
        try{
            let user = await utils.getUserFromJWT(req.headers.authorization);
            if (user.sucess == false){
                return res.status(400).json({message : user.message})
            }
            user = user.user
            return res.status(200).json({
                email : user.email,
                calendar : user.calendarLink,
                userName : user.email.split(".")[0].charAt(0).toUpperCase() + user.email.split(".")[0].slice(1)+" "+(user.email.split(".")[1]).split("@")[0].toUpperCase()
            })
        }catch(e){
            console.log("[PROFILE ERROR] : ",e)
            return res.status(500).json({message: "Erreur serveur lors de la récupération du profil." })
        }
    },
    updateProfile : async (req,res)=>{
        try{
            let user = await utils.getUserFromJWT(req.headers.authorization);
            if (user.sucess == false){
                return res.status(400).json({message : user.message})
            }
            user = user.user
            if (req.body.usage != "Conducteur" && req.body.usage != "Passager" && req.body.usage != "Conducteur et Passager"){
                return res.status(400).json({message : "Utilisation invalide"})
            }

            if (!req.body.calendarLink || !validator.isURL(req.body.calendarLink)) {
                return res.status(400).json({ message: 'Lien de calendrier invalide' });
            }

            try {
                await utils.validateCalendar(req.body.calendarLink);
            } catch (error) {
                return res.status(400).json({ message: error.message });
            }

            userDAO.updateProfile(user.email, req.body.usage, req.body.calendarLink);
            return res.status(200).json({ message: "Profil mis à jour avec succès." });
        }catch(e){
            console.log("[PROFILE ERROR] : ",e)
            res.status(500).json({message: "Erreur serveur lors de l'actualisation du profil." })
        }
    }
}
module.exports = profileController