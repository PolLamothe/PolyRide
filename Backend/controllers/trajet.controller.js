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
            let nearestUsers = await userDAO.getNearestDriver(user)
            let result = []
            for (const thisUser of nearestUsers) {
                let difference;
                if(req.body.time == "start"){
                    difference = await utils.startTimeDifference(user, thisUser, new Date(req.body.day));
                }else if (req.body.time == "end"){
                    difference = await utils.endTimeDifference(user, thisUser, new Date(req.body.day));
                }else{
                    return res.status(500).json({message : "Invalid time parameter"})
                }
                
                if (difference <= 15) {
                    result.push({
                        email: thisUser.email,
                        position: {
                            lat: thisUser.position.coordinates[0],
                            lon: thisUser.position.coordinates[1]
                        },
                        distance: utils.getDistance(thisUser.position.coordinates[0], thisUser.position.coordinates[1], user.position.coordinates[0], user.position.coordinates[1]),
                        difference : difference,
                        usage: thisUser.usage
                    });
                }
            }
            return res.send(result)
        }catch(e){
            console.log("[TRAJET ERROR] : ",e)
            return res.status(500).json({message: "Erreur serveur lors de la récupération des trajets." })
        }
    }
}

module.exports = trajetController