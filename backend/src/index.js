import dotenv from 'dotenv';
import db from './db';
import logger from './logger';
import app from './app';

dotenv.config();
db();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`App is listening on ${PORT}`);
});
