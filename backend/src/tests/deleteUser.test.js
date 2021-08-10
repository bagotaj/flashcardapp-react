import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import testdb from './testdb';
import { User } from '../models/User';

describe('Delete user', () => {
  const userData1 = {
    userName: 'József',
    firstName: 'József',
    lastName: 'Mezei',
    email: 'mezei@vagyok.hu',
    password: '$2a$10$1TBUXVT147xoSfSIgI3cZOXFDJFn7IMP.ZiXgLtAm5OFDYMsWXp/G',
    role: 'user',
  };

  const userData2 = {
    userName: 'János',
    firstName: 'János',
    lastName: 'Varga',
    email: 'varga@vagyok.hu',
    password: '$2a$10$fVJYmQ6Srhkeuo1fGxWVC.zENcBSsSAn6hTICbuhcFdn8yeHqzyfi',
    role: 'user',
  };

  const request = supertest(app);

  const user1 = new User(userData1);
  const user2 = new User(userData2);

  let token;

  beforeAll(async done => {
    testdb();
    await user1.save(userData1);
    await user2.save(userData2);

    request
      .post('/api/login')
      .send({
        email: 'mezei@vagyok.hu',
        password: '234567891',
      })
      .end((err, response) => {
        token = response.body.token;
        console.log(token);

        done();
      });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await testdb.close();
  });

  it('should return 200 status code and "User was deleted"', async done => {
    const userFromDatabase = await User.findOne({ email: 'mezei@vagyok.hu' });
    console.log(userFromDatabase.id);

    const response = await request
      .delete(`/api/users/${userFromDatabase.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User was deleted');
    done();
  });

  // it('should return 401 status code and "Invalid token" if token is invalid', async done => {
  //   const userFromDatabase = await User.findOne({ email: 'varga@vagyok.hu' });

  //   const badToken =
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGVlZDU3YTU2NWE1NDM3MDQ1ZWJhMWUiLCJmaXJzdE5hbWUiOiJKb2UiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MjY4OTAxMDR9.a4umq9bGVvdCz5gRpeUjy7gw2Jpkldktjmksyjlkdi';

  //   const response = await request
  //     .delete(`/api/users/${userFromDatabase.id}`)
  //     .set('Authorization', `Bearer ${badToken}`);

  //   expect(response.status).toBe(401);
  //   expect(response.text).toBe('Invalid token');
  //   done();
  // });

  // it('should return 401 status code and "Unauthorized" if unauthorized user (unexist token)', async done => {
  //   const userFromDatabase = await User.findOne({ email: 'varga@vagyok.hu' });

  //   const response = await request.delete(`/api/users/${userFromDatabase.id}`);

  //   expect(response.status).toBe(401);
  //   expect(response.text).toBe('Unauthorized');
  //   done();
  // });
});
