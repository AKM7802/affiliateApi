
const app=require('./app')
//const dotenv=require('dotenv')
const mongoose=require('mongoose')

//dotenv.config({path:"./config.env"})

const db=process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD)

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("DB CONNECTION SUCCESSFUL"))

const port=process.env.PORT||8080
const server=app.listen(port,()=>console.log("Server started"))