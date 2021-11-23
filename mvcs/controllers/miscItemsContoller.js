const {
  selectMiscItemById,
  insertMiscItem,
} = require('../models/miscItemsModels');

exports.getMiscItemById = (req, res, next) => {
  const { miscItem_id } = req.params;
  selectMiscItemById(miscItem_id)
    .then((miscItem) => {
      if (miscItem.length === 0) {
        res.status(404).send({ msg: 'Not Found' });
      } else {
        res.status(200).send({ miscItem });
      }
    })
    .catch(next);
};
exports.postMiscItem = (req, res, next) => {
  const { body } = req;
  insertMiscItem(body)
    .then((miscItem) => {
      res.status(201).send({ miscItem });
    })
    .catch(next);
};
exports.patchMiscItemById = () => {};
exports.deleteMiscItemById = () => {};
