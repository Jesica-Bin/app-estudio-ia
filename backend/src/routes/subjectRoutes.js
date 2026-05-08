const express = require('express');
const subjectController = require('../controllers/subjectController');

const router = express.Router();

router.post('/', subjectController.createSubject);
router.get('/', subjectController.getAllSubjects);
router.get('/:id', subjectController.getSubjectById);
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;
