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
router.get('/users/:id', authenticateToken, usersController.getId);
router.put('/users/:id', authenticateToken, usersController.put);
router.get('/languagecards', authenticateToken, languageCardsController.get);
router.post(
  '/languagecards/new',
  authenticateToken,
  languageCardsController.post
);
router.get(
  '/languagecards/:id',
  authenticateToken,
  languageCardsController.getId
);
router.put(
  '/languagecards/:id',
  authenticateToken,
  languageCardsController.put
);
router.get('/othercards', authenticateToken, otherCardsController.get);
router.post('/othercards/new', authenticateToken, otherCardsController.post);
router.get('/othercards/:id', authenticateToken, otherCardsController.getId);
router.put('/othercards/:id', authenticateToken, otherCardsController.put);

export default router;
