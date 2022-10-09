const db = require('../db/connection.js')
const testData = require('../db/data/test_data/index')
const { seed } = require('../db/seeds/seed')
const app = require('../app')
const request = require('supertest')
const bcrypt = require('bcryptjs')
const { createJWT } = require('../mvcs/jwt.js')

const token = createJWT('anthonymcgreal@hotmail.co.uk', 'testPa$$word')

beforeEach(async () => seed(testData))
afterAll(() => db.end())

describe('GET - /api/users/:user_id', () => {
	it('should respond with a user object', () => {
		return request(app)
			.get('/api/user/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
			.auth(token, { type: 'bearer' })
			.expect(200)
			.then(({ body }) => {
				expect(body.user[0]).toHaveProperty('user_id')
				expect(body.user[0]).toHaveProperty('email')
				expect(body.user[0]).toHaveProperty('password')
			})
	})
	it('should respond with 404 if user doesnt exist', () => {
		return request(app)
			.get('/api/user/8b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
			.auth(token, { type: 'bearer' })
			.expect(404)
	})
})

describe('POST - /api/user', () => {
	it('should post a new user', () => {
		const postUser = {
			email: 'test@email.com',
			password: 'demoPassword'
		}
		return request(app)
			.post('/api/user')
			.send(postUser)
			.expect(201)
			.then(async ({ body }) => {
				expect(body.user.email).toEqual(postUser.email)
				expect(body.user).toHaveProperty('user_id')
				let passwordCheck = await bcrypt.compare(
					postUser.password,
					body.user.password
				)
				expect(passwordCheck).toEqual(true)
			})
	})
	it('should return a 400 if email is already registered', () => {
		const postUser = {
			email: 'anthony@email.com',
			password: 'testPa$$word'
		}
		return request(app)
			.post('/api/user')
			.send(postUser)
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toEqual('Bad Request')
			})
	})
	it('should return a 400 if email field is missing', () => {
		const postUser = {
			password: 'testpassword'
		}
		return request(app)
			.post('/api/user')
			.send(postUser)
			.auth(token, { type: 'bearer' })
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toEqual('Bad Request')
			})
	})
	it('should return a 400 if password field is missing', () => {
		const postUser = {
			email: 'test@email.com'
		}
		return request(app)
			.post('/api/user')
			.send(postUser)
			.auth(token, { type: 'bearer' })
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toEqual('Bad Request')
			})
	})
})

describe('DELETE - /api/user/:user_id', () => {
	it('should delete a user matching the param endpoint', () => {
		return request(app)
			.delete('/api/user/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
			.auth(token, { type: 'bearer' })
			.expect(204)
	})
	it('should return 404 if username doesnt exist', () => {
		return request(app)
			.delete('/api/user/8b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
			.auth(token, { type: 'bearer' })
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).toEqual('Not Found')
			})
	})
})

describe('GET - /api/miscItem/:user_id/:miscItem_id', () => {
	it('should respond with a miscItem object that matches the param', () => {
		return request(app)
			.get('/api/miscItem/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d/1')
			.auth(token, { type: 'bearer' })
			.expect(200)
			.then(({ body }) => {
				expect(body.miscItem[0]).toHaveProperty('name')
				expect(body.miscItem[0]).toHaveProperty('user_id')
				expect(body.miscItem[0]).toHaveProperty('category')
				expect(body.miscItem[0].name).toEqual('Toothpaste')
				expect(body.miscItem[0].user_id).toEqual(
					'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
				)
				expect(body.miscItem[0].category).toEqual('Hygiene')
			})
	})
	it('should respond a 404 if item doesnt exist', () => {
		return request(app)
			.get('/api/miscItem/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d/99')
			.auth(token, { type: 'bearer' })
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).toEqual('Not Found')
			})
	})
	it('should respond with 400 if input isnt valid', () => {
		return request(app)
			.get('/api/miscItem/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d/NaN')
			.auth(token, { type: 'bearer' })
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toEqual('Bad Request')
			})
	})
})

