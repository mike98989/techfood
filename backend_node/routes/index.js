const express = require('express');
const router = express.Router();
const fruitProductionController = require('../controllers/fruitProductionController');
const LabInputsController = require('../controllers/labInputsController');
const deviationComplaintController = require('../controllers/devitionComplaintsController');

const authenticateToken = require('../middleware/auth');
const fruitsController = require('../controllers/fruitsController');
const resourceRoute = require('./utils/resourceRoute');

// Import versioned routes
const authV1 = require('./v1/auth');

// Use the versioned routes
router.use('/v1/auth', authV1);

/////////Generic Api route
router.get('/v1/fruits', fruitProductionController.getFruits);
router.get('/v1/causes', fruitProductionController.getCauses);
router.get('/v1/deviation_types', fruitProductionController.getDeviationTypes);
router.get('/v1/deviation_types_for_deviation_complaint', deviationComplaintController.getDeviationTypes);
router.get('/v1/deviation_codes_for_deviation_complaint', deviationComplaintController.getDeviationCodes);
router.get('/v1/hazard_type_for_deviation_complaint', deviationComplaintController.getHazardTypes);
router.get('/v1/risk_categories_for_deviation_complaint', deviationComplaintController.getRiskCategories);
router.get('/v1/products_type_for_deviation_complaint', deviationComplaintController.getProductTypes);



///////// Protected routes
//const { path, customRouter } = resourceRoute('/v1/fruitproduction', fruitProductionController);
const fruitProductionRouter = resourceRoute(fruitProductionController);
const deviationComplaintRouter = resourceRoute(deviationComplaintController);

//router.use(path, authenticateToken, customRouter);
router.use('/v1/fruitproduction', authenticateToken, fruitProductionRouter);
router.use('/v1/deviationcomplaints', authenticateToken, deviationComplaintRouter);
router.use('/v1/labinputs', authenticateToken, LabInputsController.index);
//router.use('/v1/deviationcomplaints', authenticateToken, deviationComplaintController.index);

module.exports = router;
