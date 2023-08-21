const express = require('express');

const { verifyToken } = require('../middlewares/middlewar');

const { createQuiz, createQuestion, getAllQuiZ ,deleteQuiz } = require('../controllers/quiz_controller');
const router = express.Router();
router.route('/quiz/create').post(verifyToken, createQuiz);
router.route('/quiz/add-questions').post(verifyToken, createQuestion);
router.route('/quiz/delete-quiz/:id').delete(verifyToken,deleteQuiz);

router.route('/quiz/get-all').get(getAllQuiZ);


module.exports = router;