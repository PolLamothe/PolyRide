const userDAO = require('../dao/user.dao.js');
const trajetDAO = require('../dao/trajet.dao.js');
const utils = require('../utils/utils.js');
const { response } = require('express');

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
            const userTrajet = await trajetDAO.getPassengerTrajetRequest(user)
            for (const thisUser of nearestUsers) {
                let difference;

                let trajetAlreadyRequested = false
                for(const trajet of userTrajet){
                    let temp = req.body.time == "start" ? "aller" : "retour"
                    if(await utils.isTrajetSame(thisUser.email,trajet.conducteur,user.email,trajet.passager,trajet.jour.toLocaleDateString(),new Date(req.body.day).toLocaleDateString(),trajet.direction,temp)){
                        trajetAlreadyRequested = true
                        break
                    }
                }
                if(trajetAlreadyRequested){
                    continue
                }

                if(req.body.time == "start"){
                    difference = await utils.startTimeDifference(user, thisUser, new Date(req.body.day));
                }else if (req.body.time == "end"){
                    difference = await utils.endTimeDifference(user, thisUser, new Date(req.body.day));
                }else{
                    return res.status(500).json({message : "Invalid time parameter"})
                }
                
                if(difference === false){
                    continue
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
    },
    getTrajetRequest : async (req,res)=>{
        try{
            let user = await utils.getUserFromJWT(req.headers.authorization);
            if (user.sucess == false){
                return res.status(400).json({message : user.message})
            }
            user = user.user
            let response = {}
            if(await utils.isUserDriver(user)){
                response.driver = await trajetDAO.getDriverTrajetRequest(user)
                response.driver = await response.driver.map(async trajet => ({
                        ...trajet._doc,
                        driverName: utils.extractUserNameFromEmail(trajet.conducteur),
                        passengerName: utils.extractUserNameFromEmail(trajet.passager),
                        distance : await utils.getDistanceBetweenTwoUsers(trajet.conducteur,trajet.passager),
                        telephone : trajet.état == "Accepté" ? (await userDAO.findUserByEmail(trajet.passager)).phoneNumber : null
                    }));
                response.driver = await Promise.all(response.driver);
            }
            if(await utils.isUserPassenger(user)){
                response.passenger = await trajetDAO.getPassengerTrajetRequest(user)
                response.passenger = await response.passenger.map(async trajet => ({
                        ...trajet._doc,
                        driverName: utils.extractUserNameFromEmail(trajet.conducteur),
                        passengerName: utils.extractUserNameFromEmail(trajet.passager),
                        distance: await utils.getDistanceBetweenTwoUsers(trajet.passager,trajet.conducteur),
                        telephone : trajet.état == "Accepté" ? (await userDAO.findUserByEmail(trajet.conducteur)).phoneNumber : null
                    }));                
                response.passenger = await Promise.all(response.passenger);

            }
            return res.send(response)
        }catch(e){
            console.log("[TRAJET ERROR] : ",e)
            return res.status(500).json({message: "Erreur serveur lors de la récupération des demandes de trajets." })
        }
    },
    askTtrajet : async(req,res)=>{
        try{
            let user = await utils.getUserFromJWT(req.headers.authorization);
            if (user.sucess == false){
                return res.status(400).json({message : user.message})
            }
            let passager = user.user
            let conducteur = await userDAO.findUserByEmail(req.body.conducteur)
            if(conducteur.usage != "Conducteur et Passager" && conducteur.usage != "Conducteur"){
                return res.status(400).json({message : "L'utilisateur n'est pas un conducteur"})
            }
            return res.status(200).json(await trajetDAO.createTrajet(conducteur.email,passager.email,new Date(req.body.jour),req.body.direction))
        }catch(e){
            console.log("[TRAJET ERROR] : ",e)
            return res.status(500).json({message: "Erreur serveur lors de la requête du trajet." })
        }
    },
    responseTrajet : async(req,res)=>{
        try{
            let user = await utils.getUserFromJWT(req.headers.authorization);
            if (user.sucess == false){
                return res.status(400).json({message : user.message})
            }
            user = user.user
            let trajet = await trajetDAO.findTrajetById(req.body.trajetId)
            if(trajet.conducteur != user.email){
                return res.status(400).json({message : "Vous n'êtes pas le conducteur de ce trajet"})
            }
            if(req.body.decision == "accept"){
                await trajetDAO.accceptTrajet(trajet.id)
                return res.json({message : "Trajet accepté"})
            }else if (req.body.decision == "refuse"){
                await trajetDAO.refuseTrajet(trajet.id)
                return res.json({message : "Trajet refusé"})
            }else{
                return res.status(400).json({message : "Invalid decision"})
            }
        }catch(e){
            console.log("[TRAJET ERROR] : ",e)
        }
    }
}

module.exports = trajetController