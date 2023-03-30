const newsModel = require('../models/news')
const axios = require('axios')   //Axios offers different ways of making HTTP requests such as GET, POST, PUT, and DELETE
const cron = require('node-cron');


//for post
//  http://localhost:8000/api/newsapi
// http://localhost:8000/api/news

const api = async (req, res) => {
  const searchTerm=req.query.q

  const apiKey = '83f655d66a80411a904a4d2d00dad6b0';
  const apiUrl = `https://newsapi.org/v2/everything?q=bitcoin${searchTerm}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl)
    let articles = response.data.articles;
    //  const articles=response.stringify(data.articles);

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      const news = new newsModel({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        source: article.source?.name || 'not available'

      });
      await news.save()
    }
    res.json({
      msg: "success fetching news from "
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('error fetching news from API')
  }
}



const getData = async (req, res) => {
  let { searchTerm, source } = req.query;
  source = source?.split(",")

  let query = { source: source ? source : { $regex: '' } }
  try {
    if (searchTerm?.length) {
      query["$text"] = { $search: searchTerm }
    }

    let data = await newsModel.find(query)
    console.log(data)

    res.json({
      response: data
    })


  }
  catch (err) {
    res.json({
      message: "error"
    })
  }
}



module.exports = { api, getData };
