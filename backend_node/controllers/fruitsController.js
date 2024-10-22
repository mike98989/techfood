
const Fruits = require('../models/Fruit');

// Fruit Controller
const index = async (req, res) => {
    try {
        const fruits = await Fruits.findAll();
        if (!fruits) {
            return res.status(404).json({ message: 'No Record found' });
        }
        res.json({ data: fruits, status: '1' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data ', error });
    }
};
module.exports = { index };
