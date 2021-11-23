const { selectMiscItemById } = require('../models/miscItemsModels');

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
exports.postMiscItem = () => {};
exports.patchMiscItemById = () => {};
exports.deleteMiscItemById = () => {};
