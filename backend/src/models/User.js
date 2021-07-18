import { model, Schema } from 'mongoose';

const userSchema = new Schema({
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
    default: 'user',
  },
});

export default model('User', userSchema);
