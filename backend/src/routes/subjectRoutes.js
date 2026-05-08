const express = require('express');
const subjectController = require('../controllers/subjectController');

const router = express.Router();

router.post('/', subjectController.createSubject);
router.get('/', subjectController.getAllSubjects);
router.get('/:id', subjectController.getSubjectById);

module.exports = router;
