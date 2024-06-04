const {Product, Warehouse} = require('../models/models')
const ApiError = require("../error/ApiError")
const {randomUUID} = require("crypto")
const { Sequelize } = require('../db')
const { Op } = require('sequelize')

class ProductController {
    async create (request, response, next) {
        try {
            if (request.body.in_stock < 0 || request.body.warehouse_space < 0) {
                return next(ApiError.badRequest('Количество товара в наличии и объем занятого места на складе не может быть меньше нуля'))
            }

            if (request.body.warehouseId) {
                const warehouse = await Warehouse.findOne({where: {id: request.body.warehouseId}})
                if (!warehouse) {
                    return next(ApiError.notFound('Склад не найден'))
                }
            }

            const candidate = await Product.findOne({where: {article_number:  request.body.article_number, warehouseId: request.body.warehouseId}})
            if (candidate) {
                return next(ApiError.conflict('Такой товар на этом складе уже существует'))
            }

            const product = {
                id: randomUUID(), 
                article_number: request.body.article_number, 
                name: request.body.name, 
                in_stock: request.body.in_stock, 
                warehouse_space: request.body.warehouse_space, 
                warehouseId: request.body.warehouseId
            }

            const createdProduct = await Product.create(product)
            const foundProduct = await Product.findOne({where: {id: createdProduct.id},
                include: [
                    {
                        model: Warehouse,
                        attributes: [],
                        required: false,
                    }
                ],
                attributes: {
                    include: [
                        [Sequelize.col('warehouse.address'), "warehouse_address"]
                    ]
                }   
            })
            return response.json(foundProduct)
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async getAll (request, response, next) {
        let {limit, offset} = request.query
        try {
            const products = await Product.findAndCountAll({limit, offset,
                include: [
                    {
                        model: Warehouse,
                        attributes: [],
                        required: false,
                    }
                ],
                attributes: {
                    include: [
                        [Sequelize.col('warehouse.address'), "warehouse_address"]
                    ]
                }   
            })
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
            const product = await Product.findOne({where: {id}})
            if (!product) {
                return next(ApiError.notFound('Товар не найден'))
            }

            if (request.body.in_stock < 0 || request.body.warehouse_space < 0) {
                return next(ApiError.badRequest('Количество товара в наличии и объем занятого места на складе не может быть меньше нуля'))
            }

            if (request.body.warehouseId) {
                const warehouse = await Warehouse.findOne({where: {id: request.body.warehouseId}})
                if (!warehouse) {
                    return next(ApiError.notFound('Склад не найден'))
                }
            }

            const candidate = await Product.findOne({where: {id: {[Op.not]: id}, article_number:  request.body.article_number, warehouseId: request.body.warehouseId}})
            if (candidate) {
                return next(ApiError.conflict('Такой товар на этом складе уже существует'))
            }

            await Product.update(request.body, {where: {id}})
            const foundProduct = await Product.findOne({where: {id},
                include: [
                    {
                        model: Warehouse,
                        attributes: [],
                        required: false,
                    }
                ],
                attributes: {
                    include: [
                        [Sequelize.col('warehouse.address'), "warehouse_address"]
                    ]
                }   
            })
            return response.json(foundProduct)
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async delete (request, response, next) {
        const {id} = request.params
        try {
            const product = await Product.findOne({where: {id}})
            if (!product) {
                return next(ApiError.notFound('Товар не найден'))
            }

            await Product.destroy({where: {id}})
            return response.status(204).json({message: ""})
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }
}

module.exports = new ProductController()