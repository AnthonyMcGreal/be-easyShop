const db = require('../db/connection.js');
const testData = require('../db/data/test_data/index');
const { seed } = require('../db/seeds/seed');
const app = require('../app');
const request = require('supertest');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET - /users/:username', () => {
  it('should respond with a user object', () => {
    return request(app)
      .get('/api/user/MVPAnt')
      .expect(200)
      .then(({ body }) => {
        expect(body.user[0]).toHaveProperty('username');
        expect(body.user[0]).toHaveProperty('avatar_url');
        expect(body.user[0]).toHaveProperty('name');
      });
  });
  it('should respond with 404 if user doesnt exist', () => {
    return request(app).get('/api/user/unknownUser').expect(404);
  });
});
