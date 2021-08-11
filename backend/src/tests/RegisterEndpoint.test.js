import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import testdb from './testdb';
import { User } from '../models/User';

beforeAll(() => {
  testdb();
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany();
});

describe('Register - /api/register', () => {
  const userData = {
    firstName: 'József',
    lastName: 'Mezei',
    email: 'mezei@vagyok.hu',
    password: 'test1234',
  };

  it('should return 201 status code', async done => {
    const response = await request(app).post('/api/register').send(userData);
    await expect(response.body.message).toEqual(
      'A felhasználó mentése sikerült'
    );
    await expect(response.body.status).toEqual(201);
    done();
  });

  it('should return 400 status code if the email address was registered', async done => {
    await request(app).post('/api/register').send(userData);

    const response = await request(app).post('/api/register').send(userData);
    await expect(response.body.message).toEqual(
      'Az email cím már regisztrálva van'
    );
    await expect(response.body.status).toEqual(400);
    done();
  });
});
