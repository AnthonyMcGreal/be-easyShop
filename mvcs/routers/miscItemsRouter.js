const {
  postMiscItem,
  getMiscItemById,
  patchMiscItemById,
  deleteMiscItemById,
} = require('../controllers/miscItemsContoller');

const miscItemsRouter = require('express').Router();

miscItemsRouter.route('/').post(postMiscItem);
miscItemsRouter
  .route('/:miscItem_id')
  .get(getMiscItemById)
  .patch(patchMiscItemById)
  .delete(deleteMiscItemById);
