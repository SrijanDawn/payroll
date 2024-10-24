const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase');

// Define a schema and model
const UserSchema = new mongoose.Schema({
    name: String,
    employeeID: String,
    email: String,
    phone: Number,
    designation: String,
    salary: Number,
    leaves: { type: Number, default: 0 },
    monthlySalary: { type: Number, default: 0 },
    taxDeductions: { type: Number, default: 0 },
    numberOfLeaves: { type: Number, default: 0 },
    bonus: { type: Number, default: 0 },
    salaryPerDay: { type: Number, default: 0 },
    netAmount: { type: Number, default: 0 },
});

const User = mongoose.model('User', UserSchema);

// POST endpoint to save user data
app.post('/api/users', async (req, res) => {
    const { name, employeeID, email, phone, designation, salary } = req.body;
    const newUser = new User({ name, employeeID, email, phone, designation, salary });
    await newUser.save();
    res.status(201).json(newUser);
});

// Add this route to fetch users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();  // Fetch all users from the MongoDB collection
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Add this PUT endpoint to update user details
app.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, employeeID, email, phone, designation, salary } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { name, employeeID, email, phone, designation, salary }, { new: true });
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

// Route to increment leaves for a user
app.put('/api/users/:id/leaves', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.leaves += 1; // Increment the leaves by 1
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating leaves', error });
    }
});

// Reset leaves to 0
app.put('/api/users/:id/reset-leaves', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, { leaves: 0 }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error resetting leaves', error });
    }
});

// Add a POST route to store financial data
app.post('/api/users/:id/financial-details', async (req, res) => {
    try {
        const { monthlySalary, taxDeductions, numberOfLeaves, bonus } = req.body;
        const { id } = req.params;

        // Calculate salary per day and net amount
        const salaryPerDay = monthlySalary / 30;  // Assume 30 days in a month
        const netAmount = monthlySalary - taxDeductions - (salaryPerDay * numberOfLeaves) + bonus;

        const updatedUser = await User.findByIdAndUpdate(id, {
            monthlySalary,
            taxDeductions,
            numberOfLeaves,
            bonus,
            salaryPerDay,
            netAmount,
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating financial details', error });
    }
});

// Add a GET route to fetch the financial details
app.get('/api/users/:id/financial-details', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            monthlySalary: user.monthlySalary,
            taxDeductions: user.taxDeductions,
            numberOfLeaves: user.numberOfLeaves,
            bonus: user.bonus,
            salaryPerDay: user.salaryPerDay,
            netAmount: user.netAmount,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching financial details', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
