"use client"
import React, { useEffect, useState } from 'react';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '', employeeID: '', email: '', phone: 0, designation: '', salary: 0 });

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

    // Handle edit button click
    const handleEditClick = (user) => {
        setEditingUserId(user._id);
        setEditFormData({ name: user.name, employeeID: user.employeeID, email: user.email, phone: user.phone, designation: user.designation, salary: user.salary });
    };

    // Handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    // Handle form submission for saving edits
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/users/${editingUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editFormData),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUsers(users.map((user) => (user._id === editingUserId ? updatedUser : user)));
                setEditingUserId(null);  // Exit edit mode after saving
            } else {
                console.error('Error updating user:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
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
                            <th>Employee ID</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Designation</th>
                            <th>Salary</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    {editingUserId === user._id ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={editFormData.name}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        user.name
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user._id ? (
                                        <input
                                            type="text"
                                            name="employeeID"
                                            value={editFormData.employeeID}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        user.employeeID
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user._id ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={editFormData.email}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user._id ? (
                                        <input
                                            type="number"
                                            name="phone"
                                            value={editFormData.phone}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        user.phone
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user._id ? (
                                        <input
                                            type="text"
                                            name="designation"
                                            value={editFormData.designation}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        user.designation
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user._id ? (
                                        <input
                                            type="number"
                                            name="salary"
                                            value={editFormData.salary}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        user.salary
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user._id ? (
                                        <button onClick={handleEditSubmit}>Save</button>
                                    ) : (
                                        <button onClick={() => handleEditClick(user)}>
                                            Edit
                                        </button>
                                    )}
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
