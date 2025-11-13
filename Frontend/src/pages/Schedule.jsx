import Header from "../components/Header.jsx";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid';
import {useEffect, useState} from "react";
import polyrideDAO from "../dao/PolyrideDAO.js";
import {useNavigate} from "react-router-dom";



function Schedule() {
    const [user, setUser] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        polyrideDAO.getProfile()
            .then(data => {
                setUser(data);
            })
            .catch(err => {
                navigate("/auth/login");
            });

        const today = new Date().toISOString().split('T')[0];

        polyrideDAO.getAgenda(today)
            .then(data => {
                setSchedule(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const events = schedule
        ? Object.entries(schedule).flatMap(([day, eventsForDay]) =>
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


    return (
        <>
            <Header />

            <div className="schedule">
                    {user && user.calendarLink ? (
                        schedule ? (
                                <div className="calendar">
                                    <FullCalendar
                                        plugins={[timeGridPlugin]}
                                        initialView="timeGridWeek"
                                        weekends={false}
                                        height="70vh"
                                        slotMinTime="06:00:00"
                                        slotMaxTime="21:00:00"
                                        locale="fr"
                                        events={events}
                                        eventContent={(info) => {
                                            const start = formatTime(info.event.start);
                                            const end = formatTime(info.event.end);
                                            const loc = info.event.extendedProps.location || "—";

                                            return (
                                                <div>
                                                    <b>{info.event.title}</b>
                                                    <div style={{ fontSize: "0.8em" }}>
                                                        {start} - {end}
                                                    </div>
                                                </div>
                                            );
                                        }}
                                    />
                                </div>
                        ) : (
                            <span>Chargement...</span>
                        )
                    ) : (
                        <input className="lien_ICS" placeholder="Insérer un lien ICS..."/>
                    )}
            </div>
        </>
    )
}

export default Schedule;