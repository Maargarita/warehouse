const {Warehouse} = require('../models/models')
const ApiError = require("../error/ApiError")
const {randomUUID} = require("crypto")

class WarehouseController {
    async create (request, response) {
        const warehouse = {
            id: randomUUID(), 
            address: request.body.address, 
            total_capacity: request.body.total_capacity, 
            occupied: request.body.occupied, 
        }
        
        const createdWarehouse = await Warehouse.create(warehouse)

        return response.json(createdWarehouse)
    }

    async getAll (request, response) {
        let {limit, offset} = request.query
        const warehouses = await Warehouse.findAndCountAll({limit, offset})
        return response.json(warehouses)
    }

    async getOne (request, response) {
        const {id} = request.params
        const warehouse = await Warehouse.findOne({where: {id}})
        return response.json(warehouse)
    }

    async edit (request, response) {
        const {id} = request.params
        const warehouse = await Warehouse.update(request.body, {where: {id}, returning: true})
        return response.json(warehouse[1])
    }

    async delete (request, response) {
        const {id} = request.params
        const warehouse = await Warehouse.destroy({where: {id}})
        return  response.status(204).json({message: ""})
    }
}

module.exports = new WarehouseController()