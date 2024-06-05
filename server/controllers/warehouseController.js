const {Warehouse} = require('../models/models')
const ApiError = require("../error/ApiError")
const {randomUUID} = require("crypto")
const { Op } = require('sequelize')

class WarehouseController {
    async create (request, response, next) {
        try {
            const candidate = await Warehouse.findOne({where: {address: request.body.address}})
            if (candidate) {
                return next(ApiError.conflict('Склад с таким адресом уже существует'))
            }

            if (request.body.total_capacity <= 0) {
                return next(ApiError.badRequest('Общий объем склада  не может меньше или равен нулю'))
            }

            if (request.body.occupied < 0) {
                return next(ApiError.badRequest('Объем занятого места на складе не может меньше нуля'))
            }

            const warehouse = {
                id: randomUUID(), 
                address: request.body.address, 
                total_capacity: request.body.total_capacity, 
                occupied: request.body.occupied, 
            }
            
            const createdWarehouse = await Warehouse.create(warehouse)
            return response.json(createdWarehouse)
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async getAll (request, response, next) {
        let {limit, offset, field, order} = request.query
        try {
            const warehouses = await Warehouse.findAndCountAll({limit, offset,
                order: [
                    [field, order]
                ] 
            })
            return response.json(warehouses)
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async getOne (request, response, next) {
        const {id} = request.params
        try {
            const warehouse = await Warehouse.findOne({where: {id}})
            return response.json(warehouse)
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async edit (request, response, next) {
        const {id} = request.params
        try {

            const warehouse = await Warehouse.findOne({where: {id}})
            if (!warehouse) {
                return next(ApiError.notFound('Склад не найден'))
            }

            const candidate = await Warehouse.findOne({where: {id: {[Op.not]: id}, address: request.body.address}})
            if (candidate) {
                return next(ApiError.conflict('Склад с таким адресом уже существует'))
            }

            if (request.body.total_capacity <= 0) {
                return next(ApiError.badRequest('Общий объем склада  не может быть меньше или равен нулю'))
            }

            if (request.body.occupied < 0) {
                return next(ApiError.badRequest('Объем занятого места на складе не может быть меньше нуля'))
            }

            const newWarehouse = await Warehouse.update(request.body, {where: {id}, returning: true})
            return response.json(newWarehouse[1][0])
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async delete (request, response, next) {
        const {id} = request.params
        try {
            const warehouse = await Warehouse.findOne({where: {id}})
            if (!warehouse) {
                return next(ApiError.notFound('Склад не найден'))
            }

            await Warehouse.destroy({where: {id}})
            return  response.status(204).json({message: ""})
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }
}

module.exports = new WarehouseController()