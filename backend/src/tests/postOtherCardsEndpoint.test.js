import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import testdb from './testdb';
import { OtherCard } from '../models/Cards';

describe('POST Adding new other cards - /api/othercards/new', () => {
  const request = supertest(app);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTA2ZWMxYmRkMDYxYjMwMzg3OGU0M2QiLCJmaXJzdE5hbWUiOiJQZXRpIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI4Nzg5Njk2fQ.Le0h3HmfOH9JGN1DxG2y8X78nz12awXoeXyYw_U10Eo';

  const cardData = {
    cardType: 'Egyéb kártya',
    cardTitle: 'Matematika',
    description: 'Egyszerű matematika',
    cards: [{ side1: 'Összeadás', side2: 'Két szám összege' }],
    userId: '6106ec1bdd061b303878e43d',
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

  it('should return 200 status code', async done => {
    const response = await request
      .post('/api/othercards/new')
      .set('Authorization', `Bearer ${token}`)
      .send(cardData);

    const savedCard = await OtherCard.find({ cardTitle: 'Matematika' });

    await expect(savedCard[0].cardTitle).toBe(cardData.cardTitle);
    await expect(response.status).toEqual(200);
    await expect(response.body.message).toEqual('A kártyák mentve');
    done();
  });

  it('should return 400 status code if card format is not proper', async done => {
    const badCardData = {
      cardType: 'Egyéb kártya',
      cardTitle: 'Matematika',
      description: '',
      cards: [{ side1: 'Összeadás', side2: 'Két szám összege' }],
      userId: '6106ec1bdd061b303878e43d',
    };

    const response = await request
      .post('/api/othercards/new')
      .set('Authorization', `Bearer ${token}`)
      .send(badCardData);

    await expect(response.body.status).toEqual(400);
    done();
  });
});
