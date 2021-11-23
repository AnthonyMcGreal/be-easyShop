const {
  postMiscItem,
  getMiscItemById,
  patchMiscItemById,
  deleteMiscItemById,
  getAllMiscItems,
} = require('../controllers/miscItemsContoller');

const miscItemRouter = require('express').Router();

miscItemRouter.route('/').get(getAllMiscItems).post(postMiscItem);
miscItemRouter
  .route('/:miscItem_id')
  .get(getMiscItemById)
  .patch(patchMiscItemById)
  .delete(deleteMiscItemById);

module.exports = miscItemRouter;
