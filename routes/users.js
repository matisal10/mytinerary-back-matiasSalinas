import express from 'express';
const router = express.Router();
import authController from '../controllers/user/userController.js';
import { signUpSchema } from '../validators/singUpValidator.js';
import { signInSchema } from '../validators/singInValidator.js';
import validator from '../middlewares/validator.js';
import { emailExists } from '../middlewares/emailExists.js';
import passport from '../middlewares/passport.js'

const {signUp,  signIn, loginWithToken } = authController

router.post('/signIn', validator(signInSchema), signIn)
router.post('/singUp',emailExists, validator(signUpSchema), signUp)
router.get('/token', passport.authenticate( 'jwt', {session:false} ) ,loginWithToken)

export default router;
