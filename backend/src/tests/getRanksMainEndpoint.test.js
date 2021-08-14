import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import testdb from './testdb';
import { Ranks } from '../models/Ranks';

describe('GET / Top 5 rank list - /api/ranks/main', () => {
  const request = supertest(app);

  const rankData = [
    {
      userId: '6106ec1bdd061b303878e43d',
      userName: 'peldabela',
      points: 12,
    },
    {
      userId: '611548d47968bb65576ea2de',
      userName: 'peldaelek',
      points: 8,
    },
    {
      userId: '76878d47968bb65576zjkjee',
      userName: 'peldatamás',
      points: 5,
    },
    {
      userId: '7jdh67647968bb65576ea2de',
      userName: 'peldaéva',
      points: 19,
    },
    {
      userId: '651248d47968bb65576thj23',
      userName: 'peldaemma',
      points: 8,
    },
    {
      userId: '789148d47968bb65576ea2de',
      userName: 'peldaági',
      points: 11,
    },
    {
      userId: '541672d47968bb65576e24gs',
      userName: 'peldakata',
      points: 5,
    },
  ];

  beforeAll(async () => {
    testdb();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await testdb.close();
  });

  afterEach(async () => {
    await Ranks.deleteMany();
  });

  it('should return 200 status code and the top 5 ranks if the user has not logged in. / GET', async () => {
    rankData.forEach(async oneRankData => {
      const rank = new Ranks(oneRankData);
      await rank.save();
    });

    const response = await request.get('/api/ranks/main');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(5);
  });
});
