const express=require('express')
const router=express.Router();

const emplcontroller =require("../controllers/empController");

router.post('/create',emplcontroller.createEmp)
router.get('/find',emplcontroller.getEmp)
router.get('/:id',emplcontroller.getsEmp)
router.patch('/:id',emplcontroller.update)
router.post('/:id',emplcontroller.DeletEmp)



module.exports=router
