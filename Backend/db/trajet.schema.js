const mongoose = require('mongoose');
const { Schema } = mongoose;

const trajetSchema = new Schema({
    conducteur: {
        type: String,
        required: true,
        match: [/^.+@.+$/, 'Please fill a valid email address']
    },
    passager: {
        type: String,
        required: true,
        match: [/^.+@.+$/, 'Please fill a valid email address']
    },
    jour : {
        type : Date,
        required : true
    },
    état : {
        type : String,
        required : true,
        default : "En attente",
        enum : ["En attente","Accepté","Refusé"]
    },
    direction : {
        type : String,
        required : true,
        enum : ["aller","retour"]
    }
})

const Trajet = mongoose.model('Trajet', trajetSchema);

module.exports = Trajet;