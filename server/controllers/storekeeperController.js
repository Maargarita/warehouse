const {Storekeeper, User, Warehouse} = require('../models/models')
const ApiError = require("../error/ApiError")
const {randomUUID} = require("crypto")
const { Sequelize } = require('../db')

class StorekeeperController {
    async create (request, response, next) {
        const {surname, name, patronymic, phone} = request.body
        try {
            
            const candidate = await Storekeeper.findOne({where: {phone}})
            if (candidate) {
                return next(ApiError.conflict('Кладовщик с таким номером телефона уже существует'))
            }
            
            const createdStorekeeper = await Storekeeper.create({ id: randomUUID(), surname, name, patronymic, phone })
            return response.json(createdStorekeeper)
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async getAll (request, response, next) {
        let {limit, offset} = request.query
        try {
            const storekeepers = await Storekeeper.findAndCountAll({limit, offset,
                include: [
                    { 
                        model: User,
                        attributes: [],
                        required: false,
                    }, 
                    { 
                        model: Warehouse,
                        attributes: [],
                        required: false,
                    }
                ],
                attributes: {
                    include: [
                        [Sequelize.col('user.login'), "user_login"], 
                        [Sequelize.col('warehouse.address'), "warehouse_address"]
                    ]
                }
            })
            return response.json(storekeepers)
        } catch (error) {
            return next(ApiError.internal('Непредвиденная ошибка', error))
        }
    }

    async getOne (request, response, next) {
        const {id} = request.params
        const storekeeper = await Storekeeper.findOne({where: {id}})
        return response.json(storekeeper)
    }

    async edit (request, response, next) {
        const {id} = request.params
        await Storekeeper.update(request.body, {where: {id}, returning: true})
        const storekeeper = await Storekeeper.findOne({where: {id},
            include: [
                { 
                    model: User,
                    attributes: [],
                    required: false,
                }, 
                { 
                    model: Warehouse,
                    attributes: [],
                    required: false,
                }
            ],
            attributes: {
                include: [
                    [Sequelize.col('user.login'), "user_login"], 
                    [Sequelize.col('warehouse.address'), "warehouse_address"]
                ]
            }   
            })
        return response.json(storekeeper)
    }

    async delete (request, response, next) {
        const {id} = request.params
        const storekeeper = await Storekeeper.destroy({where: {id}})
        return  response.status(204).json({message: ""})
    }
}

module.exports = new StorekeeperController()