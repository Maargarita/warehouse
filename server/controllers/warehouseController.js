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
        
    }
}

module.exports = new WarehouseController()