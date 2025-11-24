import Header from "../components/Header.jsx";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from "react";
import polyrideDAO from "../dao/PolyrideDAO.js";
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

        if (cachedSchedule && cachedTimestamp && (now - cachedTimestamp < oneDay)) {
            setSchedule(JSON.parse(cachedSchedule));
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
        console.log(user);
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
                {user ? (
                    user.calendarLink ? (
                        schedule ? (
                            <div className="temp" style={{ width: '100%' }}>
                                <h2 className="title_schedule">Emploi du temps</h2>
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
                        <div style={{ width: '100%', gap: '2em' }}>
                            <h2 className="title_schedule">Emploi du temps</h2>
                            <input className="lien_ICS" placeholder="Insérer un lien ICS..." value={icsLink} onChange={(e) => setIcsLink(e.target.value)}/>
                            <a href="" className="test" onClick={() => navigate("/tutoedt")}>Besoin d'aide ?</a>
                            <Button style={{width:"9em", padding:"1em"}} onClick={handleClick}>Valider</Button>
                        </div>
                    )
                ) : (
                    <div className="temp" style={{ width: '100%' }}>
                        <h2 className="title_schedule">Emploi du temps</h2>
                        <Box className="scheduleNotConnect" style={{padding: "2rem", textAlign: "center"}}>
                            <Text>Vous devez être connecté pour accéder à cette page.</Text>
                            <Button
                                onClick={() => (window.location.href = "/auth/login")}
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
