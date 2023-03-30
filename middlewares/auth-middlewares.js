const jwt=require('jsonwebtoken')
const UserModel=require('../models/User')


const checkUserAuth= async (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];

    if (!token) return res.status(401).send('Access Denied !');
  
    console.log("abc",token);

    try 
    {
        const UserID= await jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("ue",UserID)
        if(!UserID){
            return res.send("tst")

        }
        req.user = UserID;  
        next();
    } 
    catch (error) 
    {
        res.status(400).send('Invalid token !');
    }
}



module.exports=checkUserAuth