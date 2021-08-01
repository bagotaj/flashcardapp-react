import { model, Schema } from 'mongoose';

const cardSchema = new Schema({
  cardType: {
    type: String,
    required: true,
    max: 255,
    min: 1,
  },
  cardTitle: {
    type: String,
    required: true,
    max: 255,
    min: 1,
  },
  description: {
    type: String,
    required: false,
    max: 255,
    min: 1,
  },
  cards: [
    {
      side1: String,
      side2: String,
    },
  ],
  userId: {
    type: String,
    required: true,
    max: 255,
    min: 1,
  },
});

export const LanguageCard = model('languageCard', cardSchema);
export const OtherCard = model('otherCard', cardSchema);
