const express=require('express')
const containerController=require('../controllers/pcController')

const containerRouter=express.Router()

containerRouter.route('/').get(containerController.getAllContainers).post(containerController.createContainer)
containerRouter.route('/:id').get(containerController.getContainer).patch(containerController.updateContainer).delete(containerController.deleteContainer)


module.exports=containerRouter


