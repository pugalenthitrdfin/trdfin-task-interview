import express from "express";
import Employee from "../models/Employee.js";

const router = express.Router();

//create new employee

router.post("/", async (req, res, next) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(200).json(savedEmployee);
  } catch (err) {
    return next(err);
  }
});

//update employee

router.put("/:id", async (req, res, next) => {
  try {
    const editedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(editedEmployee);
  } catch (err) {
    return next(err);
  }
});

//get all employees and also can filter by fields

router.get("/", async (req, res, next) => {
  try {
    const getEmployees = await Employee.find(req.query);
    res.status(200).json(getEmployees);
  } catch (err) {
    return next(err);
  }
});

// get employee by id
router.get("/:id", async (req, res, next) => {
  try {
    const getEmployee = await Employee.findById(req.params.id);
    const fullname = getEmployee.firstName + " " + getEmployee.lastName;
    const { employee_id, email, phone, designation, ...others } = getEmployee;
    res
      .status(200)
      .json({ fullname: fullname, employee_id, email, phone, designation });
  } catch (err) {
    return next(err);
  }
});

//delete employee by id

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json("employee has been deleted");
  } catch (err) {
    return next(err);
  }
});

export default router;
