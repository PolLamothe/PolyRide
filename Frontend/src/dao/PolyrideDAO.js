import config from "../config.js";

const baseHeaders = {
    "Content-Type": "application/json",
}

const athenticationHeader = () => {
    const token = getCookie("token");
    return token ? { "Authorization": token } : {};
}


const setCookie = (name, value, hours) => {
    const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
};


const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}




const polyrideDAO = {


    fetchAuthentication: async ()=> {
        if (getCookie("token") !== null) {
            const result = await fetch(config.url+"/auth/login",{
                method : "post",
                headers : {
                    ...baseHeaders,
                    ...athenticationHeader()
                }
            })
            if (result.status === 200) {
                const data = await result.json();
                setCookie("token", data.token, 24);
                return true
            }
        }
        deleteCookie("token")
        return false
    },

    fetchLogin: async (login, password) => {
        const response = await fetch(config.url+"/auth/login",{
            method: "POST",
            headers: baseHeaders,
            body : JSON.stringify({
                email: login,
                password: password
            })
        })
        if(response.status === 200) {
            let newToken = await response.json()
            setCookie("token", newToken.token, 24)
            return true
        } else if (response.status === 401) {
            return false
        }
        throw new Error(`${response.status} : ${response.statusText}`)
    },

    fetchRegister: async (email, password) => {
        try {

            const response = await fetch(config.url + "/auth/register", {
                method: "POST",
                headers: baseHeaders,
                body: JSON.stringify({
                    email : email,
                    password : password,
                }),
            });

            if (response.status === 200 || response.status === 201) {
                const data = await response.json();
                setCookie("token", data.token, 24);
                return true;
            } else {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Erreur d'inscription");
            }
        } catch (err) {
            throw err;
        }
    },

    getProfile: async () => {
        const response = await fetch(config.url + "/profile/profile", {
            method: "GET",
            headers: {
                ...baseHeaders,
                ...athenticationHeader()
            }
        });
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error(`${response.status} : ${response.statusText}`);
        }
    },

    getAgenda: async (week) => {
        const response = await fetch(config.url + "/agenda", {
            method: "POST",
            headers: {
                ...baseHeaders,
                ...athenticationHeader(),
            },
            body: JSON.stringify({
                week : week
            })
        });
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error(`${response.status} : ${response.statusText}`);
        }
    },

    updateProfile: async (usage, calendar, phoneNumber, numero, rue, codePostal, ville) => {
        let body = {
            usage: usage,
            calendarLink: calendar,
            phoneNumber: phoneNumber,
            
        }
        if (numero != "" && rue != "" && codePostal != "" && ville != ""){
            body.address = {
                numero: numero,
                rue: rue,
                codePostal: codePostal,
                ville: ville
            }
        }
        const response = await fetch(config.url + "/profile/profile", {
            method: "POST",
            headers: {
                ...baseHeaders,
                ...athenticationHeader()
            },
            body: JSON.stringify(body)
        });
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error(`${response.status} : ${response.statusText}`);
        }
    },

    deleteProfile: async()=> {
        const response = await fetch(config.url + "/profile/profile",{
            method: "DELETE",
            headers:{
                ...baseHeaders,
                ...athenticationHeader()
            }
        });
        if (response.status == 200 || response. status == 204){
            return true
        } else {
            throw new Error('${response.status} : ${response.statusText}')
        }
    },

    
    getProposal: async (time, day) =>{
        const response = await fetch(config.url + "/trajet/proposal", {
            method: "POST",
            headers: {
                ...baseHeaders,
                ...athenticationHeader(),
            },
            body: JSON.stringify({
                time: time,
                day: day
            })
        })
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error(`${response.status} : ${response.statusText}`);
        }
    },

    askForTrajet: async (conducteur, jour, direction) => {
        const response = await fetch(config.url + "/trajet/ask", {
            method: "POST",
            headers: {
                ...baseHeaders,
                ...athenticationHeader(),
            },
            body: JSON.stringify({
                conducteur: conducteur,
                jour: jour,
                direction: direction
            })
        })
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error(`${response.status} : ${response.statusText}`);
        }
    },

    getTrajetRequest: async () => {
        const response = await fetch(config.url + "/trajet/request", {
            method: "GET",
            headers: {
                ...baseHeaders,
                ...athenticationHeader()
            }
        })
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error(`${response.status} : ${response.statusText}`);
        }
    }

}

export default polyrideDAO;
