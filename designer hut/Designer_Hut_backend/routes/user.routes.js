const express = require('express');
const { user_register, user_Login, user_logout, user_profile, user_Delete, user_Data, user_ProfileView, useruploadprofile } = require('../controller/userController');
const { registerValidation, loginValidaton } = require('../middleware/userValidation');
const { authorization } = require('../middleware/authorization');


const router = express.Router();

router.route('/register').post(registerValidation,user_register);

router.route('/login').post(loginValidaton,user_Login);

router.route('/Logout').post(user_logout);

router.route('/profile').get(authorization,user_ProfileView).put(authorization,user_profile).delete(user_Delete);

router.route('/users').get(user_Data)

router.route('/upload/profile/:id').get(useruploadprofile)



module.exports = router;