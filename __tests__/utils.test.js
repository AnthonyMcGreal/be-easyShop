const {
	formatUsersData,
	formatMiscItemsData,
	formatIngredientsData,
	formatRecipeData,
	formatMealPlansData
} = require('../db/utils/data_manipulation')
const { createJWT } = require('../mvcs/jwt')

describe('tests for formatUsersData', () => {
	it('should not mutate the original data', () => {
		const input = [
			{
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				email: 'anthonymcgreal@hotmail.co.uk',
				password: 'TestPassword1'
			},
			{
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6e',
				email: 'sol@outlook.co.uk',
				password: 'TestPassword2'
			},
			{
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6f',
				email: 'david@outlook.co.uk',
				password: 'TestPassword3'
			}
		]

		const input2 = [
			{
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				email: 'anthonymcgreal@hotmail.co.uk',
				password: 'TestPassword1'
			},
			{
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6e',
				email: 'sol@outlook.co.uk',
				password: 'TestPassword2'
			},
			{
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6f',
				email: 'david@outlook.co.uk',
				password: 'TestPassword3'
			}
		]

		formatUsersData(input)

		expect(input).toEqual(input2)
	})
	it('should return an array of nested arrays from an object', () => {
		const input = [
			{
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				email: 'anthonymcgreal@hotmail.co.uk',
				password: 'TestPassword1'
			},
			{
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6e',
				email: 'sol@outlook.co.uk',
				password: 'TestPassword2'
			}
		]

		const output = [
			[
				'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				'anthonymcgreal@hotmail.co.uk',
				'TestPassword1'
			],
			[
				'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6e',
				'sol@outlook.co.uk',
				'TestPassword2'
			]
		]

		expect(formatUsersData(input)).toEqual(output)
	})
	it('should return a new array', () => {
		const input = [
			{
				name: 'Anthony',
				username: 'MVPAnt',
				avatar_url: `https://gravatar.com/avatar/fc25b0331ed2cfed2ca5a32452705da2?s=400&d=robohash&r=x`
			},
			{
				name: 'Solveiga',
				username: 'Sole89',
				avatar_url: `https://gravatar.com/avatar/8210d12499010fbb4e14237d1a8f6cb1?s=400&d=robohash&r=x`
			}
		]

		expect(formatUsersData(input)).not.toBe(input)
	})
})

describe('tests for formatMiscItemsData', () => {
	it('should not mutate the original data', () => {
		const input = [
			{
				name: 'Toothpaste',
				user: 'Anthony',
				category: 'Hygiene'
			},
			{
				name: 'Toilet Paper',
				user: 'Solveiga',
				category: 'Hygiene'
			},
			{
				name: 'Washing up liquid',
				user: 'David',
				category: 'Cleaning'
			}
		]

		const input2 = [
			{
				name: 'Toothpaste',
				user: 'Anthony',
				category: 'Hygiene'
			},
			{
				name: 'Toilet Paper',
				user: 'Solveiga',
				category: 'Hygiene'
			},
			{
				name: 'Washing up liquid',
				user: 'David',
				category: 'Cleaning'
			}
		]

		formatMiscItemsData(input)

		expect(input).toEqual(input2)
	})
	it('should return an array with nested arrays from an object', () => {
		const input = [
			{
				name: 'Toothpaste',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				category: 'Hygiene'
			},
			{
				name: 'Toilet Paper',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6e',
				category: 'Hygiene'
			},
			{
				name: 'Washing up liquid',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6f',
				category: 'Cleaning'
			}
		]

		const output = [
			['Toothpaste', '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', 'Hygiene'],
			['Toilet Paper', '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6e', 'Hygiene'],
			['Washing up liquid', '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6f', 'Cleaning']
		]

		expect(formatMiscItemsData(input)).toEqual(output)
	})
	it('should return a new array', () => {
		const input = [
			{
				name: 'Toothpaste',
				user: 'Anthony',
				category: 'Hygiene'
			},
			{
				name: 'Toilet Paper',
				user: 'Solveiga',
				category: 'Hygiene'
			},
			{
				name: 'Washing up liquid',
				user: 'David',
				category: 'Cleaning'
			}
		]

		expect(formatMiscItemsData(input)).not.toBe(input)
	})
})

