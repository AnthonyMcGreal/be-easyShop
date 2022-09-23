const { userAuth } = require('../auth')
const {
	postMiscItem,
	getMiscItemById,
	patchMiscItemById,
	deleteMiscItemById,
	getAllMiscItems
} = require('../controllers/miscItemsContoller')

const miscItemRouter = require('express').Router()

miscItemRouter
	.route('/')
	.get(userAuth, getAllMiscItems)
	.post(userAuth, postMiscItem)
miscItemRouter
	.route('/:miscItem_id')
	.get(userAuth, getMiscItemById)
	.delete(userAuth, deleteMiscItemById)

module.exports = miscItemRouter
