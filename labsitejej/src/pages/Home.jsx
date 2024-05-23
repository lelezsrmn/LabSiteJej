import React from 'react';

import NavBar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

import DDDprinter from '../assets/DDDprinter.svg'
import {Link} from "react-router-dom";
import Logo_printer from "../assets/DDDprinter.svg";

function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-blue-950">
            <NavBar/>
            <main className={"flex-grow"}>
                <div className={"max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8"}>
                    <h1 className={"text-4xl font-bold text-yellow-100"}>Bienvenue sur notre site</h1>
                    <div className="mt-8 flex justify-center">
                        <Link to="/Schedule"
                              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-8 px-8 rounded-3xl flex items-center mx-4">
                            <img src={Logo_printer} alt="Schedule Logo" className="w-24 h-96"/>

                        </Link>
                        <Link to="/Schedule"
                              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-8 px-8 rounded-3xl flex items-center mx-4">
                            <img src={Logo_printer} alt="Schedule Logo" className="w-24 h-96"/>

                        </Link>
                        <Link to="/Schedule"
                              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-8 px-8 rounded-3xl flex items-center mx-4">
                            <img src={Logo_printer} alt="Schedule Logo" className="w-24 h-96"/>

                        </Link>
                        <Link to="/Schedule"
                              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-8 px-8 rounded-3xl flex items-center mx-4">
                            <img src={Logo_printer} alt="Schedule Logo" className="w-24 h-96"/>
                        </Link>


                    </div>
                    <div className={"text-white text-left font-mono text-lg mt-12 "}>
                        <h4 className="">
                            Bienvenue sur le site du <a className={"font-bold"}>Laboratoire de Création et d'Innovation
                            de SupDeVinci !</a>Notre
                            laboratoire est un espace dédié à l'exploration, à l'invention et à l'apprentissage
                            pratique.
                            Équipé de technologies de pointe telles que des imprimantes 3D, des serveurs, et une variété
                            d'outils, notre laboratoire offre aux étudiants la possibilité de transformer leurs idées en
                            projets concrets.
                        </h4>

                        <h1 className={"text-xl mb-2 mt-5"}> Qu'est-ce que le Laboratoire de Création et d'Innovation? </h1>

                        Le laboratoire est un espace collaboratif où les étudiants peuvent se réunir pour concevoir,
                        expérimenter, construire et innover. Que vous soyez intéressé par la robotique, la fabrication
                        numérique, le prototypage ou tout autre domaine créatif, notre laboratoire est conçu pour vous
                        offrir les ressources nécessaires pour réussir.

                        <h1 className={"text-xl mb-2 mt-5"}> Fonctionnalités du Site</h1>

                            Pour faciliter l'accès et l'utilisation de notre laboratoire, ce site vous permet de :
                        <ul className={"list-disc"}>
                            <li> <a className={"font-bold"}>Réserver des Équipements</a> : Connectez-vous pour réserver des machines spécifiques,
                                comme  les imprimantes 3D, pour des créneaux horaires définis. Cela garantit que vous avez accès
                                aux outils dont vous avez besoin, quand vous en avez besoin.</li>

                            <li> <a className={"font-bold"}>Appel à Projets</a> : Consultez notre page dédiée aux appels à projets pour découvrir des
                                opportunités de collaboration et des défis à relever. Nous encourageons tous les étudiants à
                                proposer et à participer à des projets personnels ou collectifs.</li>

                            <li><a className={"font-bold"}>Calendrier des Activités</a> : Restez informé des ateliers, des formations et des
                                événements spéciaux organisés dans le laboratoire.</li>

                            <li><a className={"font-bold"}>Ressources et Tutoriels</a> : Accédez à une bibliothèque de ressources et de tutoriels
                                pour vous aider à maîtriser les outils et les technologies disponibles.</li>
                        </ul>
                        <h1 className={"text-xl mb-2 mt-5"}>Pourquoi Utiliser le Laboratoire?</h1>
                        <p>
                            Le laboratoire n'est pas seulement un espace pour réaliser des projets scolaires; c'est un
                            lieu
                            où vous pouvez laisser libre cours à votre créativité et développer des compétences
                            essentielles
                            pour le 21ème siècle. En travaillant sur des projets pratiques, vous apprendrez non
                            seulement
                            des compétences techniques, mais aussi des compétences en résolution de problèmes, en
                            collaboration et en gestion de projet.Nous sommes impatients de voir les incroyables projets
                            que
                            vous allez créer et de vous soutenir dans votre parcours d'innovation. Rejoignez-nous et
                            commencez à transformer vos idées en réalité dès aujourd'hui! Pour toute question ou
                            assistance,
                            n'hésitez pas à nous contacter via la page de contact du site. Bonnes créations!
                        </p>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default Home;