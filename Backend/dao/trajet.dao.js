const Trajet = require('../db/trajet.schema.js');

const trajetDAO = {
    createTrajet : async(conducteur, passager,jour,direction)=>{
        if(direction != "aller" && direction != "retour"){
            throw Error("Direction invalide")
        }
        return await Trajet.create({conducteur,passager,jour,direction})
    },
    accceptTrajet : async(id)=>{
        return await Trajet.updateOne({_id : id},{$set : {état : "Accepté"}})
    },
    refuseTrajet : async (id)=>{
        return await Trajet.updateOne({_id : id},{$set : {état : "Refusé"}})
    },
    getUserPendingTrajetRequest : async(user)=>{
        if(user.usage != "Conducteur" && user.usage != "Conducteur et Passager"){
            throw Error("L'utilisateur n'est pas un conducteur")
        }
        return await Trajet.find({conducteur : user.email, état : "En attente", jour : {$gte : new Date()}})
    },
    removeAll: async () => {
        return await Trajet.deleteMany({});
    }
}

module.exports = trajetDAO;