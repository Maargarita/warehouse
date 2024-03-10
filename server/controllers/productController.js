const {Product} = require('../models/models')
const ApiError = require("../error/ApiError")
const {randomUUID} = require("crypto")

class ProductController {
    async create (request, response) {
        const product = {
            id: randomUUID(), 
            article_number: request.body.article_number, 
            name: request.body.name, 
            in_stock: request.body.in_stock, 
            warehouse_space: request.body.warehouse_space, 
        }
        
        const createdProduct = await Product.create(product)

        return response.json(createdProduct)
    }

    async getAll (request, response) {
        let {limit, offset} = request.query
        const products = await Product.findAndCountAll({limit, offset})
        return response.json(products)
    }

    async getOne (request, response) {
        const {id} = request.params
        const product = await Product.findOne({where: {id}})
        return response.json(product)
    }

    async edit (request, response) {
        const {id} = request.params
        const product = await Product.update(request.body, {where: {id}, returning: true})
        return response.json(product[1])
    }

    async delete (request, response) {
        const {id} = request.params
        const product = await Product.destroy({where: {id}})
        return  response.status(204).json({message: ""})
    }
}

module.exports = new ProductController()