describe('GET - /api/miscItem/:user_id', () => {
	it('gets all misc items available', () => {
		return request(app)
			.get('/api/miscItem/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
			.auth(token, { type: 'bearer' })
			.expect(200)
			.then(({ body }) => {
				expect(body.miscItems.length).toEqual(3)
				body.miscItems.forEach(miscItem => {
					expect(miscItem).toHaveProperty('item_id')
					expect(miscItem).toHaveProperty('name')
					expect(miscItem).toHaveProperty('user_id')
					expect(miscItem).toHaveProperty('category')
					expect(miscItem.user_id).toEqual(
						'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
					)
				})
			})
	})
})

describe('POST - /api/miscItem', () => {
	it('should return an item once posted', () => {
		const newItem = {
			name: 'Kitchen Roll',
			user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
			category: 'Cleaning'
		}
		return request(app)
			.post('/api/miscItem')
			.send(newItem)
			.auth(token, { type: 'bearer' })
			.expect(201)
			.then(({ body }) => {
				expect(body.miscItem).toHaveProperty('name')
				expect(body.miscItem).toHaveProperty('user_id')
				expect(body.miscItem).toHaveProperty('category')
				expect(body.miscItem.name).toEqual('Kitchen Roll')
				expect(body.miscItem.user_id).toEqual(
					'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
				)
				expect(body.miscItem.category).toEqual('Cleaning')
			})
	})
	it('should return 400 if the name field is missing', () => {
		const newItem = {
			name: '',
			user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
			category: 'Cleaning'
		}

		return request(app)
			.post('/api/miscItem')
			.send(newItem)
			.auth(token, { type: 'bearer' })
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toEqual('Bad Request')
			})
	})
	it('should return 400 if the username field is missing', () => {
		const newItem = {
			name: 'Kitchen Roll',
			user_id: '',
			category: 'Cleaning'
		}

		return request(app)
			.post('/api/miscItem')
			.send(newItem)
			.auth(token, { type: 'bearer' })
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toEqual('Bad Request')
			})
	})
	it('should return 400 if the category field is missing', () => {
		const newItem = {
			name: 'Kitchen Roll',
			user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
			category: ''
		}

		return request(app)
			.post('/api/miscItem')
			.send(newItem)
			.auth(token, { type: 'bearer' })
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toEqual('Bad Request')
			})
	})
})

describe('DELETE - /api/miscItem/:miscItem_id', () => {
	it('deletes a miscItem matching the param endpoint', () => {
		return request(app)
			.delete('/api/miscItem/1')
			.auth(token, { type: 'bearer' })
			.expect(204)
	})
	it('returns a 404 is item doesnt exist', () => {
		return request(app)
			.delete('/api/miscItem/99')
			.auth(token, { type: 'bearer' })
			.expect(404)
	})
})

describe('GET - /api/ingredients/:user_id', () => {
	it('should return an array of all ingredient objects', () => {
		return request(app)
			.get('/api/ingredients/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
			.auth(token, { type: 'bearer' })
			.expect(200)
			.then(({ body }) => {
				body.ingredients.forEach(ingredient => {
					expect(ingredient).toHaveProperty('ingredient_id')
					expect(ingredient).toHaveProperty('name')
					expect(ingredient).toHaveProperty('unit_of_measurement')
					expect(ingredient).toHaveProperty('storage_type')
					expect(ingredient).toHaveProperty('user_id')
					expect(ingredient.user_id).toEqual(
						'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
					)
				})
			})
	})
})

describe('POST - /api/ingredients', () => {
	it('should return an ingredient object once posted to db', () => {
		const newIngredient = {
			name: 'Onion',
			unit_of_measurement: 'Individual',
			storage_type: 'Ambient',
			user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
		}

		return request(app)
			.post('/api/ingredients')
			.send(newIngredient)
			.auth(token, { type: 'bearer' })
			.expect(201)
			.then(({ body }) => {
				expect(body.ingredient).toHaveProperty('ingredient_id')
				expect(body.ingredient).toHaveProperty('name')
				expect(body.ingredient).toHaveProperty('unit_of_measurement')
				expect(body.ingredient).toHaveProperty('storage_type')
				expect(body.ingredient).toHaveProperty('user_id')
				expect(body.ingredient.name).toEqual(newIngredient.name)
				expect(body.ingredient.unit_of_measurement).toEqual(
					newIngredient.unit_of_measurement
				)
				expect(body.ingredient.storage_type).toEqual(newIngredient.storage_type)
				expect(body.ingredient.user_id).toEqual(newIngredient.user_id)
				expect(body.ingredient.ingredient_id).toEqual(6)
			})
	})
	it('should return a 400 if ingredient is missing a name', () => {
		const newIngredient = {
			name: '',
			unit_of_measurement: 'Individual',
			storage_type: 'Ambient',
			user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
		}

		return request(app)
			.post('/api/ingredients')
			.send(newIngredient)
			.auth(token, { type: 'bearer' })
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toEqual('Bad Request')
			})
	})
	it('should return a 400 if ingredient is missing a UoM', () => {
		const newIngredient = {
			name: 'Onion',
			unit_of_measurement: '',
			storage_type: 'Ambient',
			user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
		}

		return request(app)
			.post('/api/ingredients')
			.send(newIngredient)
			.auth(token, { type: 'bearer' })
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toEqual('Bad Request')
			})
	})
	it('should return a 400 if ingredient is missing a storage type', () => {
		const newIngredient = {
			name: 'Onion',
			unit_of_measurement: 'Individual',
			storage_type: '',
			user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
		}

		return request(app)
			.post('/api/ingredients')
			.send(newIngredient)
			.auth(token, { type: 'bearer' })
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toEqual('Bad Request')
			})
	})
	it('should return a 400 if ingredient is missing a user_id', () => {
		const newIngredient = {
			name: 'Onion',
			unit_of_measurement: 'Individual',
			storage_type: 'Ambient',
			user_id: ''
		}

		return request(app)
			.post('/api/ingredients')
			.send(newIngredient)
			.auth(token, { type: 'bearer' })
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toEqual('Bad Request')
			})
	})
})

