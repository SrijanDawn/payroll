"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import bg from "../components/BackGround.jpg"

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '', employeeID: '', email: '', phone: 0, gender: '', designation: '', monthlySalary: 0 });

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

    // Handle edit button click
    const handleEditClick = (user) => {
        setEditingUserId(user._id);
        setEditFormData({ name: user.name, employeeID: user.employeeID, email: user.email, phone: user.phone, gender: user.gender, designation: user.designation, monthlySalary: user.monthlySalary });
    };

    // Handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    // Handle form submission for saving edits
    const handleEditSubmit = async (e) => {
        try {
            const response = await fetch(`https://payroll-j13d.onrender.com/api/users/${editingUserId}`, {
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

    // Handle delete button click
    const handleDeleteClick = async (userId) => {
        try {
            const response = await fetch(`https://payroll-j13d.onrender.com/api/users/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setUsers(users.filter((user) => user._id !== userId));
            } else {
                console.error('Error deleting user:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <><Navbar />
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6" style={{ backgroundImage: `url(${bg.src})`, backgroundSize: 'cover' }}>
            <h2 className="text-5xl font-bold mb-8">Employee Details</h2>
            {users.length > 0 ? (
                <table className="w-full max-w-5xl bg-white rounded-t-lg shadow-md overflow-hidden">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="px-4 py-2 border-2 border-black">Name</th>
                            <th className="px-4 py-2 border-2 border-black">Employee ID</th>
                            <th className="px-4 py-2 border-2 border-black">Email</th>
                            <th className="px-4 py-2 border-2 border-black">Phone Number</th>
                            <th className="px-4 py-2 border-2 border-black">Gender</th>
                            <th className="px-4 py-2 border-2 border-black">Designation</th>
                            <th className="px-4 py-2 border-2 border-black">Monthly Salary</th>
                            <th className="px-4 py-2 border-2 border-black">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b last:border-none">
                                <td className="px-4 py-2 text-center border-2 border-gray-500">
                                    {editingUserId === user._id ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={editFormData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    ) : (
                                        user.name
                                    )}
                                </td>
                                <td className="px-4 py-2 text-center border-2 border-gray-500">
                                    {editingUserId === user._id ? (
                                        <input
                                            type="text"
                                            name="employeeID"
                                            value={editFormData.employeeID}
                                            onChange={handleInputChange}
                                            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    ) : (
                                        user.employeeID
                                    )}
                                </td>
                                <td className="px-4 py-2 text-center border-2 border-gray-500">
                                    {editingUserId === user._id ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={editFormData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </td>
                                <td className="px-4 py-2 text-center border-2 border-gray-500">
                                    {editingUserId === user._id ? (
                                        <input
                                            type="number"
                                            name="phone"
                                            value={editFormData.phone}
                                            onChange={handleInputChange}
                                            className="w-full mx-4 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    ) : (
                                        user.phone
                                    )}
                                </td>
                                <td className="px-4 py-2 text-center border-2 border-gray-500">
                                    {editingUserId === user._id ? (
                                        <input
                                            type="text"
                                            name="gender"
                                            value={editFormData.gender}
                                            onChange={handleInputChange}
                                            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    ) : (
                                        user.gender
                                    )}
                                </td>
                                <td className="px-4 py-2 text-center border-2 border-gray-500">
                                    {editingUserId === user._id ? (
                                        <input
                                            type="text"
                                            name="designation"
                                            value={editFormData.designation}
                                            onChange={handleInputChange}
                                            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    ) : (
                                        user.designation
                                    )}
                                </td>
                                <td className="px-4 py-2 text-center border-2 border-gray-500">
                                    {editingUserId === user._id ? (
                                        <input
                                            type="number"
                                            name="monthlySalary"
                                            value={editFormData.monthlySalary}
                                            onChange={handleInputChange}
                                            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    ) : (
                                        user.monthlySalary
                                    )}
                                </td>
                                <td className="px-4 py-2 text-center space-x-2 border-2 border-gray-500 w-full">
                                    {editingUserId === user._id ? (
                                        <button
                                            onClick={() => {
                                                if (confirm("Save Employee Details in Database?")) handleEditSubmit();
                                            }}
                                            className="bg-green-500 text-white mx-10 px-3 py-1 rounded hover:bg-green-600"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleEditClick(user)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm("Delete Employee from Database?")) handleDeleteClick(user._id);
                                                }}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600">No users found</p>
            )}
        </div></>
    );
};

export default UsersList;