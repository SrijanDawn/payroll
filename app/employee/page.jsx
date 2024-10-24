// src/Form.js
"use client"
import React, { useState } from 'react';

const Form = () => {
    const [name, setName] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [designation, setDesignation] = useState('');
    const [salary, setSalary] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, employeeID, email, phone, designation, salary };

        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User saved:', data);
                // Reset form fields
                setName('');
                setEmployeeID('');
                setEmail('');
                setPhone('');
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>EmployeeID:</label>
                <input
                    type="text"
                    value={employeeID}
                    onChange={(e) => setEmployeeID(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Phone Number:</label>
                <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Designation:</label>
                <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Salary:</label>
                <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;