import Header from "../components/Header.jsx";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid';


function Schedule() {
    return (
        <>
            <Header />

            <div className="schedule">
                <div className="calendar">
                    <FullCalendar
                        plugins={[timeGridPlugin]}
                        initialView="timeGridWeek"
                        weekends={false}
                        height="70vh"
                        slotMinTime="06:00:00"
                        slotMaxTime="21:00:00"
                        locale="fr"
                    />
                </div>
            </div>
        </>
    )
}

export default Schedule;