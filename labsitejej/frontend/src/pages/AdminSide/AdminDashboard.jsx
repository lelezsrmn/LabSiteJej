import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddPrinterForm from './AddPrinterForm';
import AddUserForm from './AddUserForm';
import UserTable from './UserTable';
import Navbar from '../../components/Navbar'

const AdminDashboard = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Fetched user data:', response.data);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            <Navbar/>
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Tableau de bord admin</h1>
                <div className="mb-8">
                    <AddPrinterForm/>
                </div>
                <div>
                    <AddUserForm/>
                </div>
                <div>
                    <UserTable userData={userData}/>
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;
