import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import testdb from './testdb';
import { Ranks } from '../models/Ranks';

describe('GET / Rank list - /api/ranks', () => {
  const request = supertest(app);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTA2ZWMxYmRkMDYxYjMwMzg3OGU0M2QiLCJmaXJzdE5hbWUiOiJQZXRpIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI4Nzg0ODczfQ.ZkJX3uddLFc0EJ9Iql0K6SJvjTI9QKLdDcB2p8QlFes';

  const rankData = {
    userId: '6106ec1bdd061b303878e43d',
    userName: 'peldabela',
    points: 12,
  };

  const rankData2 = {
    userId: '611548d47968bb65576ea2de',
    userName: 'peldaelek',
    points: 8,
  };

  beforeAll(async () => {
    testdb();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await testdb.close();
  });

  beforeEach(async () => {
    await Ranks.deleteMany();
  });

  it('should return 200 status code and all of ranks if the user has logged in. / GET', async () => {
    const rank = new Ranks(rankData);
    const rank2 = new Ranks(rankData2);

    await rank.save();
    await rank2.save();

    const response = await request
      .get('/api/ranks')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});
