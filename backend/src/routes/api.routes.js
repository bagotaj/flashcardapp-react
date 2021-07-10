import express from 'express';
import cors from 'cors';

import { registrationController } from '../controllers/registrationController';
import { loginController } from '../controllers/loginController';
import { getUsersController } from '../controllers/getUsersController';
import { makeCardsController } from '../controllers/makeCardsController';
import authenticateToken from '../middlewares/authenticateToken';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/register', registrationController.post);
router.post('/login', loginController.post);
router.get('/users', authenticateToken, getUsersController.get);
router.post('/cards', makeCardsController.post);

export default router;
