// utils/resourceRoute.js
const express = require('express');

function resourceRoute(path, controller) {
    const customRouter = express.Router();

    // Automatically bind routes based on HTTP methods
    customRouter.get('/', controller.index);
    customRouter.post('/', controller.store);
    customRouter.put('/:id', controller.update);
    customRouter.delete('/:id', controller.destroy);

    return { path, customRouter };
}

module.exports = resourceRoute;
