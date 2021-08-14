import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import testdb from './testdb';
import { Ranks } from '../models/Ranks';

describe('PUT Update rank points of user using userId - /ranks/:id', () => {
  const request = supertest(app);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTA2ZWMxYmRkMDYxYjMwMzg3OGU0M2QiLCJmaXJzdE5hbWUiOiJQZXRpIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI4Nzg5Njk2fQ.Le0h3HmfOH9JGN1DxG2y8X78nz12awXoeXyYw_U10Eo';

  const rankData = {
    userId: '6106ec1bdd061b303878e43d',
    userName: 'peldabela',
    points: 12,
  };

  beforeAll(async () => {
    testdb();

    const rank = new Ranks(rankData);
    rank.save();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await testdb.close();
  });

  afterEach(async () => {
    await Ranks.deleteMany();
  });

  it('should return 200 status code', async done => {
    const newRankData = {
      userId: '6106ec1bdd061b303878e43d',
      userName: 'peldabela',
      points: 5,
    };

    const { userId } = newRankData;

    const response = await request
      .put(`/api/ranks/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newRankData);

    const updatedRank = await Ranks.find({
      userId: '6106ec1bdd061b303878e43d',
    });

    expect(updatedRank[0].points).toBe(17);
    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('Felhasználói pontszámok frissítve!');
    done();
  });

  it('should return 400 status code if rank data format is not proper', async done => {
    const badNewRankData = {
      userId: '6106ec1bdd061b303878e43d',
      userName: '',
      points: 5,
    };

    const { userId } = badNewRankData;

    const response = await request
      .put(`/api/ranks/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(badNewRankData);

    await expect(response.body.status).toEqual(400);
    done();
  });
});
