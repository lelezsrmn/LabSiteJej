import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get('http://localhost:4000/user', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            }
        };
        fetchUser();
    }, []);

    if (!user) return <div>Loading...</div>;
    if (user.role !== 'admin') return <div>Access Denied</div>;

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, {user.username}</p>
            {/* Vos composants d'administration ici */}
        </div>
    );
};

export default AdminDashboard;
