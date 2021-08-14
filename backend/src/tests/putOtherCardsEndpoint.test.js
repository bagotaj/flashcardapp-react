import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import testdb from './testdb';
import { OtherCard } from '../models/Cards';

describe('PUT Update other cards - /api/othercards/:id', () => {
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
    const newCardData = {
      cardType: 'Egyéb kártya',
      cardTitle: 'Matematika',
      description: 'Módosított',
      cards: [{ side1: 'Összeadás', side2: 'Két szám összege' }],
      userId: '6106ec1bdd061b303878e43d',
    };

    await request
      .post('/api/othercards/new')
      .set('Authorization', `Bearer ${token}`)
      .send(cardData);

    const savedCard = await OtherCard.find({ cardTitle: 'Matematika' });

    const cardId = savedCard[0].id;

    const response = await request
      .put(`/api/othercards/${cardId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newCardData);

    const updatedCard = await OtherCard.find({ _id: cardId });

    await expect(updatedCard[0].description).toBe('Módosított');
    await expect(response.status).toEqual(200);
    await expect(response.body.message).toEqual('A kártyaadatok frissítve!');
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

    await request
      .post('/api/othercards/new')
      .set('Authorization', `Bearer ${token}`)
      .send(cardData);

    const savedCard = await OtherCard.find({
      description: 'Egyszerű matematika',
    });

    const cardId = savedCard[0].id;

    const response = await request
      .put(`/api/othercards/${cardId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(badCardData);

    await expect(response.body.status).toEqual(400);
    done();
  });
});
