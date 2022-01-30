const db = require('../../db/connection');
const format = require('pg-format');

exports.selectAllRecipes = () => {
  let queryStr = `SELECT DISTINCT recipe_name FROM recipes;`;

  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};
exports.selectRecipeById = (name) => {
  let queryStr = format(
    `SELECT recipes.recipe_id, recipes.recipe_name, recipes.link, ingredients.name, recipes.ingredient_quantity, ingredients.unit_of_measurement, recipes.portions, ingredients.storage_type FROM recipes
  JOIN ingredients
  ON recipes.ingredients = ingredients.ingredient_id
  WHERE recipe_name = %L`,
    [name]
  );

  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};

exports.insertRecipe = async (body) => {
  let count = body.length;
  return body.map((ingredient) => {
    let { name, username, link, ingredients, ingredient_quantity, portions } =
      ingredient;

    let queryStr = format(
      `INSERT INTO recipes
    (recipe_name, username, link, ingredients, ingredient_quantity, portions)
      VALUES
      %L
      RETURNING *;`,
      [[name, username, link, ingredients, ingredient_quantity, portions]]
    );

    return db.query(queryStr).then(({ rows }) => {
      count--;
      if (count === 0) {
        return rows;
      }
    });
  });
};

exports.updateRecipeByName = async (body) => {
  let recipeName = body[0].name;

  const updateRecipe = async () => {
    return Promise.all(
      body.map((ingredient) => {
        let {
          recipe_id,
          name,
          username,
          link,
          ingredients,
          ingredient_quantity,
          portions,
        } = ingredient;

        return db.query(
          `UPDATE recipes
          SET recipe_name = $2, username = $3, link = $4, ingredients = $5, ingredient_quantity = $6, portions = $7
          WHERE recipe_id = $1
          RETURNING *;`,
          [
            recipe_id,
            name,
            username,
            link,
            ingredients,
            ingredient_quantity,
            portions,
          ]
        );
      })
    );
  };

  await updateRecipe();

  let queryStr = format(`SELECT * FROM recipes WHERE recipe_name = %L`, [
    recipeName,
  ]);

  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};

exports.removeRecipeByName = (name) => {
  return db.query('DELETE FROM recipes WHERE recipe_name = $1 RETURNING *;', [
    name,
  ]);
};
