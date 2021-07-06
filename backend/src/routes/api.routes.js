import express from 'express';
import cors from 'cors';
import { registrationController } from '../controllers/registrationController';
import { loginController } from '../controllers/loginController';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/register', registrationController.post);
router.post('/login', loginController.post);

export default router;
