import Header from "../components/Header.jsx";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from "react";
import polyrideDAO from "../dao/PolyrideDAO.js";
import config from "../config.js";
import { useNavigate } from "react-router-dom";
import "./Schedule.css";
import {Box, Button, Text} from "@radix-ui/themes/dist/esm/index.js";

function Schedule() {
    const [user, setUser] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const navigate = useNavigate();

    const [view, setView] = useState(
        window.innerWidth < 860 ? 'timeGridDay' : 'timeGridWeek'
    );

    useEffect(() => {
        const handleResize = () => {
            setView(window.innerWidth < 860 ? 'timeGridDay' : 'timeGridWeek');
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        polyrideDAO.getProfile()
            .then(data => setUser(data))
            .catch(() => {});

        const cachedSchedule = localStorage.getItem('schedule');
        const cachedTimestamp = localStorage.getItem('scheduleTimestamp');
        const now = new Date().getTime();
        const oneDay = 24 * 60 * 60 * 1000;

        let parsedSchedule = null;
        if (cachedSchedule) {
            try {
                parsedSchedule = JSON.parse(cachedSchedule);
                // Clear cache if the old bad format is found
                if (parsedSchedule && parsedSchedule.events) {
                    parsedSchedule = null;
                    localStorage.removeItem('schedule');
                    localStorage.removeItem('scheduleTimestamp');
                }
            } catch(e) {}
        }

        if (parsedSchedule && cachedTimestamp && (now - cachedTimestamp < oneDay)) {
            setSchedule(parsedSchedule);
        } else {
            const today = new Date().toISOString().split('T')[0];

            polyrideDAO.getAgenda(today)
                .then(data => {
                    setSchedule(data);
                    localStorage.setItem('schedule', JSON.stringify(data));
                    localStorage.setItem('scheduleTimestamp', now.toString());
                })
                .catch(err => console.log(err));
        }
    }, []);

    const events = schedule
        ? Object.values(schedule).flatMap(eventsForDay =>
            eventsForDay.map(ev => ({
                id: ev.uid,
                title: ev.summary || "Sans titre",
                start: ev.start,
                end: ev.end,
                extendedProps: {
                    location: ev.location,
                    description: ev.description
                }
            }))
        )
        : [];

    const formatTime = (dateString) => {
        const d = new Date(dateString);
        return d.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }).replace(":", "h");
    };

    const [icsLink, setIcsLink] = useState("");

    const handleClick = () => {
        console.log("sss",user);
        polyrideDAO.updateProfile(user.usage, icsLink, user.phoneNumber, user.address.numero, user.address.rue, user.address.codePostal, user.address.ville)
            .then(() => {
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <Header />

            <div className="schedule">
                <h2 className="title_schedule">Emploi du temps</h2>

                {config.demoMode && (
                    <div style={{
                        backgroundColor: "#e7f3ff",
                        color: "#0c5460",
                        padding: "0.5rem 1rem",
                        borderRadius: "8px",
                        margin: "1rem auto 1.5rem",
                        width: "90%",
                        maxWidth: "600px",
                        fontSize: "0.9rem",
                        textAlign: "center",
                        border: "1px solid #bee5eb",
                        boxSizing: "border-box"
                    }}>
                        <strong>Mode Démo :</strong> Le site est actuellement en mode démonstration. Les informations affichées sont fictives et non reliées au serveur.
                    </div>
                )}
                {user ? (
                    user.calendarLink ? (
                        schedule ? (
                            <div className="temp" style={{ width: '100%' }}>
                                <div className="calendar">
                                    <FullCalendar
                                        plugins={[timeGridPlugin]}
                                        initialView={view}
                                        view={view}
                                        weekends={false}
                                        slotMinTime="06:00:00"
                                        slotMaxTime="21:00:00"
                                        locale="fr"
                                        events={events}
                                        headerToolbar={{
                                            left: 'prev,next today',
                                            center: 'title',
                                            right: 'timeGridWeek,timeGridDay'
                                        }}
                                        height="auto"
                                        eventContent={(info) => {
                                            const start = formatTime(info.event.start);
                                            const end = formatTime(info.event.end);

                                            return (
                                                <div>
                                                    <b>{info.event.title}</b>
                                                    <div className="event-time">{start} - {end}</div>
                                                </div>
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        ) : (
                            <span className="loader">Chargement...</span>
                        )
                    ) : (
                        <div style={{ width: '100%', gap: '2em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h4>Insérer un lien ICS dans les paramètres de votre profil</h4>
                            <a href="" className="test" onClick={() => navigate("/tutoedt")}>Besoin d'aide ?</a>
                            <Button style={{width:"9em", padding:"1em"}} onClick={() => (window.location.href = "/account")}>Compte</Button>
                        </div>
                    )
                ) : (
                    <div className="temp" style={{ width: '100%' }}>
                        <Box className="scheduleNotConnect" style={{padding: "2rem", textAlign: "center"}}>
                            <Text>Vous devez être connecté pour accéder à cette page.</Text>
                            <Button
                                onClick={() => navigate("/auth/login")}
                                style={{marginTop: "1rem"}}
                            >
                                Se connecter
                            </Button>
                        </Box>
                    </div>
                )}
            </div>
        </>
    );
}

export default Schedule;
