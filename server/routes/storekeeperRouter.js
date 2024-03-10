const Router = require('express')
const router = new Router()
const StorekeeperController = require('../controllers/storekeeperController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), StorekeeperController.create)
router.get('/', checkRole('ADMIN'), StorekeeperController.getAll)
router.get('/:id', checkRole('ADMIN'), StorekeeperController.getOne)

module.exports = router