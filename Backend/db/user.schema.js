const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-z0-9\u00C0-\u00FF-]+\.[a-z0-9\u00C0-\u00FF-]+@etu\.univ-nantes\.fr$/i, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    calendarLink: {
        type: String
    },
    usage: {
        type: String,
        enum : ["Conducteur","Passager","Conducteur et Passager"]
    },
    adresse: {
        type: {
            numero: Number,
            rue: String,
            codePostal: String,
            ville: String
        }
    },
    position: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        }
    },
    phoneNumber: {
        type: String
    }
}, { timestamps: true });

userSchema.index({ position: '2dsphere' });

const User = mongoose.model('User', userSchema);

module.exports = User;