import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

// eslint-disable-next-line consistent-return
const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401).send('Hozzáférés megtagadva');

  try {
    const verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = verifiedUser;

    next();
  } catch (error) {
    res.status(401).send('Érvénytelen token');
  }
};

export default authenticateToken;
