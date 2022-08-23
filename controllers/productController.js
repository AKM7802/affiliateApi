const Product=require(`../models/productModel`)
const factory=require('./handleFactory')

exports.getAllProducts=factory.getAll(Product)

exports.getProduct=factory.getOne(Product)

exports.createProduct=factory.createOne(Product)

exports.deleteProduct=factory.deleteOne(Product)

exports.updateProduct=factory.updateOne(Product)
