import { Router } from 'express';
import AuthController from '../../controller/v1/auth.controller';

const router = Router();

router.post('/register', AuthController.registerValidation, AuthController.register);
// router.post('/login',)
export default router;