const mongoose=require('mongoose')
const Schema=mongoose.Schema
const chartSchema=new Schema({
    
    colorcode:{
        type:String,
        required:true,
        
    },

    year:{
        type:Number,
        required:true
    },

    amount:{
        type:Number,
        required:true,    
    },

    minBarLength:{
          type:Number,
          required:true,
    },
 
},{timestamps:true})

//MODEL
const ChartModel=mongoose.model('chart',chartSchema)
module.exports=ChartModel


// http://localhost:8000/chartdata