import React from 'react';

import Navbar from '../../components/Navbar.jsx';
import Footer from "../../components/Footer";

import ContentForum from "./ContentForum.jsx"

function CallProjet() {
    return (
        <div className={"flex flex-col min-h-screen"}>
            <Navbar />
            <main className={"flex-grow bg-blue-950"}>
                <div className={"p-4"} id={"titleCallProjet"}>
                    <p className={"text-yellow-100 text-center text-4xl font-mono font-extrabold md:text-left"}>
                        Appel a projet</p>
                </div>
                <div className={"md:w-1/2 w-full mx-auto"} id={"divForumContentBox"}>
                    <ContentForum />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default CallProjet