import express from 'express';
import cors from 'cors';

import { registrationController } from '../controllers/registrationController';
import { loginController } from '../controllers/loginController';
import { usersController } from '../controllers/usersController';
import { languageCardsController } from '../controllers/languageCardsController';
import { otherCardsController } from '../controllers/otherCardsController';
import { rankController } from '../controllers/rankController';
import authenticateToken from '../middlewares/authenticateToken';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/register', registrationController.post);
router.post('/login', loginController.post);
router.post('/admin/login', loginController.post);

router.get('/users', authenticateToken, usersController.get);
router.get('/users/:id', authenticateToken, usersController.getId);
router.put('/users/:id', authenticateToken, usersController.put);
router.delete('/users/:id', authenticateToken, usersController.delete);

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
router.delete(
  '/languagecards/:id',
  authenticateToken,
  languageCardsController.delete
);

router.get('/othercards', authenticateToken, otherCardsController.get);
router.post('/othercards/new', authenticateToken, otherCardsController.post);
router.get('/othercards/:id', authenticateToken, otherCardsController.getId);
router.put('/othercards/:id', authenticateToken, otherCardsController.put);
router.delete(
  '/othercards/:id',
  authenticateToken,
  otherCardsController.delete
);

router.get('/ranks', authenticateToken, rankController.get);
router.get('/ranks/main', rankController.getTopFive);
router.put('/ranks/:id', authenticateToken, rankController.put);

export default router;
