const mongoose=require('mongoose')
const slugify=require('slugify')

const programSchema=new mongoose.Schema({
    programName:{
        type:String,
        required:[true,"Program name must not be left blank."]
    },
    algorithm:{
        type:[[String,String]],
        required:[true,"Algorithm must be entered before submitting."]
    },
    program:{
        type:String,
        required:[true,"Please provide the code."]
    },
    slug:{
        type:String,
        unique:true
    },
    description:{
        type:String
    },
    output:{
        type:String,
        required:[true,"Please provide the code."]
    }
})

programSchema.pre('save',function(next){
    this.slug=slugify(`prgm-${this.programName}`)
    next();
})

const Programs=mongoose.model('Program',programSchema)

module.exports=Programs;
