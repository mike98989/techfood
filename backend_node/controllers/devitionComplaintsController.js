
const deviationComplaint = require('../models/DeviationComplaints');
const User = require('../models/User');
const DeviationComplaintDeviationTypes = require("../models/DeviationComplaintDeviationTypes");
const Dangers = require("../models/Dangers");
const RiskCategories = require("../models/riskcategories");
const TypeOfRemark = require("../models/typeofremark");
const products = require("../models/producttype");

const index = async (req, res) => {
    try {
        const devitionComplaints = await deviationComplaint.findAll({
            where: { user_id: req.user.id },
            order: [['created_at', 'DESC']]
            //include: [{ model: User, as: 'user' }]
        });

        if (!devitionComplaints) {
            return res.status(404).json({ message: 'No Record found' });
        }
        res.json({ data: devitionComplaints, status: '1' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data ', error });
    }
};

const getDeviationTypes = async (req, res) => {

    try {
        const types = await DeviationComplaintDeviationTypes.findAll();

        if (!types) {
            return res.status(404).json({ message: 'No Record found' });
        }
        res.json({ data: types, status: '1' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data ', error });
    }
};


const getHazardTypes = async (req, res) => {

    try {
        const types = await Dangers.findAll();

        if (!types) {
            return res.status(404).json({ message: 'No Record found' });
        }
        res.json({ data: types, status: '1' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data ', error });
    }
};

const getRiskCategories = async (req, res) => {

    try {
        const risk_categories = await RiskCategories.findAll();

        if (!risk_categories) {
            return res.status(404).json({ message: 'No Record found' });
        }
        res.json({ data: risk_categories, status: '1' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data ', error });
    }
};

const getDeviationCodes = async (req, res) => {
    try {
        const codes = await TypeOfRemark.findAll();
        if (!codes) {
            return res.status(404).json({ message: 'No Record found' });
        }
        res.json({ data: codes, status: '1' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data ', error });
    }
};

const getProductTypes = async (req, res) => {
    try {
        const types = await products.findAll();
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
        await deviationComplaint.bulkCreate(data, {
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
        const deleteRow = await deviationComplaint.destroy({
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
module.exports = { index, store, update, destroy, getDeviationTypes, getDeviationCodes, getHazardTypes, getRiskCategories, getProductTypes };
