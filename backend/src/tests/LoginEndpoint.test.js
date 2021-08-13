import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import testdb from './testdb';
import { User } from '../models/User';

describe('Login - /api/login', () => {
  const userData = {
    userName: 'József',
    firstName: 'József',
    lastName: 'Mezei',
    email: 'mezei@vagyok.hu',
    password: '$2a$10$1TBUXVT147xoSfSIgI3cZOXFDJFn7IMP.ZiXgLtAm5OFDYMsWXp/G',
    role: 'user',
  };

  const request = supertest(app);

  const user = new User(userData);

  beforeAll(async () => {
    testdb();
    await user.save();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await testdb.close();
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it('should return 200 status code.', async () => {
    const loginData = {
      email: 'mezei@vagyok.hu',
      password: '234567891',
      location: '/login',
    };

    const response = await request.post('/api/login').send(loginData);

    expect(response.body.token).toBeTruthy();
    expect(response.body.status).toBe(200);
    expect(response.body.firstName).toBe('József');
  });

  it("should return 400 status code if the email wasn't registered.", async () => {
    const loginData = {
      email: 'tamab@vagyok.hu',
      password: '234567891',
      location: '/login',
    };

    const response = await request.post('/api/login').send(loginData);

    expect(response.body.token).toBeFalsy();
    expect(response.body.status).toBe(400);
    expect(response.body.message).toBe('Az email cím még nincs regisztrálva');
  });
});
