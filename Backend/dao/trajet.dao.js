const Trajet = require('../db/trajet.schema.js');
const utils = require('../utils/utils.js');

const trajetDAO = {
    createTrajet : async(conducteur, passager,jour,direction)=>{
        if(direction != "aller" && direction != "retour"){
            throw Error("Direction invalide")
        }
        return await Trajet.create({conducteur,passager,jour,direction})
    },

    accceptTrajet : async(id)=>{
        return await Trajet.updateOne(
            {_id : id},
            {$set : {état : "Accepté"}},
            { runValidators: true }
        )
    },

    refuseTrajet : async (id)=>{
        return await Trajet.updateOne(
            {_id : id},
            {$set : {état : "Refusé"}},
            { runValidators: true }
        )
    },

    getDriverTrajetRequest : async(user)=>{
        if(!utils.isUserDriver(user)){
            throw Error("L'utilisateur n'est pas un conducteur")
        }
        return await Trajet.find({conducteur : user.email, jour : {$gte : new Date()}})
    },
    getPassengerTrajetRequest : async(user)=>{
        if(!utils.isUserPassenger(user)){
            throw Error("L'utilisateur n'est pas un passager")
        }
        return await Trajet.find({passager : user.email, jour : {$gte : new Date()}})

    },
    removeAll: async () => {
        return await Trajet.deleteMany({});
    }
}

module.exports = trajetDAO;