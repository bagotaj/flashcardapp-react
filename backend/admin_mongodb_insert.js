import { model, Schema, mongoose } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Valami hiba történt'));

db.once('open', () => {
  console.log('A kapcsolat létrejött');

  const admin = {
    userName: 'Admin',
    role: 'admin',
    firstName: 'Teszt',
    lastName: 'Admin',
    email: 'teszt@admin.hu',
    password: '$2a$10$7beDMRc1Ix.JJbNl.eIpoe0Ai1bEh6rH1B2farDzXiiDDxgO6B.pe',
  };

  const adminSchema = Schema({
    userName: {
      type: String,
      required: true,
      max: 255,
      min: 1,
      default: 'Én',
    },
    firstName: {
      type: String,
      required: true,
      max: 255,
      min: 1,
    },
    lastName: {
      type: String,
      required: true,
      max: 255,
      min: 1,
    },
    email: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    password: {
      type: String,
      required: true,
      max: 255,
      min: 8,
    },
    role: {
      type: String,
      required: true,
      max: 255,
      min: 1,
      default: 'admin',
    },
  });

  const Admin = model('Admin', adminSchema, 'admins');

  const newAdmin = new Admin(admin);

  newAdmin.save((err, res) => {
    if (err) return console.error(err);
    console.log(res);
    return res;
  });
});
