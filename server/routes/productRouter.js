const Router = require('express')
const router = new Router()
const ProductController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, ProductController.create)
router.get('/', authMiddleware, ProductController.getAll)
router.get('/:id', authMiddleware, ProductController.getOne)
router.patch('/:id', authMiddleware, ProductController.edit)
router.delete('/:id', authMiddleware, ProductController.delete)

module.exports = router