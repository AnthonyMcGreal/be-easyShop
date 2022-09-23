const { userAuth } = require('../auth')
const {
	postMiscItem,
	getMiscItemById,
	patchMiscItemById,
	deleteMiscItemById,
	getAllMiscItems
} = require('../controllers/miscItemsContoller')

const miscItemRouter = require('express').Router()

miscItemRouter.route('/').post(userAuth, postMiscItem)
miscItemRouter.route('/:user_id').get(userAuth, getAllMiscItems)
miscItemRouter.route('/:miscItem_id').delete(userAuth, deleteMiscItemById)
miscItemRouter.route('/:user_id/:miscItem_id').get(userAuth, getMiscItemById)

module.exports = miscItemRouter
