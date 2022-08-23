const mongoose=require('mongoose')

const slugify=require('slugify')

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:[true,'The product must have a name'],
    },
    authorName:{
        type:String,
        required:[true,'A product must have an author']
    },
    duration:{
        type:String,
        required:[true,'A Tour must have a duration']
    },
    ratingsAverage:{
        type:Number,
        default:4.5,
        min:[1,'Rating must be above 1.0'],
        max:[5,"Rating must be below 5.0"],
        set:val=>Math.round(val*10)/10
    },
    ratingsQuantity:{
        type:Number,
        default:0
    },
    price:Number,
    description:{
        type:String,
        trim:true,
        required:[true,'A product must have a description']
    },
    images:[String],
    createdAt:{
        type:Date,
        select:false
    },
    slug:{
        type:String,
        unique:true
    },
    productContainer:{
        type:mongoose.Schema.ObjectId,
        ref:'ProductContainer',
        required:[true,"ProductContainer Id is required."]
    }
})

productSchema.pre('save',function(next){
    this.slug=slugify(`${this.productName} ${this.authorName}`)
    this.populate({
        path:'productContainer',
        select:'_id'
    })
    next()
})

const Product=mongoose.model('Product',productSchema)

module.exports=Product