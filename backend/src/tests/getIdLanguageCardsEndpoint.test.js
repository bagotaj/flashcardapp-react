import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import testdb from './testdb';
import { LanguageCard } from '../models/Cards';

describe('GET cardId / LanguageCards - /api/languagecards/:id', () => {
  const request = supertest(app);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTA2ZWMxYmRkMDYxYjMwMzg3OGU0M2QiLCJmaXJzdE5hbWUiOiJQZXRpIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI4Nzg0ODczfQ.ZkJX3uddLFc0EJ9Iql0K6SJvjTI9QKLdDcB2p8QlFes';

  const cardData = {
    cardType: 'Nyelv kártya',
    cardTitle: 'Magyar - Angol',
    description: 'Általános szavak, kifejezések',
    cards: [
      { side1: 'provide', side2: 'biztosít, ellát' },
      { side1: 'append', side2: 'mellékel, hozzáfűz' },
    ],
    userId: '6106ec1bdd061b303878e43d',
  };

  const cardData2 = {
    cardType: 'Nyelv kártya',
    cardTitle: 'Japán - Magyar',
    description: 'Általános szavak, kifejezések',
    cards: [
      { side1: 'はい', side2: 'igen' },
      { side1: 'いいえ', side2: 'nem' },
    ],
    userId: '611548d47968bb65576ea2de',
  };

  const languagecard = new LanguageCard(cardData);
  const languagecard2 = new LanguageCard(cardData2);

  beforeAll(async () => {
    testdb();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await testdb.close();
  });

  afterEach(async () => {
    await LanguageCard.deleteMany();
  });

  it('should return 200 status code if Card has been found. / GET by cardId', async () => {
    await languagecard.save();
    await languagecard2.save();

    const foundCard = await LanguageCard.find({ cardTitle: 'Magyar - Angol' });

    const cardId = foundCard[0].id;

    const response = await request
      .get(`/api/languagecards/${cardId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.cardTitle).toEqual(foundCard[0].cardTitle);
  });

  it('should return 404 status code if the cardId is invalid.', async () => {
    const badCardId = 'dhekrtydlaok;ekduyt';
    const response = await request
      .get(`/api/languagecards/${badCardId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});