describe('PATCH - /api/ingredients/:ingredient_id', () => {
	it('should update an ingredients name', () => {
		const updatedObject = {
			name: 'Mince Meat',
			unit_of_measurement: 'grams',
			storage_type: 'chilled',
			user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
		}

		return request(app)
			.patch('/api/ingredients/1')
			.send(updatedObject)
			.auth(token, { type: 'bearer' })
			.expect(200)
			.then(({ body }) => {
				expect(body.ingredient.ingredient_id).toEqual(1)
				expect(body.ingredient.user_id).toEqual(updatedObject.user_id)
				expect(body.ingredient.unit_of_measurement).toEqual(
					updatedObject.unit_of_measurement
				)
				expect(body.ingredient.storage_type).toEqual(updatedObject.storage_type)
				expect(body.ingredient.user_id).toEqual(updatedObject.user_id)
			})
	})
	it('should update an ingredients UoM', () => {
		const updatedObject = {
			name: 'Mince',
			unit_of_measurement: 'ltr',
			storage_type: 'chilled',
			user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
		}

		return request(app)
			.patch('/api/ingredients/1')
			.send(updatedObject)
			.auth(token, { type: 'bearer' })
			.expect(200)
			.then(({ body }) => {
				expect(body.ingredient.ingredient_id).toEqual(1)
				expect(body.ingredient.user_id).toEqual(updatedObject.user_id)
				expect(body.ingredient.unit_of_measurement).toEqual(
					updatedObject.unit_of_measurement
				)
				expect(body.ingredient.storage_type).toEqual(updatedObject.storage_type)
				expect(body.ingredient.user_id).toEqual(updatedObject.user_id)
			})
	})
	it('should update an ingredients storage_type', () => {
		const updatedObject = {
			name: 'Mince',
			unit_of_measurement: 'grams',
			storage_type: 'Ambient',
			user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
		}

		return request(app)
			.patch('/api/ingredients/1')
			.send(updatedObject)
			.auth(token, { type: 'bearer' })
			.expect(200)
			.then(({ body }) => {
				expect(body.ingredient.ingredient_id).toEqual(1)
				expect(body.ingredient.user_id).toEqual(updatedObject.user_id)
				expect(body.ingredient.unit_of_measurement).toEqual(
					updatedObject.unit_of_measurement
				)
				expect(body.ingredient.storage_type).toEqual(updatedObject.storage_type)
				expect(body.ingredient.user_id).toEqual(updatedObject.user_id)
			})
	})
	it('should return a 404 if ingredient isnt found', () => {
		const updatedObject = {
			name: 'Mince Meat',
			unit_of_measurement: 'grams',
			storage_type: 'chilled',
			user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
		}

		return request(app)
			.patch('/api/ingredients/99')
			.send(updatedObject)
			.auth(token, { type: 'bearer' })
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).toEqual('Not Found')
			})
	})
})

