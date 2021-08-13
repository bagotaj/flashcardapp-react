import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import testdb from './testdb';
import { OtherCard } from '../models/Cards';

describe('GET cardId / OtherCards - /api/othercards/:id', () => {
  const request = supertest(app);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTA2ZWMxYmRkMDYxYjMwMzg3OGU0M2QiLCJmaXJzdE5hbWUiOiJQZXRpIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI4Nzg0ODczfQ.ZkJX3uddLFc0EJ9Iql0K6SJvjTI9QKLdDcB2p8QlFes';

  const cardData = {
    cardType: 'Egyéb kártya',
    cardTitle: 'Matematika',
    description: 'Egyszerű matematika',
    cards: [{ side1: 'Összeadás', side2: 'Két szám összege' }],
    userId: '6106ec1bdd061b303878e43d',
  };

  const cardData2 = {
    cardType: 'Egyéb kártya',
    cardTitle: 'Fetch',
    description: 'Minden a fetch-ről',
    cards: [{ side1: 'GET', side2: 'Adatok lekérése a szerverről' }],
    userId: '611548d47968bb65576ea2de',
  };

  const othercard = new OtherCard(cardData);
  const othercard2 = new OtherCard(cardData2);

  beforeAll(async () => {
    testdb();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await testdb.close();
  });

  afterEach(async () => {
    await OtherCard.deleteMany();
  });

  it('should return 200 status code if Card has been found. / GET by cardId', async () => {
    await othercard.save();
    await othercard2.save();

    const foundCard = await OtherCard.find({ cardTitle: 'Matematika' });

    const cardId = foundCard[0].id;

    const response = await request
      .get(`/api/othercards/${cardId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.cardTitle).toEqual(foundCard[0].cardTitle);
  });

  it('should return 404 status code if the cardId is invalid.', async () => {
    const badCardId = 'dhekrtydlaok;ekduyt';
    const response = await request
      .get(`/api/othercards/${badCardId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});
