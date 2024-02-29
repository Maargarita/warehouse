const Router = require('express')
const router = new Router()
const RoleController = require('../controllers/roleController')

router.post('/', RoleController.create)
router.get('/', RoleController.getAll)
router.get('/:id', RoleController.getOne)

module.exports = router