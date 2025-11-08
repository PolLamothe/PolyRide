const userDAO = require('../dao/user.dao.js');
const jwt = require('jsonwebtoken');

const utils = {
    verifyPassword : (password)=>{
        if (password.length < 9){
            return false
        }

        if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)){
            return false
        }
        return true
    
    },
    async getUserFromJWT(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userDAO.findUserByEmail(decoded.email);
            if (user == null){
                return {
                    sucess : false,
                    message : "Utilisateur inexistant"
                }
            }
            return {
                sucess : true,
                user : user
            }
        } catch (error) {
            console.log(error)
            return {
                sucess : false,
                message : "Token JWT invalide"
            }
        }
    },
    isCalendarLinkValid(link){
        return link.startWith("http://edt-v2.univ-nantes.fr/calendar/ics?")
    }
}

module.exports = utils;