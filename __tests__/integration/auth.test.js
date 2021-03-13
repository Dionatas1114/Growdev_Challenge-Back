import request from 'supertest';
import faker from 'faker/locale/pt_BR';
import app from '../../src/app';

import truncate from '../utils/truncate';

import User from '../../src/app/models/User';

describe('tests relatives to auth', () => {
  beforeEach(async () => {
    await truncate();
  });
  it('should create a user', async () => {
    expect.assertions(1);
    const user = await User.create({
      name: 'dionatas1',
      email: 'dionatas@gmail.com',
      password: '123',
    });

    // expect(user.email).toBe('dionatas@gmail.com');
    expect(user).toHaveProperty('email');
  });

  it('should create account', async () => {
    expect.assertions(1);
    const user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await request(app).post('/user').send(user);

    expect(response.status).toBe(201);
  });

  it('should bringa all the users from the DB', async () => {
    expect.assertions(1);
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
  });
});
