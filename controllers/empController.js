const EmployeeModel = require('../models/employeeModel')

   //Add employee
 //http://localhost:8000/api/create

    const  createEmp = async (req, res) => {
    const { employeeId, name,  designation,email,contact  } = req.body;
    const user = await EmployeeModel.findOne({ email: email });
    if (user) {
      res.send({ status: "failed", message: "Email already exists in the register" });
    } else {
      if (employeeId && name && email &&  designation && contact ) {
        try {
           
          
            const newuser = new EmployeeModel({
                employeeId:employeeId,
                email:email,
                name:name,
                designation:designation,
                contact:contact
          });
          await newuser.save();
          const saved_user = await EmployeeModel.findOne({ email: email })
         
          res.send({ status: "Success", message: "Added Successfully"  });
        } catch (error) {
          console.log(error);
          res.send({ status: "failed", message: "unable to Added" });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };

    
// GET  ALL Employee
// http://localhost:8000/api/find

const getEmp= async (req, res) => {
    try {
        const employees = await EmployeeModel.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//GET A specific Employee

const getsEmp=async(req, res) => {
    res.json(res.employee);
};

//Update a new idetified user by user id
//http://localhost:8000/api/:id
//patch



  const  update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.body.id;
    EmployeeModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}


//Delete a user with with specified user id in the request
//delete
// http://localhost:8000/api/:id

const  DeletEmp = (req, res)=>{
    const id = req.body.id;
    EmployeeModel.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}



module.exports = {
    createEmp,
    DeletEmp,
    update,
    getEmp,
    getsEmp
}