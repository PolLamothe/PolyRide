const Trajet = require('../db/trajet.schema.js');

const trajetDAO = {
    createTrajet : async(conducteur, passager,jour,direction)=>{
        return await Trajet.create({conducteur,passager,jour,direction})
    },
    accceptTrajet : async(id)=>{
        return await Trajet.updateOne({_id : id},{$set : {état : "Accepté"}})
    },
    refuseTrajet : async (id)=>{
        return await Trajet.updateOne({_id : id},{$set : {état : "Refusé"}})
    },
    getUserPendingTrajetRequest : async(user)=>{
        return await Trajet.find({conducteur : user.email, état : "En attente", jour : {$gte : new Date()}})
    },
    removeAll: async () => {
        return await Trajet.deleteMany({});
    }
}

module.exports = trajetDAO;