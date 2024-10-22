
const FruitProduction = require('../models/FruitProduction');
const User = require('../models/User');
const Fruits = require('../models/Fruit');
const Causes = require("../models/FruitProductionCauses");
const DeviationTypes = require("../models/FruitProductionDeviationTypes");

const index = async (req, res) => {
    try {
        const fruitProductions = await FruitProduction.findAll({
            where: { user_id: req.user.id },
            order: [['created_at', 'DESC']]
            //include: [{ model: User, as: 'user' }]
        });

        if (!fruitProductions) {
            return res.status(404).json({ message: 'No Record found' });
        }
        res.json({ data: fruitProductions, status: '1' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data ', error });
    }
};

const getFruits = async (req, res) => {
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

const getCauses = async (req, res) => {
    try {
        const causes = await Causes.findAll();

        if (!causes) {
            return res.status(404).json({ message: 'No Record found' });
        }
        res.json({ data: causes, status: '1' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data ', error });
    }
};

const getDeviationTypes = async (req, res) => {
    try {
        const types = await DeviationTypes.findAll();

        if (!types) {
            return res.status(404).json({ message: 'No Record found' });
        }
        res.json({ data: types, status: '1' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data ', error });
    }
};

const store = async (req, res) => {
    try {
        const data = req.body.map(item => ({
            ...item,
            user_id: req.user.id,
            updated_at: new Date() // Set the current timestamp
        }));

        // Insert data using Sequelize's bulkCreate method
        await FruitProduction.bulkCreate(data, {
            validate: true, // Validate the data before inserting
        });

        res.status(201).json({ message: 'Data saved successfully!', status: '1' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data ', error });
    }
}

const update = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: 'Error fetching data ', error });
    }
}

const destroy = async (req, res) => {
    try {
        const deleteRow = await FruitProduction.destroy({
            where: {
                id: req.params.id,
                user_id: req.user.id,
            },
        });

        if (deleteRow === 0) {
            return res.status(404).json({ message: 'Item not found or not authorized.', status: '0' });
        } else {
            res.status(201).json({ message: "Data deleted successfully", status: '1' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting data ', error });
    }
}
module.exports = { index, getFruits, getCauses, getDeviationTypes, store, update, destroy };
