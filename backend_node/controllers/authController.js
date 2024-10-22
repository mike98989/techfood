const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Sign Up Controller
const signup = async (req, res) => {
    const { fullname, email, password } = req.body;
    //console.log('Request Bodyss:', username);
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: fullname, email, password: hashedPassword, created_at: new Date(),
            updated_at: new Date()
        });
        res.status(201).json({ message: 'User data created' });
    } catch (error) {
        //const errorMessage = JSON.parse(error);
        res.status(500).json({ message: error });
    }
};

// Sign In Controller
const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '3h',
        });

        res.status(200).json({ user: user, token: token, status: '1' });
    } catch (error) {
        res.status(500).json({ message: 'Error signing in', error });
    }
};
module.exports = { signup, signin };
