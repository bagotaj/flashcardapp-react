import { model, Schema } from 'mongoose';

const languageCardSchema = new Schema({
  cardTitle: {
    type: String,
    required: true,
    max: 255,
    min: 1,
  },
  cards: [
    {
      side1: String,
      side2: String,
    },
  ],
});

export default model('languageCard', languageCardSchema);
