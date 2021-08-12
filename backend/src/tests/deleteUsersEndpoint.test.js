import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import testdb from './testdb';
import { User } from '../models/User';

describe('Delete user by userId / Users - /api/users/:id', () => {
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

  it('should return 200 status code and "A felhasználó törölve lett"', async done => {
    const userFromDatabase = await User.findById(userId);

    const response = await request
      .delete(`/api/users/${userFromDatabase.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('A felhasználó törölve lett');
    done();
  });

  it('should return 400 status code if userId is invalid', async done => {
    const badUserId = 'kdjtksokahtksoldki';

    const response = await request
      .delete(`/api/users/${badUserId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);

    done();
  });
});
