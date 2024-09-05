import express from 'express';
import { authController } from '../controller/auth.Controller.js';

const authRouter = express.Router();

authRouter.post('/login', authController.login); 
authRouter.post('/register', authController.register);

export { authRouter };
