import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import testdb from './testdb';
import { Admin } from '../models/User';

describe('Login - /api/admin/login', () => {
  const adminData = {
    userName: 'Admin',
    firstName: 'József',
    lastName: 'Mezei',
    email: 'mezei@vagyok.hu',
    password: '$2a$10$1TBUXVT147xoSfSIgI3cZOXFDJFn7IMP.ZiXgLtAm5OFDYMsWXp/G',
    role: 'admin',
  };

  const request = supertest(app);

  const admin = new Admin(adminData);

  beforeAll(async () => {
    testdb();
    await admin.save(adminData);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await testdb.close();
  });

  afterEach(async () => {
    await Admin.deleteMany();
  });

  it('should return 200 status code.', async () => {
    const loginData = {
      email: 'mezei@vagyok.hu',
      password: '234567891',
      location: '/admin/login',
    };

    const response = await request.post('/api/admin/login').send(loginData);

    expect(response.body.token).toBeTruthy();
    expect(response.body.status).toBe(200);
    expect(response.body.firstName).toBe('József');
  });

  it("should return 400 status code if the email wasn't registered.", async () => {
    const loginData = {
      email: 'tamab@vagyok.hu',
      password: '234567891',
      location: '/admin/login',
    };

    const response = await request.post('/api/admin/login').send(loginData);

    expect(response.body.token).toBeFalsy();
    expect(response.body.status).toBe(400);
    expect(response.body.message).toBe('Az email cím még nincs regisztrálva');
  });
});
