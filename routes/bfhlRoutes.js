const express = require('express');
const { getUserData, processData } = require('../controllers/bfhlController');

const router = express.Router();

router.get('/bfhl', getUserData);
router.post('/bfhl', processData);

module.exports = router;
 