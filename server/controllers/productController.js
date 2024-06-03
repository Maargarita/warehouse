const {Product} = require('../models/models')
const ApiError = require("../error/ApiError")
const {randomUUID} = require("crypto")

class ProductController {
    async create (request, response, next) {
        try {
            if (request.body.in_stock < 0 || request.body.warehouse_space < 0) {
                return next(ApiError.badRequest('Количество товара в наличии и объем занятого места на складе не может быть меньше нуля'))
            }

            const product = {
                id: randomUUID(), 
                article_number: request.body.article_number, 
                name: request.body.name, 
                in_stock: request.body.in_stock, 
                warehouse_space: request.body.warehouse_space, 
            }

            const createdProduct = await Product.create(product)
            return response.json(createdProduct)
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async getAll (request, response, next) {
        let {limit, offset} = request.query
        try {
            const products = await Product.findAndCountAll({limit, offset})
            return response.json(products)
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async getOne (request, response, next) {
        const {id} = request.params
        try {
            const product = await Product.findOne({where: {id}})
            return response.json(product)
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async edit (request, response, next) {
        const {id} = request.params
        try {
            if (request.body.in_stock < 0 || request.body.warehouse_space < 0) {
                return next(ApiError.badRequest('Количество товара в наличии и объем занятого места на складе не может быть меньше нуля'))
            }

            const product = await Product.update(request.body, {where: {id}, returning: true})
            return response.json(product[1][0])
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async delete (request, response, next) {
        const {id} = request.params
        try {
            await Product.destroy({where: {id}})
            return response.status(204).json({message: ""})
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }
}

module.exports = new ProductController()