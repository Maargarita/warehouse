const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), UserController.create)
router.get('/', checkRole('ADMIN'), UserController.getAll)
router.get('/:id', checkRole('ADMIN'), UserController.getOne)
router.post('/login', UserController.login)

module.exports = router