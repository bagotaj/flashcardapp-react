import express from 'express';
import cors from 'cors';
import { helloController } from '../controllers';
import { registrationController } from '../controllers/registrationController';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/hello', helloController.get);
router.post('/register', registrationController.post);

export default router;
