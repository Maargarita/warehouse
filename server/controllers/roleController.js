const {Role} = require('../models/models')
const ApiError = require("../error/ApiError")
const {randomUUID} = require("crypto")

class RoleController {
    async create (request, response) {
        const role = {
            id: randomUUID(), 
            name: request.body.name 
        }
        
        const createdRole = await Role.create(role)
        return response.json(createdRole)
    }

    async getAll (request, response) {
        let {limit, offset} = request.query
        const roles = await Role.findAndCountAll({limit, offset})
        return response.json(roles)
    }

    async getOne (request, response) {
        const {id} = request.params
        const role = await Role.findOne({where: {id}})
        return response.json(role)
    }
}

module.exports = new RoleController()