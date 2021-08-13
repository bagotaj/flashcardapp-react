import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import testdb from './testdb';
import { OtherCard } from '../models/Cards';

describe('GET / OtherCards - /api/othercards', () => {
  const request = supertest(app);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTA2ZWMxYmRkMDYxYjMwMzg3OGU0M2QiLCJmaXJzdE5hbWUiOiJQZXRpIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI4Nzg0ODczfQ.ZkJX3uddLFc0EJ9Iql0K6SJvjTI9QKLdDcB2p8QlFes';
  const tokenAdmin =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTA2ZWMxYmRkMDYxYjMwMzg3OGU0M2QiLCJmaXJzdE5hbWUiOiJQZXRpIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI4Nzg5Njk2fQ.Le0h3HmfOH9JGN1DxG2y8X78nz12awXoeXyYw_U10Eo';

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

  it('should return 200 status code and all of cards of a user if the user has logged in. / GET', async () => {
    const othercard = new OtherCard(cardData);
    const othercard2 = new OtherCard(cardData2);

    await othercard.save();
    await othercard2.save();

    const response = await request
      .get('/api/othercards')
      .set('Authorization', `Bearer ${token}`);

    const result = response.body[0].cardTitle;

    expect(response.status).toBe(200);
    expect(result).toEqual(cardData.cardTitle);
  });

  it('should return 200 status code and all of cards if Admin has logged in. / GET', async () => {
    const othercard = new OtherCard(cardData);
    const othercard2 = new OtherCard(cardData2);

    await othercard.save();
    await othercard2.save();

    const resultCards = await OtherCard.find();

    const response = await request
      .get('/api/othercards')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(response.status).toBe(200);
    expect(resultCards).toHaveLength(2);
    expect(response.body).toHaveLength(2);
  });

  it("should return 204 status code and empty response body if logged in user don't have cards. / GET", async () => {
    const result = await OtherCard.find();

    expect(result).toEqual([]);

    const response = await request
      .get('/api/othercards')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });
});
