const userDAO = require('../dao/user.dao.js');
const utils = require('../utils/utils.js');

const agendaController = {
    getUserAgenda : async (req,res)=>{
        try{
            let user = await utils.getUserFromJWT(req.headers.authorization);
            if (user.sucess == false){
                return res.status(400).json({message : user.message})
            }
            user = user.user
            return res.send(await utils.getUserAgenda(user,req.body.week))
        }catch(e){
            console.log("[AGENDA ERROR] : ",e)
            return res.status(500).json({message: "Erreur serveur lors de la récupération de l'agenda." })
        }
    }
}

module.exports = agendaController