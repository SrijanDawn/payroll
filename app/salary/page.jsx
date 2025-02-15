"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import bg from "../components/BackGround.jpg"

const AllEmployeesFinancialDetails = () => {
    const [employees, setEmployees] = useState([]);
    const [editingEmployeeId, setEditingEmployeeId] = useState(null); // Track which employee is being edited
    const [editFormData, setEditFormData] = useState({
        monthlySalary: 0,
        taxDeductions: 0,
        bonus: 0,
        numberOfLeaves: 0,
    });

    // Fetch all employees' financial data when the component mounts
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('https://payroll-j13d.onrender.com/api/users');
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    // Handle edit button click
    const handleEditClick = (employee) => {
        setEditingEmployeeId(employee._id);
        setEditFormData({
            monthlySalary: employee.monthlySalary,
            taxDeductions: employee.taxDeductions,
            bonus: employee.bonus,
            numberOfLeaves: employee.numberOfLeaves,
        });
    };

    // Handle form input change for editing data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    // Handle form submission to update employee's financial data
    const handleSubmit = async (employee) => {
        // Confirm before updating
        if (!window.confirm("Are you sure you want to save these changes?")) return;

        // Calculate salary per day and net amount
        const salaryPerDay = + (editFormData.monthlySalary / 30).toFixed(2);
        const netAmount = editFormData.monthlySalary - editFormData.taxDeductions + editFormData.bonus - (salaryPerDay * editFormData.numberOfLeaves);

        try {
            const response = await fetch(`https://payroll-j13d.onrender.com/api/users/${employee._id}/financial-details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...editFormData,
                    salaryPerDay,
                    netAmount,
                }),
            });

            if (response.ok) {
                const updatedEmployee = await response.json();
                setEmployees(employees.map((emp) => (emp._id === employee._id ? updatedEmployee : emp)));
                setEditingEmployeeId(null); // Exit edit mode
            } else {
                console.error('Error updating employee financial details:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating employee financial details:', error);
        }
    };

    return (
        <><Navbar />
        <div className="min-h-screen flex flex-col items-center py-12 px-4" style={{ backgroundImage: `url(${bg.src})`, backgroundSize: 'cover' }}>
            <h2 className="text-5xl font-semibold mb-8">All Employees Financial Details</h2>
            {employees.length > 0 ? (
                <table className="w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-4 border-2 border-black">Name</th>
                            <th className="py-3 px-4 border-2 border-black">Monthly Salary</th>
                            <th className="py-3 px-4 border-2 border-black">Tax Deductions</th>
                            <th className="py-3 px-4 border-2 border-black">Bonus</th>
                            <th className="py-3 px-4 border-2 border-black">Number of Leaves</th>
                            <th className="py-3 px-4 border-2 border-black">Salary Per Day</th>
                            <th className="py-3 px-4 border-2 border-black">Net Amount</th>
                            <th className="py-3 px-4 border-2 border-black">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee._id} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-4 text-center border-2 border-gray-500">{employee.name}</td>
                                <td className="py-3 px-4 text-center border-2 border-gray-500">
                                    {editingEmployeeId === employee._id ? (
                                        <input
                                            type="number"
                                            name="monthlySalary"
                                            value={editFormData.monthlySalary}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded-md p-2 w-full"
                                        />
                                    ) : (
                                        employee.monthlySalary
                                    )}
                                </td>
                                <td className="py-3 px-4 text-center border-2 border-gray-500">
                                    {editingEmployeeId === employee._id ? (
                                        <input
                                            type="number"
                                            name="taxDeductions"
                                            value={editFormData.taxDeductions}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded-md p-2 w-full"
                                        />
                                    ) : (
                                        employee.taxDeductions
                                    )}
                                </td>
                                <td className="py-3 px-4 text-center border-2 border-gray-500">
                                    {editingEmployeeId === employee._id ? (
                                        <input
                                            type="number"
                                            name="bonus"
                                            value={editFormData.bonus}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded-md p-2 w-full"
                                        />
                                    ) : (
                                        employee.bonus
                                    )}
                                </td>
                                <td className="py-3 px-4 text-center border-2 border-gray-500">
                                    {editingEmployeeId === employee._id ? (
                                        <input
                                            type="number"
                                            name="numberOfLeaves"
                                            value={editFormData.numberOfLeaves}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded-md p-2 w-full"
                                        />
                                    ) : (
                                        employee.numberOfLeaves
                                    )}
                                </td>
                                <td className="py-3 px-4 text-center border-2 border-gray-500">{employee.salaryPerDay || '-'}</td>
                                <td className="py-3 px-4 text-center border-2 border-gray-500">{employee.netAmount || '-'}</td>
                                <td className="py-3 px-4 text-center border-2 border-gray-500">
                                    {editingEmployeeId === employee._id ? (
                                        <button
                                            onClick={() => handleSubmit(employee)}
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEditClick(employee)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600 mt-10">No employees found.</p>
            )}
        </div></>
    );
};

export default AllEmployeesFinancialDetails;