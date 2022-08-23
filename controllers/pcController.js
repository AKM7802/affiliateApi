const ProductContainer=require('../models/productContainerModel')
const factory=require('./handleFactory')

exports.getAllContainers=factory.getAll(ProductContainer)

exports.getContainer=factory.getOne(ProductContainer)

exports.createContainer=factory.createOne(ProductContainer)

exports.deleteContainer=factory.deleteOne(ProductContainer)

exports.updateContainer=factory.updateOne(ProductContainer)

