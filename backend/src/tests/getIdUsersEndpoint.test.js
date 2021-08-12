import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import testdb from './testdb';
import { User } from '../models/User';

describe('GET userId / Users - /api/users/:id', () => {
  const request = supertest(app);

  const userData = {
    firstName: 'József',
    lastName: 'Mezei',
    email: 'mezei@vagyok.hu',
    password: 'test1234',
  };

  const loginData = {
    email: 'mezei@vagyok.hu',
    password: 'test1234',
    location: '/login',
  };

  let token;
  let userId;

  beforeAll(async () => {
    testdb();
    await request.post('/api/register').send(userData);
    const response = await request.post('/api/login').send(loginData);
    token = response.body.token;
    userId = response.body.userId;
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await testdb.close();
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it('should return 200 status code if User has been found. / GET by userId', async () => {
    const expectedUserData = {
      userName: 'József',
      firstName: 'József',
      lastName: 'Mezei',
      email: 'mezei@vagyok.hu',
      role: 'user',
    };

    const response = await request
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    const { __v, _id, password, ...rest } = response.body;

    expect(response.status).toBe(200);
    expect(rest).toEqual(expectedUserData);
  });

  it('should return 404 status code if the userId is invalid.', async () => {
    const badUserId = 'dhekrtydlaok;ekduyt';
    const response = await request
      .get(`/api/users/${badUserId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});
