const express = require('express');
const {UserSigUp,UserSigIn, getUser, verifyEmail, forgottenPassword, resetPassword} = require('../Controller/User/auth.user.js')
const upload = require('../utils/multer.js');
const authMiddleware = require('../Middleware/authMidlleware.js')

const router = express.Router();

// routes.post('/SignIn',UserSigIn);
router.post('/SignUp',upload.single('image'),UserSigUp);
router.get('/verifyemail/:token',verifyEmail);



router.post('/SignIn',UserSigIn);
router.post('/forgopassword',forgottenPassword);
router.post('/resetpassword/:token',resetPassword);


router.get('/user',authMiddleware,getUser);
// router.post('/upload',upload.single('image'),fileupload);


module.exports = router;