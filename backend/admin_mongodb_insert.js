import mongoose from 'mongoose';
import db from './src/db';
import { Admin } from './src/models/User';

const admin = {
  userName: 'Admin',
  role: 'admin',
  firstName: 'Teszt',
  lastName: 'Admin',
  email: 'teszt@admin.hu',
  password: '$2a$10$7beDMRc1Ix.JJbNl.eIpoe0Ai1bEh6rH1B2farDzXiiDDxgO6B.pe',
};

const createAdmin = async () => {
  const newAdmin = new Admin(admin);

  const response = newAdmin.save();

  return response;
};

try {
  db().then(() => {
    mongoose.connection.db.dropDatabase().then(() => {
      db().then(() => {
        createAdmin().then(() => {
          mongoose.connection.close();
        });
      });
    });
  });
} catch (err) {
  console.error(err);
}
