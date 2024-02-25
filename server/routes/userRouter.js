const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')

router.post('/', UserController.create)
router.get('/', UserController.getAll)
router.get('/:id', UserController.getOne)
router.post('/login', UserController.login)
router.get('/auth', UserController.check)

module.exports = router