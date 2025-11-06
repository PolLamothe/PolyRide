const utils = {
    verifyPassword : (password)=>{
        if (password.length < 9){
            return false
        }

        if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)){
            return false
        }
        return true
    
    }
}

module.exports = utils;