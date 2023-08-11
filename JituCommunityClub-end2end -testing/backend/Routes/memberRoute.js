const {Router} = require('express');
const { registerUser } = require('../Controllers/membershipController');

const userRouter = Router();

userRouter.post('/', registerUser)

module.exports = {
    userRouter
}