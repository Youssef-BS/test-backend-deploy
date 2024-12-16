const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');


router.post('/register' , authController.registerUser); 
router.post('/login' , authController.login);
router.post('/verify/:token' , authController.verifyEmail);
router.put('/acceptAccount/:id' , authController.acceptAcountRequest);
router.delete('/refuseUser/:id' , authController.refuseUser) ;

module.exports = router;