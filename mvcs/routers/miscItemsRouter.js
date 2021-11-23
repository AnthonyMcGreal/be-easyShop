const {
  postMiscItem,
  getMiscItemById,
  patchMiscItemById,
  deleteMiscItemById,
} = require('../controllers/miscItemsContoller');

const miscItemRouter = require('express').Router();

miscItemRouter.route('/').post(postMiscItem);
miscItemRouter
  .route('/:miscItem_id')
  .get(getMiscItemById)
  .patch(patchMiscItemById)
  .delete(deleteMiscItemById);

module.exports = miscItemRouter;
