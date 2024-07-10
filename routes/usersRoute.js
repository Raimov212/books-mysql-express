import express from 'express';
import { getAllUsers, signIn, signUp } from '../controllers/usersController.js';
import accessToken from '../middleware/accessToken.js';


const router = express.Router()


router.route('/sign-in').post(signIn);
router.route('/sign-up').post(signUp);
router.route('/all-users').get(accessToken,getAllUsers);

export default router