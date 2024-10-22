const express = require('express');
const router = express.Router();
const fruitProductionController = require('../controllers/fruitProductionController');
const LabInputsController = require('../controllers/labInputsController');
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

///////// Protected routes
const { path, customRouter } = resourceRoute('/v1/fruitproduction', fruitProductionController);
//app.use(path, router);

router.use(path, authenticateToken, customRouter);
router.use('/v1/labinputs', authenticateToken, LabInputsController.index);

module.exports = router;
