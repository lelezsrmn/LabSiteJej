import React, { useState } from 'react';

import Navbar from '../components/Navbar.jsx';
import Footer from "../components/Footer";
import FormSchedule from "../components/FormSchedule.jsx";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"


function Schedule() {
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedTimeObj, setSelectedTimeObj] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);

    const handleDateClick = (arg) => {
        const dateStr = arg.dateStr;
        setSelectedTime(dateStr);
        setSelectedTimeObj(new Date(dateStr));
        setShowSidebar(true);
    }

    const handleEventClick = (info) => {
        const dateStr = info.dateStr;
        setSelectedTime(dateStr);
        setSelectedTimeObj(new Date(dateStr));
        setShowSidebar(true);
        console.log(info.dateStr);
    };



    return (
        <div className="min-h-screen flex flex-col bg-blue-950">
            <Navbar/>
            <main className="flex-grow flex">
                <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 flex-1 bg-yellow-500 rounded-md">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="timeGridWeek"
                        allDaySlot={false}
                        slotDuration="01:00:00"
                        slotLabelInterval={{hours: 1}}
                        slotMinTime="07:00:00"
                        slotMaxTime="20:00:00"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'timeGridWeek,timeGridDay',
                        }}
                        height="80vh"
                        className="border border-yellow-800"
                        slotLabelClassNames="text-yellow-800"
                        dayHeaderClassNames="bg-yellow-600 text-white"
                        dayCellClassNames="bg-yellow-600 text-white"
                        eventClick={handleEventClick}
                        dateClick={handleDateClick}
                        headerClassNames="bg-blue-500 text-white" // Ajout de la classe pour le header
                        dayHeaderContent={(arg) => (
                            <div className="custom-day-header">
                                {arg.text}
                            </div>
                        )}
                    />
                </div>
                {showSidebar && (
                    <div className="bg-yellow-600 rounded-2xl p-8 w-1/2 min-w-[200px] max-w-[400px]">
                        <FormSchedule dateSelected={selectedTimeObj}/>
                    </div>
                )}
            </main>
            <Footer/>
        </div>
    );
}

export default Schedule;
