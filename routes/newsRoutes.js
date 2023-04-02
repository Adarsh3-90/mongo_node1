const express=require('express')
const router=express.Router();

const newscontroller=require('../controllers/newscontroller')

router.post('/newsapi',newscontroller.api)
router.get('/news',newscontroller.getData)



module.exports=router