describe('DELETE - /api/ingredients/:ingredients_id', () => {
	it('deletes an ingredient matching the param endpoint', () => {
		return request(app)
			.delete('/api/ingredients/1')
			.auth(token, { type: 'bearer' })
			.expect(204)
	})
	it('returns a 404 if ingredient doesnt exits', () => {
		return request(app)
			.delete('/api/ingredients/100')
			.auth(token, { type: 'bearer' })
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).toEqual('Not Found')
			})
	})
})

describe('GET - /api/recipe/:user_id', () => {
	it('should return a list of all recipes', () => {
		return request(app)
			.get('/api/recipe/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
			.auth(token, { type: 'bearer' })
			.expect(200)
			.then(({ body }) => {
				expect(body.recipes.length).toEqual(2)
				body.recipes.forEach(recipe => {
					expect(recipe).toHaveProperty('recipe_name')
					expect(recipe).toHaveProperty('portions')
					expect(recipe.user_id).toEqual('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
					expect(Object.keys(recipe).length).toEqual(3)
				})
			})
	})
})

describe('GET - /api/recipe/:user_id/:name', () => {
	it('should return a recipe with ingredient info', () => {
		return request(app)
			.get(
				'/api/recipe/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d/Spag_Bol_no_mushrooms'
			)
			.auth(token, { type: 'bearer' })
			.expect(200)
			.then(({ body }) => {
				body.forEach(recipe => {
					expect(recipe).toHaveProperty('recipe_name')
					expect(recipe).toHaveProperty('link')
					expect(recipe).toHaveProperty('name')
					expect(recipe).toHaveProperty('ingredient_quantity')
					expect(recipe).toHaveProperty('unit_of_measurement')
					expect(recipe).toHaveProperty('portions')
					expect(recipe).toHaveProperty('storage_type')
					expect(recipe.user_id).toEqual('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
				})
			})
	})
	it('should return a 404 if the recipe doesnt exist', () => {
		return request(app)
			.get('/api/recipe/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d/Not a recipe')
			.auth(token, { type: 'bearer' })
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).toEqual('Not Found')
			})
	})
})

describe('POST - /api/recipe', () => {
	it('should post a new recipe to the db and return all new entries', () => {
		const newRecipe = [
			{
				recipe_name: 'Spag_Bol_2',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				link: '',
				ingredients: 1,
				ingredient_quantity: 400,
				portions: 2
			},
			{
				recipe_name: 'Spag_Bol_2',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				link: '',
				ingredients: 2,
				ingredient_quantity: 80,
				portions: 2
			},
			{
				recipe_name: 'Spag_Bol_2',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				link: '',
				ingredients: 3,
				ingredient_quantity: 1,
				portions: 2
			},
			{
				recipe_name: 'Spag_Bol_2',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				link: '',
				ingredients: 4,
				ingredient_quantity: 100,
				portions: 2
			}
		]

		return request(app)
			.post('/api/recipe')
			.send(newRecipe)
			.auth(token, { type: 'bearer' })
			.expect(201)
			.then(({ body }) => {
				expect(body.recipe).toEqual(newRecipe)
			})
	})
})

describe('PATCH - /api/recipe/:name', () => {
	it('should update a recipe when passed a modified recipe', () => {
		const testRecipeUpdate = [
			{
				recipe_id: 1,
				name: 'Test Recipe update',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				link: '',
				ingredients: 1,
				ingredient_quantity: 400,
				portions: 2
			},
			{
				recipe_id: 2,
				name: 'Test Recipe update',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				link: '',
				ingredients: 2,
				ingredient_quantity: 1,
				portions: 2
			},
			{
				recipe_id: 3,
				name: 'Test Recipe update',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				link: '',
				ingredients: 3,
				ingredient_quantity: 50,
				portions: 2
			},
			{
				recipe_id: 4,
				name: 'Test Recipe update',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				link: '',
				ingredients: 4,
				ingredient_quantity: 1,
				portions: 2
			}
		]

		const expectedResult = [
			{
				recipe_id: 1,
				recipe_name: 'Test Recipe update',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				link: '',
				ingredients: 1,
				ingredient_quantity: 400,
				portions: 2
			},
			{
				recipe_id: 2,
				recipe_name: 'Test Recipe update',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				link: '',
				ingredients: 2,
				ingredient_quantity: 1,
				portions: 2
			},
			{
				recipe_id: 3,
				recipe_name: 'Test Recipe update',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				link: '',
				ingredients: 3,
				ingredient_quantity: 50,
				portions: 2
			},
			{
				recipe_id: 4,
				recipe_name: 'Test Recipe update',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				link: '',
				ingredients: 4,
				ingredient_quantity: 1,
				portions: 2
			}
		]

		return request(app)
			.patch('/api/recipe/Spag_Bol_no_mushrooms')
			.send(testRecipeUpdate)
			.auth(token, { type: 'bearer' })
			.expect(200)
			.then(({ body }) => {
				expect(body.recipe).toEqual(expectedResult)
			})
	})
})

