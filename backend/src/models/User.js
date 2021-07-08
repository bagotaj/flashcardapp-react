import { model, Schema } from 'mongoose';

const userSchema = new Schema({
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
  },
});

export default model('User', userSchema);
