const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.STRING, primaryKey: true},
    login: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'USER'}
})

const Storekeeper = sequelize.define('storekeeper', {
    id: {type: DataTypes.STRING, primaryKey: true},
    surname: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    patronymic: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Warehouse = sequelize.define('warehouse', {
    id: {type: DataTypes.STRING, primaryKey: true},
    address: {type: DataTypes.STRING, unique: true, allowNull: false},
    total_capacity: {type: DataTypes.FLOAT(2), allowNull: false},
    occupied: {type: DataTypes.FLOAT(2), defaultValue: 0}
})

const ProductWarehouse = sequelize.define('product_warehouse', {
    id: {type: DataTypes.STRING, primaryKey: true},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.STRING, primaryKey: true},
    article_number: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    in_stock: {type: DataTypes.INTEGER, defaultValue: 0}, 
    warehouse_space: {type: DataTypes.FLOAT(2), defaultValue: 0}
})

User.hasOne(Storekeeper)
Storekeeper.belongsTo(User)

Warehouse.hasMany(Storekeeper)
Storekeeper.belongsTo(Warehouse)

Warehouse.belongsToMany(Product, {through: ProductWarehouse})
Product.belongsToMany(Warehouse, {through: ProductWarehouse})

module.exports = {
    User,
    Storekeeper,
    Warehouse,
    Product,
    ProductWarehouse
}