describe('DELETE - /api/recipe/:user_id/:name', () => {
	it('deletes a recipe that matches the parametric name', () => {
		return request(app)
			.delete('/api/recipe/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d/Spag_Bol')
			.auth(token, { type: 'bearer' })
			.expect(204)
	})
	it('responds with 404 if recipe isnt found', () => {
		return request(app)
			.delete('/api/recipe/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d/Not_a_Recipe')
			.auth(token, { type: 'bearer' })
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).toEqual('Not Found')
			})
	})
})

describe('GET - /api/mealPlans/:user_id', () => {
	it('should return a list of available mealPlans', () => {
		return request(app)
			.get('/api/mealPlans/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
			.auth(token, { type: 'bearer' })
			.expect(200)
			.then(({ body }) => {
				body.mealPlans.forEach(meal => {
					expect(meal).toHaveProperty('user_id')
					expect(meal).toHaveProperty('name')
					expect(meal.user_id).toEqual('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
				})
			})
	})
})

describe('GET - /api/mealPlans/:user_id/:mealPlanName', () => {
	it('should return an array of all meals in a given meal plan', () => {
		return request(app)
			.get('/api/mealPlans/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d/Week 1 test')
			.auth(token, { type: 'bearer' })
			.expect(200)
			.then(({ body }) => {
				body.meals.forEach(meal => {
					expect(meal.name).toEqual('Week 1 test')
					expect(meal).toHaveProperty('user_id')
					expect(meal).toHaveProperty('recipes')
				})
			})
	})
	it('should return a 404 if meal doesnt exit', () => {
		return request(app)
			.get('/api/mealPlans/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d/notAMealPlan')
			.auth(token, { type: 'bearer' })
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).toEqual('Not Found')
			})
	})
})

describe('POST - /api/mealPlans', () => {
	it('should post a new recipe', () => {
		const testMealPlan = [
			{
				name: 'Week 2 test',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				recipes: [
					{ Monday: ['Spag_Bol', 'Chilli'] },
					{ Tuesday: ['Porridge', 'Sandwiches'] },
					{ Wednesday: ['Porridge', 'Curry'] }
				]
			}
		]

		const result = [
			{
				template_id: 2,
				name: 'Week 2 test',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				recipes: [
					{ Monday: ['Spag_Bol', 'Chilli'] },
					{ Tuesday: ['Porridge', 'Sandwiches'] },
					{ Wednesday: ['Porridge', 'Curry'] }
				]
			}
		]

		return request(app)
			.post('/api/mealPlans')
			.send(testMealPlan)
			.auth(token, { type: 'bearer' })
			.expect(201)
			.then(({ body }) => {
				expect(body.mealPlan).toEqual(result)
			})
	})
})

describe('PATCH - /api/mealPlans/:user_id/:mealPlanName', () => {
	it('should update a mealPlan when passed a modified mealPlan', () => {
		const testMealPlan = {
			template_id: 1,
			name: 'Week 2 test',
			user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
			recipes: [
				{ Monday: ['Spag_Bol', 'Chilli'] },
				{ Tuesday: ['Porridge', 'Sandwiches'] },
				{ Wednesday: ['Porridge', 'Curry'] }
			]
		}

		const ExpectedMealPlan = [
			{
				template_id: 1,
				name: 'Week 2 test',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				recipes: [
					{ Monday: ['Spag_Bol', 'Chilli'] },
					{ Tuesday: ['Porridge', 'Sandwiches'] },
					{ Wednesday: ['Porridge', 'Curry'] }
				]
			}
		]

		return request(app)
			.patch('/api/mealPlans/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d/Week 1 test')
			.send(testMealPlan)
			.auth(token, { type: 'bearer' })
			.expect(200)
			.then(({ body }) => {
				expect(body.mealPlan).toEqual(ExpectedMealPlan)
			})
	})
})

