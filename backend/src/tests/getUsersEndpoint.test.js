import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import testdb from './testdb';
import { User } from '../models/User';

describe('GET / Users - /api/users', () => {
  const request = supertest(app);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTEzOTFiN2MyNGZmNjE5ZDk1Y2MzZmEiLCJmaXJzdE5hbWUiOiJCYWzDoXpzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Mjg2ODM3MjJ9.TtDd0jBsA8v0PxXYB8HfkKQOS3KG0N_Qy2X8ILD2XuY';
  const token2 =
    'yrjakajduNiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTEzOTFiN2MyNGZmNjE5ZDk1Y2MzZmEiLCJmaXJzdE5hbWUiOiJCYWzDoXpzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Mjg2ODM3MjJ9.TtDd0jBsA8v0PxXYB8HfkKQOS3KG0N_Qy2X8ILD2XuY';

  beforeAll(async () => {
    testdb();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await testdb.close();
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it('should return 200 status code if Admin has logged in. / GET', async () => {
    const response = await request
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should return 401 status code if the token is invalid.', async () => {
    const response = await request
      .get('/api/users')
      .set('Authorization', `Bearer ${token2}`);

    expect(response.status).toBe(401);
    expect(response.error.text).toEqual('Érvénytelen token');
  });
});
