import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import testdb from './testdb';
import { User } from '../models/User';

describe('PUT userId / Users - /api/users/:id', () => {
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

  it('should return 200 status code if User data has been updated. / PUT by userId', async () => {
    const newUserData = {
      userName: 'mezeij',
      firstName: 'József',
      lastName: 'Mezei',
      email: 'mezei@vagyok.hu',
      password: 'test1234',
      role: 'user',
    };

    const response = await request
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newUserData);

    const updatedUserData = await User.findById(userId);

    const { userName } = updatedUserData;

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Felhasználói adatok frissítve!');
    expect(userName).toEqual(newUserData.userName);
  });
});
