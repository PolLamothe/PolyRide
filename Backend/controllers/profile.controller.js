const userDAO = require('../dao/user.dao.js');
const utils = require('../utils/utils.js');
const agendaDAO = require('../dao/agenda.dao.js');
const trajetDAO = require('../dao/trajet.dao.js');

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
                calendarLink : user.calendarLink,
                userName : utils.extractUserNameFromEmail(user.email),
                usage : user.usage,
                address : user.adresse,
                phoneNumber : user.phoneNumber
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

            if(req.body.calendarLink){
                const agenda = await agendaDAO.findAgendaByUrl(req.body.calendarLink);
                if(agenda == null){
                    await agendaDAO.createAgenda(req.body.calendarLink);
                }
            }

            let position = null

            if(req.body.address){
                if (typeof req.body.address.numero != "number") {
                    return res.status(400).json({ message: "Numéro d'adresse invalide"});
                }
                if (!/^(\+33|0033|0)[1-9]\d{8}$/.test(req.body.phoneNumber)) {
                    return res.status(400).json({ message: "Numéro de téléphone invalide"});
                }
                
                position = await utils.geocodeAddress(req.body.address);
            }

            await userDAO.updateProfile(user.email, req.body.usage, req.body.calendarLink,req.body.address,position,req.body.phoneNumber);
            return res.status(200).json({ message: "Profil mis à jour avec succès." });
        }catch(e){
            console.log("[PROFILE ERROR] : ",e)
            res.status(500).json({message: "Erreur serveur lors de l'actualisation du profil." })
        }
    },
    deleteProfile : async(req,res)=>{
        try{
            let user = await utils.getUserFromJWT(req.headers.authorization);
            if (user.sucess == false){
                return res.status(400).json({message : user.message})
            }
            user = user.user
            await userDAO.deleteUser(user.email);
            await trajetDAO.deleteUserTrajet(user)
            return res.status(200).json({ message: "Profil supprimé avec succès." });
        }catch(e){
            console.log("[PROFILE ERROR] : ",e)
            res.status(500).json({message: "Erreur serveur lors de la suppression du profil." })
        }
    }
}
module.exports = profileController