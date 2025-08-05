const express = require('express');
const { user_register, user_Login, user_logout, user_profile, user_Delete } = require('../controller/userController');
const { registerValidation, loginValidaton } = require('../middleware/userValidation');
const { authorization } = require('../auth/authorization');
const router = express.Router();

router.route('/register').post(registerValidation,user_register);

router.route('/login').post(loginValidaton,user_Login);

router.route('/Logout').post(authorization,user_logout);

router.route('/profile/:id').get(authorization,user_profile).delete(user_Delete);





module.exports = router;