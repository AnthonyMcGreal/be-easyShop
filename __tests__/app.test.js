const db = require('../db/connection');
const testData = require('../db/data/test_data/index');
const { seed } = require('../db/seeds/seed');
const app = require('../app');
//supertest
const { response } = require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());
