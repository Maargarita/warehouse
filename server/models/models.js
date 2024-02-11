const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Role = sequelize.define('role', {
    id: {type: DataTypes.STRING, primaryKey: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const User = sequelize.define('user', {
    id: {type: DataTypes.STRING, primaryKey: true},
    login: {type: DataTypes.STRING, unique: true, allowNull: false},
    passowrd: {type: DataTypes.STRING, allowNull: false}
})

const Storekeeper = sequelize.define('storekeeper', {
    id: {type: DataTypes.STRING, primaryKey: true},
    surname: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    patronymic: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING, unique: true}
})

const Warehouse = sequelize.define('warehouse', {
    id: {type: DataTypes.STRING, primaryKey: true},
    address: {type: DataTypes.STRING, unique: true, allowNull: false},
    total_capacity: {type: DataTypes.FLOAT(2), allowNull: false},
    occupied: {type: DataTypes.FLOAT(2)}
})

const ProductWarehouse = sequelize.define('product_warehouse', {
    id: {type: DataTypes.STRING, primaryKey: true},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.STRING, primaryKey: true},
    article_number: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    in_stock: {type: DataTypes.INTEGER}, 
    warehouse_space: {type: DataTypes.FLOAT(2)}
})

Role.hasMany(User)
User.belongsTo(Role)

User.hasOne(Storekeeper)
Storekeeper.belongsTo(User)

Warehouse.hasMany(Storekeeper)
Storekeeper.belongsTo(Warehouse)

Warehouse.belongsToMany(Product, {through: ProductWarehouse})
Product.belongsToMany(Warehouse, {through: ProductWarehouse})

module.exports = {
    User,
    Role,
    Storekeeper,
    Warehouse,
    Product,
    ProductWarehouse
}