const {
	selectMiscItemById,
	insertMiscItem,
	selectAllMiscItems,
	removeMiscItemById
} = require('../models/miscItemsModels')

exports.getMiscItemById = (req, res, next) => {
	const { miscItem_id, user_id } = req.params
	selectMiscItemById(user_id, miscItem_id)
		.then(miscItem => {
			if (miscItem.length === 0) {
				res.status(404).send({ msg: 'Not Found' })
			} else {
				res.status(200).send({ miscItem })
			}
		})
		.catch(next)
}

exports.postMiscItem = (req, res, next) => {
	const { body } = req
	insertMiscItem(body)
		.then(miscItem => {
			res.status(201).send({ miscItem })
		})
		.catch(next)
}

exports.getAllMiscItems = (req, res, next) => {
	const { user_id } = req.params
	selectAllMiscItems(user_id).then(miscItems => {
		res.status(200).send({ miscItems })
	})
}

exports.deleteMiscItemById = (req, res, next) => {
	const { miscItem_id } = req.params
	removeMiscItemById(miscItem_id).then(item => {
		if (item.rows.length === 0) {
			res.status(404).send({ msg: 'Not Found' })
		} else {
			res.sendStatus(204)
		}
	})
}
