const {
  formatUsersData,
  formatMiscItemsData,
  formatIngredientsData,
  formatRecipeData,
} = require('../db/utils/data_manipulation');

describe('tests for formatUsersData', () => {
  it('should not mutate the original data', () => {
    const input = [
      {
        name: 'Anthony',
        username: 'MVPAnt',
        avatar_url: `https://gravatar.com/avatar/fc25b0331ed2cfed2ca5a32452705da2?s=400&d=robohash&r=x`,
      },
      {
        name: 'Solveiga',
        username: 'Sole89',
        avatar_url: `https://gravatar.com/avatar/8210d12499010fbb4e14237d1a8f6cb1?s=400&d=robohash&r=x`,
      },
      {
        name: 'David',
        username: 'Toodles',
        avatar_url: `https://gravatar.com/avatar/c65c3f695e08d1250792bebd265065af?s=400&d=monsterid&r=x`,
      },
    ];

    const input2 = [
      {
        name: 'Anthony',
        username: 'MVPAnt',
        avatar_url: `https://gravatar.com/avatar/fc25b0331ed2cfed2ca5a32452705da2?s=400&d=robohash&r=x`,
      },
      {
        name: 'Solveiga',
        username: 'Sole89',
        avatar_url: `https://gravatar.com/avatar/8210d12499010fbb4e14237d1a8f6cb1?s=400&d=robohash&r=x`,
      },
      {
        name: 'David',
        username: 'Toodles',
        avatar_url: `https://gravatar.com/avatar/c65c3f695e08d1250792bebd265065af?s=400&d=monsterid&r=x`,
      },
    ];

    formatUsersData(input);

    expect(input).toEqual(input2);
  });
  it('should return an array of nested arrays from an object', () => {
    const input = [
      {
        name: 'Anthony',
        username: 'MVPAnt',
        avatar_url: `https://gravatar.com/avatar/fc25b0331ed2cfed2ca5a32452705da2?s=400&d=robohash&r=x`,
      },
      {
        name: 'Solveiga',
        username: 'Sole89',
        avatar_url: `https://gravatar.com/avatar/8210d12499010fbb4e14237d1a8f6cb1?s=400&d=robohash&r=x`,
      },
    ];

    const output = [
      [
        'Anthony',
        'MVPAnt',
        `https://gravatar.com/avatar/fc25b0331ed2cfed2ca5a32452705da2?s=400&d=robohash&r=x`,
      ],
      [
        'Solveiga',
        'Sole89',
        `https://gravatar.com/avatar/8210d12499010fbb4e14237d1a8f6cb1?s=400&d=robohash&r=x`,
      ],
    ];

    expect(formatUsersData(input)).toEqual(output);
  });
  it('should return a new array', () => {
    const input = [
      {
        name: 'Anthony',
        username: 'MVPAnt',
        avatar_url: `https://gravatar.com/avatar/fc25b0331ed2cfed2ca5a32452705da2?s=400&d=robohash&r=x`,
      },
      {
        name: 'Solveiga',
        username: 'Sole89',
        avatar_url: `https://gravatar.com/avatar/8210d12499010fbb4e14237d1a8f6cb1?s=400&d=robohash&r=x`,
      },
    ];

    expect(formatUsersData(input)).not.toBe(input);
  });
});

describe('tests for formatMiscItemsData', () => {
  it('should not mutate the original data', () => {
    const input = [
      {
        name: 'Toothpaste',
        user: 'Anthony',
        category: 'Hygiene',
      },
      {
        name: 'Toilet Paper',
        user: 'Solveiga',
        category: 'Hygiene',
      },
      {
        name: 'Washing up liquid',
        user: 'David',
        category: 'Cleaning',
      },
    ];

    const input2 = [
      {
        name: 'Toothpaste',
        user: 'Anthony',
        category: 'Hygiene',
      },
      {
        name: 'Toilet Paper',
        user: 'Solveiga',
        category: 'Hygiene',
      },
      {
        name: 'Washing up liquid',
        user: 'David',
        category: 'Cleaning',
      },
    ];

    formatMiscItemsData(input);

    expect(input).toEqual(input2);
  });
  it('should return an array with nested arrays from an object', () => {
    const input = [
      {
        name: 'Toothpaste',
        user: 'Anthony',
        category: 'Hygiene',
      },
      {
        name: 'Toilet Paper',
        user: 'Solveiga',
        category: 'Hygiene',
      },
      {
        name: 'Washing up liquid',
        user: 'David',
        category: 'Cleaning',
      },
    ];

    const output = [
      ['Toothpaste', 'Anthony', 'Hygiene'],
      ['Toilet Paper', 'Solveiga', 'Hygiene'],
      ['Washing up liquid', 'David', 'Cleaning'],
    ];

    expect(formatMiscItemsData(input)).toEqual(output);
  });
  it('should return a new array', () => {
    const input = [
      {
        name: 'Toothpaste',
        user: 'Anthony',
        category: 'Hygiene',
      },
      {
        name: 'Toilet Paper',
        user: 'Solveiga',
        category: 'Hygiene',
      },
      {
        name: 'Washing up liquid',
        user: 'David',
        category: 'Cleaning',
      },
    ];

    expect(formatMiscItemsData(input)).not.toBe(input);
  });
});

