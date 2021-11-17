const db = require('../connection.js');

exports.formatUsersData = (userData) => {
  const formattedData = userData.map((userObject) => {
    return [userObject.name, userObject.username, userObject.avatar_url];
  });
  return formattedData;
};

exports.formatMiscItemsData = (miscItemsData) => {
  const formattedData = miscItemsData.map((itemData) => {
    return [itemData.name, itemData.user, itemData.category];
  });
  return formattedData;
};

exports.formatIngredientsData = (ingredientsData) => {
  const formattedData = ingredientsData.map((ingredient) => {
    return [
      ingredient.name,
      ingredient.unit_of_measurement,
      ingredient.storage_type,
      ingredient.user,
    ];
  });
  return formattedData;
};

exports.formatRecipeData = (recipeData) => {
  const formattedData = recipeData.map((recipe) => {
    return [
      recipe.name,
      recipe.user,
      recipe.link,
      recipe.ingredients,
      recipe.ingredient_quantity,
      recipe.portions,
    ];
  });
  return formattedData;
};
