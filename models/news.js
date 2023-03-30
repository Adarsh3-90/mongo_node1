const mongoose=require('mongoose')
const Schema=mongoose.Schema
const newsSchema=new Schema({
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: Date,
    source:String
});
newsSchema.index({title:'text'})
// const newsModel=mongoose.model('News',newsSchema)
const newsModel=mongoose.model('everynews',newsSchema);
newsModel.createIndexes();
module.exports=newsModel