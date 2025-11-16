import Header from "../components/Header.jsx";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid';
import {useEffect, useState} from "react";
import polyrideDAO from "../dao/PolyrideDAO.js";
import {useNavigate} from "react-router-dom";
import "./Schedule.css";



function Schedule() {
    const [user, setUser] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const navigate = useNavigate();
    const [view, setView] = useState(window.innerWidth < 768 ? 'timeGridDay' : 'timeGridWeek');


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setView('timeGridDay');
            } else {
                setView('timeGridWeek');
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        polyrideDAO.getProfile()
            .then(data => {
                setUser(data);
            })
            .catch(err => {
            });

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
                .catch(err => {
                    console.log(err);
                })
        }
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
                            <div className="temp" style={{width:'100%'}}>
                                <h2 className="title_schedule">Emploi du temps</h2>
                                <div className="calendar">
                                    <FullCalendar
                                        plugins={[timeGridPlugin]}
                                        view={view}
                                        weekends={false}
                                        initialView="timeGridWeek"
                                        slotMinTime="06:00:00"
                                        slotMaxTime="21:00:00"
                                        locale="fr"
                                        events={events}
                                        headerToolbar={
                                            view === 'timeGridWeek' ? {
                                                left: 'prev,next today',
                                                center: 'title',
                                                right: 'timeGridWeek,timeGridDay'
                                            } : {
                                                left: 'prev,next',
                                                center: 'title',
                                                right: 'timeGridDay'
                                            }
                                        }
                                        height="auto"
                                        eventContent={(info) => {
                                            const start = formatTime(info.event.start);
                                            const end = formatTime(info.event.end);
                                            const loc = info.event.extendedProps.location || "—";

                                            return (
                                                <div>
                                                    <b>{info.event.title}</b>
                                                    <div className="event-time">
                                                        {start} - {end}
                                                    </div>
                                                </div>
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        ) : (
                            <span>Chargement...</span>
                        )
                    ) : (
                        <div style={{width:'100%'}}>
                            <h2 className="title_schedule">Emploi du temps</h2>
                            <input className="lien_ICS" placeholder="Insérer un lien ICS..."/>
                        </div>
                    )}
            </div>
        </>
    )
}

export default Schedule;