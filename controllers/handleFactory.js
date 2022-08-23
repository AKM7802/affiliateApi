const catchAsync=require('../utils/catchAsync')
const appError=require('../utils/appError')

exports.getAll=Model=>catchAsync(async (req,res,next)=>{
    const doc=await Model.find();
    res.status(200).json({
        status:"Success",
        results:doc.length,
        data:{
            doc
        }
    })
})

exports.getOne=Model=>catchAsync(async(req,res,next)=>{
    const doc=await Model.findById(req.params.id)

    if(!doc) return next(new appError("No document found with the specified id",404))

    res.status(200).json({
        status:"Success",
        data:{
            doc
        }
    })
})

exports.createOne=Model=>catchAsync(async(req,res,next)=>{
    
    if(!req.body) return next(new appError("Please provide the required data",404))

    const doc=await Model.create(req.body)

    res.status(201).json({
        status:"Success",
        doc
    })
})

exports.deleteOne=Model=>catchAsync(async (req,res,next)=>{
    const doc=await Model.findByIdAndDelete(req.params.id)
    if(!doc) return next(new appError('No product with the specified Id',404))

    res.status(204).json({
        status:"Success",
        data:null
    })
})

exports.updateOne=Model=>catchAsync(async (req,res,next)=>{
    const doc=await Model.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })

    if(!doc) return next(new appError("No product found with the specified Id",404))

    res.status(200).json({
        status:"success",
        updatedData:{
            doc
        }
    })
})