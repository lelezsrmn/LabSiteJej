import React, { useState } from 'react';
import axios from 'axios';

const AddPrinterForm = () => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('libre');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name,
            status,
        };

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:4000/printers', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Printer added successfully:', response.data);
            setName('');
            setStatus('libre');
        } catch (error) {
            console.error('Error adding printer:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
            <div className="mb-4">
                <label className="block text-gray-700">Nom de l'imprimante</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Statut de l'imprimante</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    required
                >
                    <option value="libre">Libre</option>
                    <option value="en utilisation">En utilisation</option>
                    <option value="cassée">Cassée</option>
                </select>
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded mt-4"
            >
                Ajouter
            </button>
        </form>
    );
};

export default AddPrinterForm;
