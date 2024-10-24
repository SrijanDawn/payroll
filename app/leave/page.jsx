"use client"
import React, { useEffect, useState } from 'react';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    // Fetch users data from the backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users');
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
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}/leaves`, {
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
            const response = await fetch(`http://localhost:5000/api/users/${userId}/reset-leaves`, {
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
        <div>
            <h2>Users List</h2>
            {users.length > 0 ? (
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Leaves Taken</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.leaves}</td>
                                <td>
                                    <button onClick={() => incrementLeaves(user._id)}>Add Leave</button>
                                    <button onClick={() => handleResetLeaves(user._id)}>Reset Leaves</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found</p>
            )}
        </div>
    );
};

export default UsersList;