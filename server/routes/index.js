const Router = require('express')
const router = new Router()
const userRouter = require('../routes/userRouter')
const productRouter = require('../routes/productRouter')
const warehouseRouter = require('../routes/warehouseRouter')
const storekeeperRouter = require('../routes/storekeeperRouter')


router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/warehouse', warehouseRouter)
router.use('/storekeeper', storekeeperRouter)

module.exports = router