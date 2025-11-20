const Agenda = require('../db/agenda.schema.js');
const validator = require('validator');
const ical = require('node-ical');
const axios = require('axios');

async function validateCalendar(url) {
    try {
        const response = await axios.get(url);
        const data = ical.parseICS(response.data);
        if (Object.keys(data).length === 0) {
            throw new Error('Le calendrier est vide ou invalide.');
        }
    } catch (error) {
        console.error("Validation Error: ", error);
        throw new Error('Le lien fourni ne semble pas être un calendrier iCal valide ou est inaccessible.');
    }
}

const agendaDAO = {
    findAgendaByUrl: async (url) => {
        return await Agenda.findOne({ url: url });
    },
    createAgenda: async (url) => {
        if (url && !validator.isURL(url)) {
            throw Error("Lien de calendrier invalide");
        }
        await validateCalendar(url);

        const response = await axios.get(url);
        const data = ical.parseICS(response.data)
        
        return Agenda.create({ url: url, data: data});
    },
    getData : async(url)=>{
        const agenda = await agendaDAO.findAgendaByUrl(url);
        if (agenda == null) {
            await agendaDAO.createAgenda(url)
        }
        const now = new Date();
        const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
        if (agenda.updatedAt < oneWeekAgo) {
            const response = await axios.get(url);
            const data = ical.parseICS(response.data)
            await Agenda.updateOne({url : agenda.url},{data : data})
            console.log("Agenda is older than one week, needs update.");
            return data
        }else{
            return agenda.data
        }
    }
};

module.exports = agendaDAO;
