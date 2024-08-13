const express = require('express');
const { executeQuery } = require('../controllers/queryController');

const router = express.Router();

router.post('/query', executeQuery);

module.exports = router;