describe('DELETE - /api/mealPlans/:user_id/:mealPlanName', () => {
	it('should remove a mealPlan by name', () => {
		return request(app)
			.delete('/api/mealPlans/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d/Week 1 test')
			.auth(token, { type: 'bearer' })
			.expect(204)
	})
	it('responds with 404 if recipe isnt found', () => {
		return request(app)
			.delete(
				'/api/mealPlans/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d/Not a recipe'
			)
			.auth(token, { type: 'bearer' })
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).toEqual('Not Found')
			})
	})
})

describe('POST - /api/shoppingList/:user_id', () => {
	it('should return a shoppingList of ingredients when provided with recipes and misc items', () => {
		const requestData = {
			miscItems: {
				Toothpaste: 1,
				'Washing up liquid': 3
			},
			recipes: {
				Spag_Bol: 2,
				Spag_Bol_no_mushrooms: 1
			}
		}

		const resultData = {
			Ambient: [
				{ name: 'Spaghetti', quantity: 240, unit_of_measurement: 'grams' },
				{
					name: 'Bolognese sauce',
					quantity: 3,
					unit_of_measurement: 'Individual'
				}
			],
			Chilled: [
				{ name: 'Mince', quantity: 1200, unit_of_measurement: 'grams' }
			],
			Cleaning: [{ name: 'Washing up liquid', quantity: 3 }],
			Hygiene: [{ name: 'Toothpaste', quantity: 1 }],
			Produce: [
				{
					name: 'Button mushrooms',
					quantity: 200,
					unit_of_measurement: 'grams'
				}
			]
		}

		return request(app)
			.post('/api/shoppingList/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
			.send(requestData)
			.auth(token, { type: 'bearer' })
			.expect(200)
			.then(({ body }) => {
				expect(body.shoppingList).toEqual(resultData)
			})
	})

	it('it ignores recipes and misc items that dont exist', () => {
		const requestData = {
			miscItems: {
				'': 1,
				'Washing up liquid': 3
			},
			recipes: {
				'Recipe doesnt exist': 2,
				Spag_Bol_no_mushrooms: 1
			}
		}

		const resultData = {
			Ambient: [
				{ name: 'Spaghetti', quantity: 80, unit_of_measurement: 'grams' },
				{
					name: 'Bolognese sauce',
					quantity: 1,
					unit_of_measurement: 'Individual'
				}
			],
			Chilled: [{ name: 'Mince', quantity: 400, unit_of_measurement: 'grams' }],
			Cleaning: [{ name: 'Washing up liquid', quantity: 3 }]
		}

		return request(app)
			.post('/api/shoppingList/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
			.send(requestData)
			.auth(token, { type: 'bearer' })
			.expect(200)
			.then(({ body }) => {
				expect(body.shoppingList).toEqual(resultData)
			})
	})
})

describe('POST - login', () => {
	it('should return a 200 if the credentials are correct', () => {
		const testUser = {
			email: 'anthony@email.com',
			password: 'testPa$$word'
		}

		return request(app)
			.post('/api/login')
			.send(testUser)
			.expect(200)
			.then(result => {
				expect(result.header['set-cookie'][0]).toEqual(
					expect.stringMatching(
						/^jwt=[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*; Path=\/$/
					)
				)
				expect(result.body.msg).toEqual('Login successful')
				expect(result.body.email).toEqual('anthony@email.com')
				expect(result.body.user_id).toEqual(
					'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
				)
			})
	})

	it('should return a 401 if password is incorrect', () => {
		const testUser = {
			email: 'anthonymcgreal@hotmail.co.uk',
			password: 'wrongPassword'
		}

		return request(app)
			.post('/api/login')
			.send(testUser)
			.expect(401)
			.then(({ body }) => {
				expect(body.msg).toEqual('Login failed')
			})
	})

	it('should return a 400 if email is missing', () => {
		const testUser = {
			email: '',
			password: 'wrongPassword'
		}

		return request(app)
			.post('/api/login')
			.send(testUser)
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toEqual('Bad Request')
			})
	})

	it('should return a 401 if email doesnt match an exiting user', () => {
		const testUser = {
			email: 'unknownUser',
			password: 'wrongPassword'
		}

		return request(app)
			.post('/api/login')
			.send(testUser)
			.expect(401)
			.then(({ body }) => {
				expect(body.msg).toEqual('Login failed')
			})
	})
})

describe('GET - /wake', () => {
	it('should wake up the backend and return a 200', () => {
		return request(app).get('/api//wake').expect(200)
	})
})
