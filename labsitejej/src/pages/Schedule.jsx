import React, {useRef, useState} from 'react';

import Navbar from '../components/Navbar.jsx';
import Footer from "../components/Footer";
import FormSchedule from "../components/FormSchedule.jsx";

import OutsideClickHandler from 'react-outside-click-handler';
import { Calendar, Badge } from "antd";

function Schedule() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const formRef = useRef(null);

    // Fonction pour gérer la sélection d'une date
    const onSelect = (value) => {
        setSelectedDate(value.toDate());
        setShowSidebar(true);
    };

    // Fonction pour formatter les éléments de la grille de calendrier
    const dateCellRender = (value) => {
        // Vous pouvez ajouter une logique ici pour afficher des badges ou des styles personnalisés pour certaines dates
        return <Badge status="success" text="Disponible" />;
    };

    const handleOutsideClick = () => {
        setShowSidebar(false);
    };

    return (
        <div className="flex flex-col bg-blue-950">
            <Navbar/>
            <main className="flex flex-grow mt-20">
                <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 flex-1 bg-yellow-500 rounded-3xl">
                    <Calendar
                        mode="week"
                        onSelect={onSelect}
                        cellRender={dateCellRender}
                    ></Calendar>
                </div>
                {showSidebar && (
                    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
                        {showSidebar && selectedDate && (
                            <div ref={formRef} className="bg-yellow-600 rounded-2xl p-8  h-full overflow-auto">
                                <FormSchedule dateSelected={selectedDate} />
                            </div>
                        )}
                    </OutsideClickHandler>
                )}
            </main>
            <Footer/>
        </div>
    );
}

export default Schedule;
