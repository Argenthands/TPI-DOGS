const express = require('express');
const temperamentsRoutes = require('./temperament');
const dogsRoutes = require('./dog');

const router = express.Router();
router.use('/dogs', dogsRoutes);
router.use('/temperaments', temperamentsRoutes);


module.exports = router;
