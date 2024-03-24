const Router = require('express')
const router = new Router()
const StorekeeperController = require('../controllers/storekeeperController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), StorekeeperController.create)
router.get('/', checkRole('ADMIN'), StorekeeperController.getAll)
router.get('/:id', checkRole('ADMIN'), StorekeeperController.getOne)
router.patch('/:id',  checkRole('ADMIN'), StorekeeperController.edit)
router.delete('/:id',  checkRole('ADMIN'), StorekeeperController.delete)

module.exports = router