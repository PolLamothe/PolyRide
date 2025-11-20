const mongoose = require('mongoose');
const { Schema } = mongoose;

const agendaSchema = new Schema({
    url : {
        type : String,
        required : true,
        unique : true
    },
    data: {
        type: Object,
        required: true
    }
},{ timestamps: true })

const Agenda = mongoose.model('Agenda', agendaSchema);

module.exports = Agenda;