const express=require('express')
const ErrorController=require('./controllers/errorController')
const productRouter=require('./routes/productRoutes')
const containerRouter=require('./routes/pcRoutes')
const path=require('path')
const cors=require('cors')

const app=express();

app.use(cors())
app.options('*',cors())


app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))

app.use('/api/products',productRouter)
app.use('/api/containers',containerRouter)

app.use('/',(req,res)=>{
    res.end("AFFILIATE API PAGE")
})



app.use(ErrorController)
module.exports=app;