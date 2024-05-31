const ApiError = require('../error/ApiError') 

module.exports = function (error, request, response, next) {
    if (error instanceof ApiError) {
       return response.status(error.status).json({message: error.message, error: error.error})
    }
    
    return response.status(500).json({message: "Непредвиденная ошибка", error: error.error})
}