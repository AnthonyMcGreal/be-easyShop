const {
  selectAllMealPlans,
  selectMealPlansByName,
  insertMealPlans,
  updateMealPlanByName,
} = require('../models/mealPlansModels');

exports.getAllMealPlans = (req, res, next) => {
  selectAllMealPlans().then((mealPlans) => {
    res.status(200).send({ mealPlans });
  });
};

exports.getMealPlansByName = (req, res, next) => {
  const { mealPlanName } = req.params;
  selectMealPlansByName(mealPlanName)
    .then((meals) => {
      if (meals.length === 0) {
        res.status(404).send({ msg: 'Not Found' });
      } else {
        res.status(200).send({ meals });
      }
    })
    .catch(next);
};

exports.postMealPlans = (req, res, next) => {
  const { body } = req;
  insertMealPlans(body)
    .then((response) => {
      selectAllMealPlans().then((recipes) => {
        res.status(201).send({ recipes });
      });
    })
    .catch(next);
};

exports.patchMealPlanByName = (req, res, next) => {
  const { body } = req;
  updateMealPlanByName(body).then((mealPlan) => {
    res.status(200).send({ mealPlan });
  });
};
