const Router = require('express')
const router = new Router()
const AuthController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, AuthController.auth)

module.exports = router