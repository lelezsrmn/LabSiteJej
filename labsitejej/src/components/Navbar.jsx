import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LogoSdv from '../assets/LogoSdvBase.svg'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 w-full">
                    <div className="flex items-center">
                        <Link className="flex-1 object-left"
                        to={"/"}>
                            <img src={LogoSdv} alt="Logo SDV" className="h-14 w-20"/>
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a href="#"
                                   className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    Accueil
                                </a>

                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        type="button"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        onClick={toggleDropdown}>
                                            Menu
                                    </button>
                                    {isOpen && (
                                        <div
                                            className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                            <div className="py-1" role="menu" aria-orientation="vertical"
                                                 aria-labelledby="options-menu">
                                                <Link
                                                    to="/Schedule"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                >
                                                    Schedule
                                                </Link>
                                                <Link
                                                    to="/CallProjet"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                >
                                                    Appel a projet
                                                </Link>
                                                <a href="#"
                                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                   role="menuitem">
                                                    Option 3
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar