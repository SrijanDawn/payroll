"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import bg from "../components/BackGround.jpg"

const UsersList = () => {
    const [users, setUsers] = useState([]);

    // Fetch users data from the backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://payroll-j13d.onrender.com/api/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    // Handle incrementing leaves
    const incrementLeaves = async (userId) => {
        alert("Leave is Added")
        try {
            const response = await fetch(`https://payroll-j13d.onrender.com/api/users/${userId}/leaves`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const updatedUser = await response.json();
                // Update the local state to reflect the new leave count
                setUsers(users.map((user) => (user._id === userId ? updatedUser : user)));
            } else {
                console.error('Error updating leaves:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Handle resetting leaves
    const handleResetLeaves = async (userId) => {
        try {
            const response = await fetch(`https://payroll-j13d.onrender.com/api/users/${userId}/reset-leaves`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUsers(users.map((user) => (user._id === userId ? updatedUser : user)));
            } else {
                console.error('Error resetting leaves:', response.statusText);
            }
        } catch (error) {
            console.error('Error resetting leaves:', error);
        }
    };

    return (
        <><Navbar />
        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10 px-4" style={{ backgroundImage: `url(${bg.src})`, backgroundSize: 'cover' }}>
            <h2 className="text-5xl font-semibold mb-8">Leave Request</h2>
            {users.length > 0 ? (
                <table className="w-fit m-auto bg-white shadow-md rounded-t-lg overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-4 border-2 border-black">Name</th>
                            <th className="py-3 px-4 border-2 border-black">Employee ID</th>
                            <th className="py-3 px-4 border-2 border-black">Email</th>
                            <th className="py-3 px-4 border-2 border-black">Leaves Taken</th>
                            <th className="py-3 px-4 border-2 border-black">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-4 text-center border-2 border-gray-500">{user.name}</td>
                                <td className="py-3 px-4 text-center border-2 border-gray-500">{user.employeeID}</td>
                                <td className="py-3 px-4 text-center border-2 border-gray-500">{user.email}</td>
                                <td className="py-3 px-4 text-center border-2 border-gray-500">{user.leaves}</td>
                                <td className="py-3 px-4 text-center border-2 border-gray-500">
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600"
                                        onClick={() => incrementLeaves(user._id)}
                                    >
                                        Add Leave
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                        onClick={() => {
                                            if (confirm("Reset Number of Leaves ?"))
                                                handleResetLeaves(user._id)}}
                                    >
                                        Reset Leaves
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600 mt-10">No users found</p>
            )}
        </div></>
    );
};

export default UsersList;