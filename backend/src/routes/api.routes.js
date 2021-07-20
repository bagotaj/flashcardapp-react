import express from 'express';
import cors from 'cors';

import { registrationController } from '../controllers/registrationController';
import { loginController } from '../controllers/loginController';
import { usersController } from '../controllers/usersController';
import { languageCardsController } from '../controllers/languageCardsController';
import { otherCardsController } from '../controllers/otherCardsController';
import authenticateToken from '../middlewares/authenticateToken';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/register', registrationController.post);
router.post('/login', loginController.post);
router.get('/users', authenticateToken, usersController.get);
// router.get('/languagecards', languageCardsController.get);
router.post('/languagecards/new', languageCardsController.post);
// router.get('/othercards', otherCardsController.get);
router.post('/othercards/new', otherCardsController.post);

export default router;
