"use client"
import React, { useState, useEffect } from 'react';

const AllEmployeesFinancialDetails = () => {
    const [employees, setEmployees] = useState([]);

    // Fetch all employees' financial data when the component mounts
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users');
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    // Handle form input change for a specific employee
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedEmployees = [...employees];
        updatedEmployees[index] = { ...updatedEmployees[index], [name]: value };
        setEmployees(updatedEmployees);
    };

    // Handle form submission to update employee's financial data
    const handleSubmit = async (e, employee) => {
        e.preventDefault();

        // Calculate salary per day and net amount
        const salaryPerDay = employee.monthlySalary / 30;
        const netAmount = employee.monthlySalary - employee.taxDeductions - (salaryPerDay * employee.numberOfLeaves) + employee.bonus;

        try {
            const response = await fetch(`http://localhost:5000/api/users/${employee._id}/financial-details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    monthlySalary: employee.monthlySalary,
                    taxDeductions: employee.taxDeductions,
                    numberOfLeaves: employee.numberOfLeaves,
                    bonus: employee.bonus,
                    salaryPerDay,
                    netAmount,
                }),
            });

            if (response.ok) {
                const updatedEmployee = await response.json();
                setEmployees(employees.map(emp => emp._id === employee._id ? updatedEmployee : emp));
            } else {
                console.error('Error updating employee financial details:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating employee financial details:', error);
        }
    };

    return (
        <div className='bg-yellow-200'>
            <h2>All Employees Financial Details</h2>
            {employees.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Monthly Salary</th>
                            <th>Tax Deductions</th>
                            <th>Number of Leaves</th>
                            <th>Bonus</th>
                            <th>Salary Per Day</th>
                            <th>Net Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={employee._id}>
                                <td>{employee.name}</td>
                                <td>
                                    <input
                                        type="number"
                                        name="monthlySalary"
                                        value={employee.monthlySalary || ''}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="taxDeductions"
                                        value={employee.taxDeductions || ''}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="numberOfLeaves"
                                        value={employee.numberOfLeaves || ''}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="bonus"
                                        value={employee.bonus || ''}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                </td>
                                <td>{employee.salaryPerDay}</td>
                                <td>{employee.netAmount}</td>
                                <td>
                                    <button onClick={(e) => handleSubmit(e, employee)}>
                                        Submit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No employees found.</p>
            )}
        </div>
    );
};

export default AllEmployeesFinancialDetails;
