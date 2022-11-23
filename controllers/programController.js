const Programs=require('../models/programModel')

const factory=require('./handleFactory')

exports.getAllProducts=factory.getAll(Programs)

exports.getProduct=factory.getOne(Programs)

exports.createProduct=factory.createOne(Programs)

exports.deleteProduct=factory.deleteOne(Programs)

exports.updateProduct=factory.updateOne(Programs)
