\c easy_shop

SELECT * FROM recipes;

SELECT * FROM ingredients;

SELECT recipes.recipe_name, recipes.link, ingredients.name, recipes.ingredient_quantity, ingredients.unit_of_measurement, recipes.portions, ingredients.storage_type FROM recipes
JOIN ingredients
ON recipes.ingredients = ingredients.ingredient_id
WHERE recipe_name = 'Spag_Bol'
