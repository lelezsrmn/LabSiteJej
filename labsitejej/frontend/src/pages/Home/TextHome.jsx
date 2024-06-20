import React from 'react';

function TextHome() {
    return (
        <div className="text-white text-left font-mono text-xl mt-12 space-y-6 p-8 bg-blue-900 rounded-lg shadow-lg">
            <h4>
                Bienvenue sur le site du <a className="font-bold">Laboratoire de Création et d'Innovation
                de SupDeVinci !</a>Notre laboratoire est un espace dédié à l'exploration, à l'invention et à
                l'apprentissage pratique. Équipé de technologies de pointe telles que des imprimantes 3D, des serveurs, et une variété
                d'outils, notre laboratoire offre aux étudiants la possibilité de transformer leurs idées en
                projets concrets.
            </h4>

            <h1 className="text-2xl mb-2 mt-5 font-semibold">Qu'est-ce que le Laboratoire de Création et d'Innovation?</h1>
            <p>Le laboratoire est un espace collaboratif où les étudiants peuvent se réunir pour concevoir,
                expérimenter, construire et innover. Que vous soyez intéressé par la robotique, la fabrication
                numérique, le prototypage ou tout autre domaine créatif, notre laboratoire est conçu pour vous
                offrir les ressources nécessaires pour réussir.
            </p>

            <h1 className="text-2xl mb-2 mt-5 font-semibold">Fonctionnalités du Site</h1>
            <ul className="list-disc pl-5 space-y-2">
                <li><a className="font-bold">Réserver des Équipements</a> : Connectez-vous pour réserver des machines
                    spécifiques, comme les imprimantes 3D, pour des créneaux horaires définis. Cela garantit que vous avez accès
                    aux outils dont vous avez besoin, quand vous en avez besoin.
                </li>
                <li><a className="font-bold">Appel à Projets</a> : Consultez notre page dédiée aux appels à projets pour
                    découvrir des opportunités de collaboration et des défis à relever. Nous encourageons tous les étudiants à
                    proposer et à participer à des projets personnels ou collectifs.
                </li>
                <li><a className="font-bold">Calendrier des Activités</a> : Restez informé des ateliers, des formations
                    et des événements spéciaux organisés dans le laboratoire.
                </li>
                <li><a className="font-bold">Ressources et Tutoriels</a> : Accédez à une bibliothèque de ressources et
                    de tutoriels pour vous aider à maîtriser les outils et les technologies disponibles.
                </li>
            </ul>

            <h1 className="text-2xl mb-2 mt-5 font-semibold">Pourquoi Utiliser le Laboratoire?</h1>
            <p>
                Le laboratoire n'est pas seulement un espace pour réaliser des projets scolaires; c'est un
                lieu où vous pouvez laisser libre cours à votre créativité et développer des compétences
                essentielles pour le 21ème siècle. En travaillant sur des projets pratiques, vous apprendrez non
                seulement des compétences techniques, mais aussi des compétences en résolution de problèmes, en
                collaboration et en gestion de projet. Nous sommes impatients de voir les incroyables projets
                que vous allez créer et de vous soutenir dans votre parcours d'innovation. Rejoignez-nous et
                commencez à transformer vos idées en réalité dès aujourd'hui! Pour toute question ou
                assistance, n'hésitez pas à nous contacter via la page de contact du site. Bonnes créations!
            </p>
        </div>
    );
}

export default TextHome;
