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
    if (config.demoMode && name === "token") return "demo-token";
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
        if (config.demoMode) return true;
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
                setCookie("token", data.token, 24*7);
                return true
            }
        }
        deleteCookie("token")
        return false
    },

    fetchLogin: async (login, password) => {
        if (config.demoMode) {
            setCookie("token", "demo-token", 24*7);
            return true;
        }
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
            setCookie("token", newToken.token, 24*7)
            return true
        } else if (response.status === 401) {
            return false
        }
        throw new Error(`${response.status} : ${response.statusText}`)
    },

    fetchRegister: async (email, password) => {
        if (config.demoMode) {
            setCookie("token", "demo-token", 24*7);
            return true;
        }
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
                setCookie("token", data.token, 24*7);
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
        if (config.demoMode) {
            return {
                email: "demo@polytech.univ-nantes.fr",
                firstName: "Jean",
                lastName: "Dupont",
                phoneNumber: "0601020304",
                usage: "Passager",
                address: {
                    numero: "1",
                    rue: "Rue de la Paix",
                    codePostal: "44000",
                    ville: "Nantes"
                },
                calendarLink: "demo-calendar-link"
            };
        }
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
        if (config.demoMode) {
            const today = new Date();
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay() + 1);

            const createDate = (dayOffset, time) => {
                const d = new Date(startOfWeek);
                d.setDate(startOfWeek.getDate() + dayOffset);
                return `${d.toISOString().split('T')[0]}T${time}:00`;
            };

            return {
                [createDate(0, "00:00").split('T')[0]]: [
                    { uid: "1", summary: "Mathématiques", start: createDate(0, "08:00"), end: createDate(0, "10:00") },
                    { uid: "2", summary: "Physique", start: createDate(0, "10:15"), end: createDate(0, "12:15") }
                ],
                [createDate(1, "00:00").split('T')[0]]: [
                    { uid: "3", summary: "Projet Agile", start: createDate(1, "08:00"), end: createDate(1, "12:00") },
                    { uid: "4", summary: "Anglais", start: createDate(1, "13:30"), end: createDate(1, "15:30") }
                ],
                [createDate(2, "00:00").split('T')[0]]: [
                    { uid: "5", summary: "Économie", start: createDate(2, "08:00"), end: createDate(2, "10:00") }
                ],
                [createDate(3, "00:00").split('T')[0]]: [
                    { uid: "6", summary: "Réseaux", start: createDate(3, "10:15"), end: createDate(3, "12:15") }
                ],
                [createDate(4, "00:00").split('T')[0]]: [
                    { uid: "7", summary: "TP Électronique", start: createDate(4, "14:00"), end: createDate(4, "17:00") }
                ]
            };
        }
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
        if (config.demoMode) return { success: true };
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
        if (config.demoMode) return true;
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
        if (config.demoMode) {
            return [
                {
                    email: "alice.bernard@etu.univ-nantes.fr",
                    difference: 0,
                    distance: 2.5
                },
                {
                    email: "bob.cousin@etu.univ-nantes.fr",
                    difference: 15,
                    distance: 5.2
                },
                {
                    email: "claire.petit@etu.univ-nantes.fr",
                    difference: 30,
                    distance: 12.0
                }
            ];
        }
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
        if (config.demoMode) return { success: true };
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
    
    replyTrajet: async (trajectID, response) => {
        if (config.demoMode) return { success: true };
        const responseserver = await fetch(config.url + "/trajet/decideTrajet", {
            method: "POST",
            headers: {
                ...baseHeaders,
                ...athenticationHeader(),
            },
            body: JSON.stringify({
                trajetId:trajectID,
                decision:response
            })
        })
        if (responseserver.status === 200) {
            return await responseserver.json();
        } else {
            throw new Error(`${responseserver.status} : ${responseserver.statusText}`);
        }
    },
    getTrajetRequest: async () => {
        if (config.demoMode) {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            return {
                driver: [
                    {
                        _id: "req_driver_1",
                        passengerName: "Charlie Durand",
                        distance: 3.4,
                        direction: "aller",
                        état: "en attente",
                        jour: tomorrow.toISOString(),
                        telephone: "06 12 34 56 78",
                        adresse: { numero: "12", rue: "Avenue de la République", ville: "Nantes" }
                    }
                ],
                passenger: [
                    {
                        _id: "req_pass_1",
                        driverName: "Alice Bernard",
                        distance: 2.5,
                        direction: "aller",
                        état: "accepté",
                        jour: today.toISOString(),
                        telephone: "07 98 76 54 32",
                        adresse: { numero: "45", rue: "Boulevard Michelet", ville: "Nantes" }
                    },
                    {
                        _id: "req_pass_2",
                        driverName: "Bob Cousin",
                        distance: 5.2,
                        direction: "retour",
                        état: "en attente",
                        jour: tomorrow.toISOString()
                    }
                ]
            };
        }
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
