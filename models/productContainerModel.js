const mongoose=require('mongoose');
const slugify=require('slugify')

const productContainerSchema=mongoose.Schema({
    cName:{
        type:String,
        required:[true,"The product container name is required"]
    },
    slug:{
        type:String,
        unique:true
    },
    images:[String],
    createdAt:{
        type:Date,
        select:false
    },
    containerDescription:{
        type:String,
        required:[true,"The Container requires a description"]
    }
})

productContainerSchema.pre('save',function(next){
    this.slug=slugify(`${this.cName}`)
    next()
})

const ProductContainer=mongoose.model('ProductContainer',productContainerSchema)

module.exports=ProductContainer