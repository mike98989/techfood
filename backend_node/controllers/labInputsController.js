
const LabInputs = require('../models/LabInputs');

// Sign In Controller
const index = async (req, res) => {
    try {
        const labInputs = await LabInputs.findAll({
            where: { user_id: req.user.id },
            //include: [{ model: User, as: 'user' }]
        });

        if (!labInputs) {
            return res.status(404).json({ message: 'No Record found' });
        }

        res.json({ data: labInputs, status: '1' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data ', error });
    }
};
module.exports = { index };
