const db = require('../../db/connection');
const format = require('pg-format');
const {
  deleteIngredientsById,
} = require('../controllers/ingredientsController');

exports.selectAllMealPlans = () => {
  let queryStr = `SELECT DISTINCT name FROM mealPlans;`;

  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};

exports.selectMealPlansByName = (mealPlanName) => {
  let queryStr = format(`SELECT * FROM mealPlans WHERE name = %L`, [
    mealPlanName,
  ]);

  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};

exports.insertMealPlans = async (body) => {
  let count = body.length;

  return body.map((meals) => {
    let { name, user, day, day_part, recipe } = meals;

    let queryStr = format(
      `INSERT INTO mealPlans
      (name, username, day, day_part, recipe)
      VALUES
      %L
      RETURNING *;`,
      [[name, user, day, day_part, recipe]]
    );

    return db.query(queryStr).then(({ rows }) => {
      count--;
      if (count === 0) {
        return rows;
      }
    });
  });
};

exports.updateMealPlanByName = async (body) => {
  let newMealPlanName = body[0].name;

  const updateMealPlan = async () => {
    return Promise.all(
      body.map((meals) => {
        let { template_id, name, username, day, day_part, recipe } = meals;

        return db.query(
          `UPDATE mealPlans
        SET name = $2, username = $3, day = $4, day_part = $5, recipe = $6
        WHERE template_id = $1
        RETURNING *;`,
          [template_id, name, username, day, day_part, recipe]
        );
      })
    );
  };

  await updateMealPlan();

  let queryStr = format(`SELECT * FROM mealPlans WHERE name = %L`, [
    newMealPlanName,
  ]);

  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};

exports.removeMealPlanByName = (mealPlanName) => {
  return db.query(`DELETE FROM mealPlans WHERE name = $1 RETURNING *;`, [
    mealPlanName,
  ]);
};
