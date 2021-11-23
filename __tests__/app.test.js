const db = require('../db/connection.js');
const testData = require('../db/data/test_data/index');
const { seed } = require('../db/seeds/seed');
const app = require('../app');
const request = require('supertest');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET - /api/users/:username', () => {
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

describe('POST - /api/user/:username', () => {
  it('should post a new user', () => {
    const postUser = {
      name: 'newName',
      username: 'username99',
      avatar_url: '',
    };
    return request(app)
      .post('/api/user/username99')
      .send(postUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.user.name).toEqual(postUser.name);
        expect(body.user.username).toEqual(postUser.username);
        expect(body.user.avatar_url).toEqual(postUser.avatar_url);
      });
  });
  it('should return a 400 if name field is missing', () => {
    const postUser = {
      name: undefined,
      username: 'username99',
      avatar_url: '',
    };
    return request(app)
      .post('/api/user/username99')
      .send(postUser)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual('Bad Request');
      });
  });
  it('should return a 400 if username field is missing', () => {
    const postUser = {
      name: 'newName',
      username: undefined,
      avatar_url: '',
    };
    return request(app)
      .post('/api/user/undefined')
      .send(postUser)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual('Bad Request');
      });
  });
});

describe('PATCH - /api/user/:username', () => {
  it('updates a users name', () => {
    const update = {
      name: 'updatedName',
      username: 'MVPAnt',
      avatar_url: '',
    };

    return request(app)
      .patch('/api/user/MVPAnt')
      .send(update)
      .expect(200)
      .then(({ body }) => {
        expect(body.user[0].name).toEqual(update.name);
        expect(body.user[0].username).toEqual(update.username);
        expect(body.user[0].avatar_url).toEqual(update.avatar_url);
      });
  });
  it('updates a users username', () => {
    const update = {
      name: 'Anthony',
      username: 'newUsername',
      avatar_url: '',
    };

    return request(app)
      .patch('/api/user/MVPAnt')
      .send(update)
      .expect(200)
      .then(({ body }) => {
        expect(body.user[0].name).toEqual(update.name);
        expect(body.user[0].username).toEqual(update.username);
        expect(body.user[0].avatar_url).toEqual(update.avatar_url);
      });
  });
  it('updates a users avatar_url', () => {
    const update = {
      name: 'Anthony',
      username: 'newUsername',
      avatar_url:
        'https://gravatar.com/avatar/8210d12499010fbb4e14237d1a8f6cb1?s=400&d=robohash&r=x',
    };

    return request(app)
      .patch('/api/user/MVPAnt')
      .send(update)
      .expect(200)
      .then(({ body }) => {
        expect(body.user[0].name).toEqual(update.name);
        expect(body.user[0].username).toEqual(update.username);
        expect(body.user[0].avatar_url).toEqual(update.avatar_url);
      });
  });
  it('returns a 404 if user doesnt exist', () => {
    const update = {
      name: 'Anthony',
      username: 'newUsername',
      avatar_url:
        'https://gravatar.com/avatar/8210d12499010fbb4e14237d1a8f6cb1?s=400&d=robohash&r=x',
    };

    return request(app)
      .patch('/api/user/NonExistentUser')
      .send(update)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual('Not Found');
      });
  });
  it('returns a 400 if the input is bad', () => {
    const update = {
      name: 12345,
      username: 'MVPAnt',
      avatar_url: '',
    };

    return request(app)
      .patch('/api/user/MVPAnt')
      .send(update)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual('Bad Request');
      });
  });
});

describe('DELETE - /api/user/:username', () => {
  it('should delete a user matching the param endpoint', () => {
    return request(app).delete('/api/user/MVPAnt').expect(204);
  });
  it('should return 404 if username doesnt exist', () => {
    return request(app)
      .delete('/api/user/iDontExist')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual('Not Found');
      });
  });
});

describe('GET - /api/miscItem/:miscItem_id', () => {
  it('should respond with a miscItem object that matches the param', () => {
    return request(app)
      .get('/api/miscItem/1')
      .expect(200)
      .then(({ body }) => {
        expect(body.miscItem[0]).toHaveProperty('name');
        expect(body.miscItem[0]).toHaveProperty('username');
        expect(body.miscItem[0]).toHaveProperty('category');
        expect(body.miscItem[0].name).toEqual('Toothpaste');
        expect(body.miscItem[0].username).toEqual('Anthony');
        expect(body.miscItem[0].category).toEqual('Hygiene');
      });
  });
  it('should respond a 404 if item doesnt exist', () => {
    return request(app)
      .get('/api/miscItem/99')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual('Not Found');
      });
  });
  it('should respond with 400 if input isnt valid', () => {
    return request(app)
      .get('/api/miscItem/NaN')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual('Bad Request');
      });
  });
});

describe('GET - /api/miscItem', () => {
  it('gets all misc items available', () => {
    return request(app)
      .get('/api/miscItem')
      .expect(200)
      .then(({ body }) => {
        expect(body.miscItems.length).toEqual(3);
        body.miscItems.forEach((miscItem) => {
          expect(miscItem).toHaveProperty('item_id');
          expect(miscItem).toHaveProperty('name');
          expect(miscItem).toHaveProperty('username');
          expect(miscItem).toHaveProperty('category');
        });
      });
  });
});

describe('POST - /api/miscItem', () => {
  it('should return an item once posted', () => {
    const newItem = {
      name: 'Kitchen Roll',
      username: 'Anthony',
      category: 'Cleaning',
    };
    return request(app)
      .post('/api/miscItem')
      .send(newItem)
      .expect(201)
      .then(({ body }) => {
        expect(body.miscItem).toHaveProperty('name');
        expect(body.miscItem).toHaveProperty('username');
        expect(body.miscItem).toHaveProperty('category');
        expect(body.miscItem.name).toEqual('Kitchen Roll');
        expect(body.miscItem.username).toEqual('Anthony');
        expect(body.miscItem.category).toEqual('Cleaning');
      });
  });
  it('should return 400 if the name field is missing', () => {
    const newItem = {
      name: '',
      username: 'Anthony',
      category: 'Cleaning',
    };

    return request(app)
      .post('/api/miscItem')
      .send(newItem)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual('Bad Request');
      });
  });
  it('should return 400 if the username field is missing', () => {
    const newItem = {
      name: 'Kitchen Roll',
      username: '',
      category: 'Cleaning',
    };

    return request(app)
      .post('/api/miscItem')
      .send(newItem)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual('Bad Request');
      });
  });
  it('should return 400 if the category field is missing', () => {
    const newItem = {
      name: 'Kitchen Roll',
      username: 'Anthony',
      category: '',
    };

    return request(app)
      .post('/api/miscItem')
      .send(newItem)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual('Bad Request');
      });
  });
});
