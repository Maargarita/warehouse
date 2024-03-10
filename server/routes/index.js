const Router = require('express')
const router = new Router()
const userRouter = require('../routes/userRouter')
const productRouter = require('../routes/productRouter')
const warehouseRouter = require('../routes/warehouseRouter')
const storekeeperRouter = require('../routes/storekeeperRouter')
const authRouter = require('../routes/authRouter')

router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/product', productRouter)
router.use('/warehouse', warehouseRouter)
router.use('/storekeeper', storekeeperRouter)

module.exports = router