describe('tests for formatIngredientsData', () => {
  it('should not mutate the original data', () => {
    const input = [
      {
        name: 'Mince',
        unit_of_measurement: 'grams',
        storage_type: 'chilled',
        user: 'Anthony',
      },
      {
        name: 'Spaghetti',
        unit_of_measurement: 'grams',
        storage_type: 'Ambient',
        user: 'Solveiga',
      },
    ];

    const input2 = [
      {
        name: 'Mince',
        unit_of_measurement: 'grams',
        storage_type: 'chilled',
        user: 'Anthony',
      },
      {
        name: 'Spaghetti',
        unit_of_measurement: 'grams',
        storage_type: 'Ambient',
        user: 'Solveiga',
      },
    ];

    formatIngredientsData(input);

    expect(input).toEqual(input2);
  });
  it('should return an array with nested arrays from an object', () => {
    const input = [
      {
        name: 'Mince',
        unit_of_measurement: 'grams',
        storage_type: 'chilled',
        user: 'Anthony',
      },
      {
        name: 'Spaghetti',
        unit_of_measurement: 'grams',
        storage_type: 'Ambient',
        user: 'Solveiga',
      },
    ];

    const output = [
      ['Mince', 'grams', 'chilled', 'Anthony'],
      ['Spaghetti', 'grams', 'Ambient', 'Solveiga'],
    ];

    expect(formatIngredientsData(input)).toEqual(output);
  });
  it('should return a new array', () => {
    const input = [
      {
        name: 'Mince',
        unit_of_measurement: 'grams',
        storage_type: 'chilled',
        user: 'Anthony',
      },
      {
        name: 'Spaghetti',
        unit_of_measurement: 'grams',
        storage_type: 'Ambient',
        user: 'Solveiga',
      },
    ];

    expect(formatIngredientsData(input)).not.toBe(input);
  });
});

describe('test for formatRecipeData', () => {
  it('should not mutate the original data', () => {
    const input = [
      {
        name: 'Spag Bol',
        user: 'Anthony',
        link: '',
        ingredients: 'Mince',
        ingredient_quantity: 400,
        portions: 2,
      },
      {
        name: 'Spag Bol',
        user: 'Anthony',
        link: '',
        ingredients: 'Spaghetti',
        ingredient_quantity: 80,
        portions: 2,
      },
    ];

    const input2 = [
      {
        name: 'Spag Bol',
        user: 'Anthony',
        link: '',
        ingredients: 'Mince',
        ingredient_quantity: 400,
        portions: 2,
      },
      {
        name: 'Spag Bol',
        user: 'Anthony',
        link: '',
        ingredients: 'Spaghetti',
        ingredient_quantity: 80,
        portions: 2,
      },
    ];

    formatRecipeData(input);

    expect(input).toEqual(input2);
  });
  it('should return an array with nested arrays from an object', () => {
    const input = [
      {
        name: 'Spag Bol',
        user: 'Anthony',
        link: '',
        ingredients: 'Mince',
        ingredient_quantity: 400,
        portions: 2,
      },
      {
        name: 'Spag Bol',
        user: 'Anthony',
        link: '',
        ingredients: 'Spaghetti',
        ingredient_quantity: 80,
        portions: 2,
      },
    ];

    const output = [
      ['Spag Bol', 'Anthony', '', 'Mince', 400, 2],
      ['Spag Bol', 'Anthony', '', 'Spaghetti', 80, 2],
    ];

    expect(formatRecipeData(input)).toEqual(output);
  });
  it('should return a new Array', () => {
    const input = [
      {
        name: 'Spag Bol',
        user: 'Anthony',
        link: '',
        ingredients: 'Mince',
        ingredient_quantity: 400,
        portions: 2,
      },
      {
        name: 'Spag Bol',
        user: 'Anthony',
        link: '',
        ingredients: 'Spaghetti',
        ingredient_quantity: 80,
        portions: 2,
      },
    ];

    expect(formatRecipeData(input)).not.toBe(input);
  });
});
