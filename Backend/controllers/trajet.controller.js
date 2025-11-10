const userDAO = require('../dao/user.dao.js');
const utils = require('../utils/utils.js');

const trajetController = {
    getTrajetProposal : async (req,res)=>{
        try{
            let user = await utils.getUserFromJWT(req.headers.authorization);
            if (user.sucess == false){
                return res.status(400).json({message : user.message})
            }
            user = user.user
            res.send(await userDAO.getNearestDriver(user))
        }catch(e){
            console.log("[TRAJET ERROR] : ",e)
            return res.status(500).json({message: "Erreur serveur lors de la récupération des trajets." })
        }
    }
}

module.exports = trajetController