describe('tests for formatIngredientsData', () => {
	it('should not mutate the original data', () => {
		const input = [
			{
				name: 'Mince',
				unit_of_measurement: 'grams',
				storage_type: 'chilled',
				user: 'Anthony'
			},
			{
				name: 'Spaghetti',
				unit_of_measurement: 'grams',
				storage_type: 'Ambient',
				user: 'Solveiga'
			}
		]

		const input2 = [
			{
				name: 'Mince',
				unit_of_measurement: 'grams',
				storage_type: 'chilled',
				user: 'Anthony'
			},
			{
				name: 'Spaghetti',
				unit_of_measurement: 'grams',
				storage_type: 'Ambient',
				user: 'Solveiga'
			}
		]

		formatIngredientsData(input)

		expect(input).toEqual(input2)
	})
	it('should return an array with nested arrays from an object', () => {
		const input = [
			{
				name: 'Mince',
				unit_of_measurement: 'grams',
				storage_type: 'chilled',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
			},
			{
				name: 'Spaghetti',
				unit_of_measurement: 'grams',
				storage_type: 'Ambient',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6e'
			}
		]

		const output = [
			['Mince', 'grams', 'chilled', '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'],
			['Spaghetti', 'grams', 'Ambient', '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6e']
		]

		expect(formatIngredientsData(input)).toEqual(output)
	})
	it('should return a new array', () => {
		const input = [
			{
				name: 'Mince',
				unit_of_measurement: 'grams',
				storage_type: 'chilled',
				user: 'Anthony'
			},
			{
				name: 'Spaghetti',
				unit_of_measurement: 'grams',
				storage_type: 'Ambient',
				user: 'Solveiga'
			}
		]

		expect(formatIngredientsData(input)).not.toBe(input)
	})
})

describe('test for formatRecipeData', () => {
	it('should not mutate the original data', () => {
		const input = [
			{
				name: 'Spag Bol',
				user: 'Anthony',
				link: '',
				ingredients: 'Mince',
				ingredient_quantity: 400,
				portions: 2
			},
			{
				name: 'Spag Bol',
				user: 'Anthony',
				link: '',
				ingredients: 'Spaghetti',
				ingredient_quantity: 80,
				portions: 2
			}
		]

		const input2 = [
			{
				name: 'Spag Bol',
				user: 'Anthony',
				link: '',
				ingredients: 'Mince',
				ingredient_quantity: 400,
				portions: 2
			},
			{
				name: 'Spag Bol',
				user: 'Anthony',
				link: '',
				ingredients: 'Spaghetti',
				ingredient_quantity: 80,
				portions: 2
			}
		]

		formatRecipeData(input)

		expect(input).toEqual(input2)
	})
	it('should return an array with nested arrays from an object', () => {
		const input = [
			{
				name: 'Spag Bol',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				link: '',
				ingredients: 'Mince',
				ingredient_quantity: 400,
				portions: 2
			},
			{
				name: 'Spag Bol',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				link: '',
				ingredients: 'Spaghetti',
				ingredient_quantity: 80,
				portions: 2
			}
		]

		const output = [
			['Spag Bol', '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', '', 'Mince', 400, 2],
			[
				'Spag Bol',
				'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				'',
				'Spaghetti',
				80,
				2
			]
		]

		expect(formatRecipeData(input)).toEqual(output)
	})
	it('should return a new Array', () => {
		const input = [
			{
				name: 'Spag Bol',
				user: 'Anthony',
				link: '',
				ingredients: 'Mince',
				ingredient_quantity: 400,
				portions: 2
			},
			{
				name: 'Spag Bol',
				user: 'Anthony',
				link: '',
				ingredients: 'Spaghetti',
				ingredient_quantity: 80,
				portions: 2
			}
		]

		expect(formatRecipeData(input)).not.toBe(input)
	})
})

describe('tests for formatMealPlansData', () => {
	it('should not mutate the original data', () => {
		const input = [
			{
				name: 'Week 1 test',
				username: 'Anthony',
				recipes: [
					{ Wednesday: ['Spag_Bol', 'Chilli'] },
					{ Thursday: ['Porridge', 'Sandwiches'] },
					{ Friday: ['Porridge', 'Curry'] }
				]
			}
		]

		const input2 = [
			{
				name: 'Week 1 test',
				username: 'Anthony',
				recipes: [
					{ Wednesday: ['Spag_Bol', 'Chilli'] },
					{ Thursday: ['Porridge', 'Sandwiches'] },
					{ Friday: ['Porridge', 'Curry'] }
				]
			}
		]

		formatMealPlansData(input)

		expect(input).toEqual(input2)
	})
	it('should return array with nested arrays from an object', () => {
		const input = [
			{
				name: 'Week 1 test',
				user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				recipes: [
					{ Wednesday: ['Spag_Bol', 'Chilli'] },
					{ Thursday: ['Porridge', 'Sandwiches'] },
					{ Friday: ['Porridge', 'Curry'] }
				]
			}
		]

		const output = [
			[
				'Week 1 test',
				'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
				'[{"Wednesday":["Spag_Bol","Chilli"]},{"Thursday":["Porridge","Sandwiches"]},{"Friday":["Porridge","Curry"]}]'
			]
		]

		expect(formatMealPlansData(input)).toEqual(output)
	})
	it('should return a new array', () => {
		const input = [
			{
				name: 'Week 1 test',
				username: 'Anthony',
				recipes: [
					{ Wednesday: ['Spag_Bol', 'Chilli'] },
					{ Thursday: ['Porridge', 'Sandwiches'] },
					{ Friday: ['Porridge', 'Curry'] }
				]
			}
		]

		expect(formatMealPlansData).not.toBe(input)
	})
})

describe('test jwt creation', () => {
	it('should return a valid jwt', () => {
		const token = createJWT(
			'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
			'anthonymcgreal@hotmail.co.uk'
		)

		expect(token).toEqual(
			expect.stringMatching(
				/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
			)
		)
	})
})
