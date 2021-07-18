import { model, Schema } from 'mongoose';

const cardSchema = new Schema({
  cardTitle: {
    type: String,
    required: true,
    max: 255,
    min: 1,
  },
  description: {
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

export const LanguageCard = model('languageCard', cardSchema);
export const OtherCard = model('otherCard', cardSchema);
