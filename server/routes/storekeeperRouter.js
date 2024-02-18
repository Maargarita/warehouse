const Router = require('express')
const router = new Router()
const StorekeeperController = require('../controllers/storekeeperController')

router.post('/', StorekeeperController.create)
router.get('/', StorekeeperController.getAll)
router.get('/:id', StorekeeperController.getOne)

module.exports = router