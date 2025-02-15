// src/Form.js
"use client"
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import bg from "../components/BackGround.jpg"

const Form = () => {
    const [name, setName] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [designation, setDesignation] = useState('');
    const [monthlySalary, setSalary] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, employeeID, email, phone, gender, designation, monthlySalary };

        try {
            const response = await fetch('https://payroll-j13d.onrender.com/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert('Employee Added to the Database Successfully !');
                const data = await response.json();
                console.log('User saved:', data);
                // Reset form fields
                setName('');
                setEmployeeID('');
                setEmail('');
                setPhone('');
                setGender('');
                setDesignation('');
                setSalary('');
            } else {
                console.error('Error saving user:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <><Navbar />
        <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: `url(${bg.src})`, backgroundSize: 'cover' }}>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-2xl shadow-black w-full max-w-xl border-2 border-black my-10">
                <h2 className="text-4xl font-bold text-center mb-6"><u>Add Employee</u></h2>
                <div className="mb-4">
                    <label className="block text-gray-600 font-semibold mb-2">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 font-semibold mb-2">Employee ID:</label>
                    <input
                        type="text"
                        value={employeeID}
                        onChange={(e) => setEmployeeID(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 font-semibold mb-2">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 font-semibold mb-2">Phone Number:</label>
                    <input
                        type="number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 font-semibold mb-2">Gender:</label>
                    <input
                        type="text"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 font-semibold mb-2">Designation:</label>
                    <input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 font-semibold mb-2">Monthly Salary:</label>
                    <input
                        type="number"
                        value={monthlySalary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                    Submit
                </button>
            </form>
        </div></>
    );
};

export default Form;