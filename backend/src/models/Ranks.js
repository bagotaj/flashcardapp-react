import { model, Schema } from 'mongoose';

const rankSchema = new Schema({
  userId: {
    type: String,
    required: true,
    max: 255,
    min: 1,
  },
  userName: {
    type: String,
    required: true,
    max: 255,
    min: 1,
  },
  points: {
    type: Number,
    required: true,
  },
});

export const Ranks = model('Ranks', rankSchema, 'ranks');
