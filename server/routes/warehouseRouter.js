const Router = require('express')
const router = new Router()
const WarehouseController = require('../controllers/warehouseController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', checkRole('ADMIN'), WarehouseController.create)
router.get('/', authMiddleware, WarehouseController.getAll)
router.get('/:id', authMiddleware, WarehouseController.getOne)
router.patch('/:id',  checkRole('ADMIN'), WarehouseController.edit)
router.delete('/:id',  checkRole('ADMIN'), WarehouseController.delete)

module.exports = router