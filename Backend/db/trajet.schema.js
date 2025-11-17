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
        default : "En attente"
    },
    direction : {
        type : String,
        required : true
    }
})

const Trajet = mongoose.model('Trajet', trajetSchema);

module.exports = Trajet;