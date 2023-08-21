const express = require('express');

const { verifyToken } = require('../middlewares/middlewar');

const { signup, getAllUser, login, getuserProfile, deleteUser ,updateUser } = require('../controllers/user_controller');
const router = express.Router();
router.route('/user/signup').post(signup);
router.route('/user/login').post(login);
router.route('/user/get-user-profile').get(verifyToken, getuserProfile);
router.route('/user/delete-user').delete(verifyToken, deleteUser);
router.route('/user/update-user').put(verifyToken, updateUser);
router.route('/user/getAlluser').get(getAllUser);


module.exports = router;