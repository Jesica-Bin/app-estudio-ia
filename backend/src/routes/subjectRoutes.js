const express = require('express');
const subjectController = require('../controllers/subjectController');

const router = express.Router();

router.post('/', subjectController.createSubject);

module.exports = router;
