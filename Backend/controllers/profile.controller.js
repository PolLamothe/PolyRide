const utils = require('../utils/utils.js');


const profileController = {
    getProfile : async (req,res)=>{
        try{
            let user = await utils.getUserFromJWT(req.headers.authorization);
            if (user.sucess == false){
                return res.status(400).json({message : user.message})
            }
            user = user.user
            res.status(200).json({
                email : user.email,
                calendar : user.calendarLink,
                userName : user.email.split(".")[0].charAt(0).toUpperCase() + user.email.split(".")[0].slice(1)+" "+(user.email.split(".")[1]).split("@")[0].toUpperCase()
            })
        }catch(e){
            console.log("[PROFILE ERROR] : ",e)
            res.status(500).json({message: "Erreur serveur lors de la récupération du profil." })
        }
    }
}
module.exports = profileController