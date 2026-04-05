const express = require('express');
const router = express.Router();

const {
    saveResumeToDb,
    loadSavedResumes,
    getResumeById,
    updateResume,
    deleteResume
} = require('../controllers/resumeControllers');

router.post("/", saveResumeToDb);
router.get("/", loadSavedResumes);
router.get('/',getResumeById);
router.put('/:id',updateResume);
router.delete('/:id',deleteResume);

module.exports = router;
