import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import testdb from './testdb';
import { LanguageCard } from '../models/Cards';

describe('PUT Update language card - /api/languagecards/:id', () => {
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

  it('should return 200 status code', async done => {
    const newCardData = {
      cardType: 'Nyelv kártya',
      cardTitle: 'Magyar - Angol',
      description: 'Módosított',
      cards: [
        { side1: 'provide', side2: 'biztosít, ellát' },
        { side1: 'append', side2: 'mellékel, hozzáfűz' },
      ],
      userId: '6106ec1bdd061b303878e43d',
    };

    await request
      .post('/api/languagecards/new')
      .set('Authorization', `Bearer ${token}`)
      .send(cardData);

    const savedCard = await LanguageCard.find({
      description: 'Általános szavak, kifejezések',
    });

    const cardId = savedCard[0].id;

    const response = await request
      .put(`/api/languagecards/${cardId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newCardData);

    const updatedCard = await LanguageCard.find({ _id: cardId });

    await expect(updatedCard[0].description).toBe('Módosított');
    await expect(response.status).toEqual(200);
    await expect(response.body.message).toEqual('A kártyaadatok frissítve!');
    done();
  });

  it('should return 400 status code if card format is not proper', async done => {
    const badCardData = {
      cardType: 'Nyelv kártya',
      cardTitle: 'Magyar - Angol',
      description: '',
      cards: [
        { side1: 'provide', side2: 'biztosít, ellát' },
        { side1: 'append', side2: 'mellékel, hozzáfűz' },
      ],
      userId: '6106ec1bdd061b303878e43d',
    };

    await request
      .post('/api/languagecards/new')
      .set('Authorization', `Bearer ${token}`)
      .send(cardData);

    const savedCard = await LanguageCard.find({
      description: 'Általános szavak, kifejezések',
    });

    const cardId = savedCard[0].id;

    const response = await request
      .put(`/api/languagecards/${cardId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(badCardData);

    await expect(response.status).toEqual(400);
    done();
  });
});
