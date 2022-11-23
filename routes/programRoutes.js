const express=require('express')
const programController=require('../controllers/programController')

const programRouter=express.Router()

programRouter.route('/').get(programController.getAllProducts).post(programController.createProduct)
programRouter.route('/:slug').get(programController.getProduct).delete(programController.deleteProduct).patch(programController.updateProduct)

module.exports=programRouter
