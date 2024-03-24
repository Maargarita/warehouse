const {Storekeeper} = require('../models/models')
const ApiError = require("../error/ApiError")
const {randomUUID} = require("crypto")

class StorekeeperController {
    async create (request, response) {
        const storekeeper = {
            id: randomUUID(), 
            surname: request.body.surname, 
            name: request.body.name, 
            patronymic: request.body.patronymic, 
            phone: request.body.phone, 
        }
        
        const createdStorekeeper = await Storekeeper.create(storekeeper)

        return response.json(createdStorekeeper)
    }

    async getAll (request, response) {
        let {limit, offset} = request.query
        const storekeepers = await Storekeeper.findAndCountAll({limit, offset})
        return response.json(storekeepers)
    }

    async getOne (request, response) {
        const {id} = request.params
        const storekeeper = await Storekeeper.findOne({where: {id}})
        return response.json(storekeeper)
    }

    async edit (request, response) {
        const {id} = request.params
        const storekeeper = await Storekeeper.update(request.body, {where: {id}, returning: true})
        return response.json(storekeeper[1])
    }

    async delete (request, response) {
        const {id} = request.params
        const storekeeper = await Storekeeper.destroy({where: {id}})
        return  response.status(204).json({message: ""})
    }
}

module.exports = new StorekeeperController()