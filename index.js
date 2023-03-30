require ('dotenv').config()
const express=require('express')
const app=express()
const cors=require('cors')
const connectDb=require('./config/connectdb')
const userRoutes=require('./routes/userRoutes')
const newsRoutes=require('./routes/newsRoutes')
const ChartModel = require('./models/chartModel')
const cookieParser = require('cookie-parser')
const axios=require('axios')

//for port 
const port=process.env.PORT

//for connected mongodb
const MONGO_URI=process.env.MONGO_URI
connectDb(MONGO_URI)

//json
app.use(express.json())
//cookies
app.use(cookieParser())

//cors policy
app.use(cors())


//for bar graph
app.get('/chartdata', async(req,res)=>{
    let data = await ChartModel.find();
    res.send({data})
})
app.post('/chartdata', async(req,res)=>{
    let payload = req.body;
    console.log(payload)
    let data = await ChartModel.insertMany(payload);
    res.send({data:"data inserted"})
})

app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`)
})

app.use("/api/user",userRoutes)
app.use("/api",newsRoutes)