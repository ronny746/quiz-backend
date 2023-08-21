const Quiz = require("../models/quiz");



exports.createQuiz = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { title } = req.body;
        // Example data for creating a new quiz
        const newQuizData = {
            title: title,
            user: userId,
            approve: false,
            questions: []
        };

        // Create a new quiz using the Quiz model
        const newQuiz = await Quiz.create(newQuizData);

        res.status(201).json(newQuiz);
    } catch (err) {
        res.status(500).json({ message: 'An error occurred', error: err.message });
    }
};



exports.createQuestion = async (req, res, next) => {
    try {
        const { quizId, questionText, options, correctOptionIndex } = req.body;

        // Find the quiz by ID
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Create a new question and add it to the quiz's questions array
        const newQuestion = {
            questionText,
            options,
            correctOptionIndex
        };
        quiz.questions.push(newQuestion);

        // Save the updated quiz
        await quiz.save();

        return res.status(201).json({ message: 'Question added to the quiz' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};


exports.deleteQuiz = async (req, res, next) => {
    try {
        const quizId = req.params.id;

        // Find the quiz by ID and remove it
        const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

        if (!deletedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        return res.status(200).json({ status: true, message: 'Quiz delete successfully!'}); // Successful deletion, no content to return
    } catch (err) {
        return res.status(500).json({ message: 'An error occurred', error: err.message });
    }
};



exports.getAllQuiZ = async (req, res, next) => {
    let quizs;
    try {
        quizs = await Quiz.find().populate('user', '-password');
    } catch (err) {
        console.log(err);
    }
    if (!quizs) {
        return res.status(404).json({ message: "No Quizs Found" });
    }
    return res.status(200).json({ status: true, quizs });
}
