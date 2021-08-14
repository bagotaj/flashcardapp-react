import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import testdb from './testdb';
import { LanguageCard } from '../models/Cards';

describe('DELETE Delete language card by cardId - /api/languagecards/:id', () => {
  const request = supertest(app);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTA2ZWMxYmRkMDYxYjMwMzg3OGU0M2QiLCJmaXJzdE5hbWUiOiJQZXRpIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI4Nzg5Njk2fQ.Le0h3HmfOH9JGN1DxG2y8X78nz12awXoeXyYw_U10Eo';

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

  let cardId;

  beforeAll(async () => {
    testdb();
    await request
      .post('/api/languagecards/new')
      .set('Authorization', `Bearer ${token}`)
      .send(cardData);

    const savedCard = await LanguageCard.find({
      description: 'Általános szavak, kifejezések',
    });

    cardId = savedCard[0].id;
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await testdb.close();
  });

  afterEach(async () => {
    await LanguageCard.deleteMany();
  });

  it('should return 200 status code', async done => {
    const response = await request
      .delete(`/api/languagecards/${cardId}`)
      .set('Authorization', `Bearer ${token}`);

    const emptyDatabase = await LanguageCard.find();

    await expect(emptyDatabase).toStrictEqual([]);
    await expect(response.status).toEqual(200);
    await expect(response.body.message).toEqual('A kártya törölve lett');
    done();
  });

  it('should return 400 status code if cardId is not exist', async done => {
    const badCardId = 'kfjkeidyhajkajdka';

    const response = await request
      .put(`/api/languagecards/${badCardId}`)
      .set('Authorization', `Bearer ${token}`);

    await expect(response.status).toEqual(400);
    done();
  });
});
