\c easy_shop

SELECT * FROM users;

DELETE FROM miscItems WHERE item_id = 1 RETURNING *;