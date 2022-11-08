import express from "express";
import Employee from "../models/Employee.js";
import EmployeeAddress from "../models/EmployeeAddress.js"

const router = express.Router();

//create new employee

router.post("/", async (req, res, next) => {
  try {

    let lastCreatedEmployee = await Employee.findOne({}, {}, { sort: { 'createdAt' : -1 } });

    if(lastCreatedEmployee == null){
    let lastEmployeeId = 0
    let currentEmployeeId = ++lastEmployeeId
    let newEmployeeData = {...req.body,"employee_id":"EMP"+"00"+currentEmployeeId}
    const {employee_id,address,...other} = newEmployeeData
    const newEmployee = new Employee({...other,employee_id:employee_id});
    const newEmployeeAddress = new EmployeeAddress({employee_id:employee_id,address:address})
    const savedEmployee = await newEmployee.save();
    const savedEmployeeAddress = await newEmployeeAddress.save();
    res.status(200).json("employee has been created");
    }
    else
    {
      let lastEmployeeId = +lastCreatedEmployee.employee_id.match(/(\d+)/)[0]
      let currentEmployeeId = ++lastEmployeeId
      if(currentEmployeeId  <= 9 ){

         let newEmployeeData = {...req.body,"employee_id":"EMP"+"00"+currentEmployeeId}
         const {employee_id,address,...other} = newEmployeeData
         const newEmployee = new Employee({...other,employee_id:employee_id});
         const newEmployeeAddress = new EmployeeAddress({employee_id:employee_id,address:address})
         const savedEmployee = await newEmployee.save();
         const savedEmployeeAddress = await newEmployeeAddress.save();
         res.status(200).json("employee has been created");

      }
      else if(currentEmployeeId > 9){

        let newEmployeeData = {...req.body,"employee_id":"EMP"+"0"+currentEmployeeId}
        const {employee_id,address,...other} = newEmployeeData
        const newEmployee = new Employee({...other,employee_id:employee_id});
        const newEmployeeAddress = new EmployeeAddress({employee_id:employee_id,address:address})
        const savedEmployee = await newEmployee.save();
        const savedEmployeeAddress = await newEmployeeAddress.save();
        res.status(200).json("employee has been created");

      }
      else if(currentEmployeeId > 99){

        let newEmployeeData = {...req.body,"employee_id":"EMP"+currentEmployeeId}
        const {employee_id,address,...other} = newEmployeeData
        const newEmployee = new Employee({...other,employee_id:employee_id});
        const newEmployeeAddress = new EmployeeAddress({employee_id:employee_id,address:address})
        const savedEmployee = await newEmployee.save();
        const savedEmployeeAddress = await newEmployeeAddress.save();
        res.status(200).json("employee has been created");

      }
      
    }
    
  } catch (err) {
    return next(err);
  }
});


// //search for lastname match

// router.get("/search",async (req,res,next) => {
//   console.log(req.query.keyword)
//   try{
//       const searchDocuments = await Employee.find({ $text: { $search: req.query.keyword } })
//       console.log(searchDocuments)
//       res.status(200).json(searchDocuments)
//   }catch(err){
//    return next(err)
//   }
// })


//search for lastname match

// router.get("/searchByRegex",async (req,res,next) => {
//   console.log(req.query.keyword)
//   try{
//       const searchDocuments = await Employee.find({firstName: { '$regex': '^a', '$options': 'i' }}, {})
//       console.log(searchDocuments)
//       res.status(200).json(searchDocuments)
//   }catch(err){
//   return next(err)
//   }
// })



//update employee

router.put("/:employee_id", async (req, res, next) => {
  try {
    const {address,employee_id,...others} = req.body
   
    const editedEmployee = await Employee.findOneAndUpdate(
      req.params,
      {
        $set: {employee_id:employee_id,...others},
      },
      {
        new: true,
      }
    );
    const editedEmployeeAddress = await EmployeeAddress.findOneAndUpdate(
      req.params,
      {
        $set: {address:address,employee_id:employee_id},
      },
      {
        new: true,
      }
    );
    res.status(200).json("Employee details has been edited");
  } catch (err) {
    return next(err);
  }
});



//get all employees and also can filter by fields

router.get("/", async (req, res, next) => {
  try {
    const getEmployees = await Employee.aggregate([
      {
      $lookup:
      {
      from : "employeeaddresses",
      localField : "employee_id",
      foreignField : "employee_id",
      as : "address"
      } } ]);
    res.status(200).json(getEmployees);
  } catch (err) {
    return next(err);
  }
});



// get employee by id
router.get("/:employee_id", async (req, res, next) => {
  try {
    const { employee_id, email, phone, designation,firstName,lastName, ...others } = await Employee.findOne(req.params);
    const {address,...otherDetails} = await EmployeeAddress.findOne(req.params)
    res
      .status(200)
      .json({ fullname: firstName + " " +lastName, employee_id, email, phone, designation,address });
  } catch (err) {
    return next(err);
  }
});



//delete employee by id

router.delete("/:employee_id", async (req, res, next) => {
  try {
    const deletedEmployee = await Employee.findOneAndDelete(req.params);
    const deletedEmployeeAddress = await EmployeeAddress.findOneAndDelete(req.params)
    res.status(200).json("employee has been deleted");
  } catch (err) {
    return next(err);
  }
});


//delete all employee

router.delete("/", async (req, res, next) => {
  try {
    const deletedEmployee = await Employee.deleteMany();
    const deletedEmployeeAddress = await EmployeeAddress.deleteMany();
    res.status(200).json("all employees has been deleted");
  } catch (err) {
    return next(err);
  }
});

export default router;










