require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(function (req, res, next) {
    res.status(404).send("Данные не найдены")
})
app.use(errorHandler)

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        
        app.listen(PORT, () => {console.log(`Server started on port ${PORT}`);})
    } catch (e) {
        console.log('error');
        console.log(e);
    }
}

start()