import mongoose from "mongoose";
// import autoIncrement from "mongoose-auto-increment"

const EmployeeSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
      maxLength:10
    },
    city: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    employee_id:{
      type:String,
      required:true
    }
    
  },
  {
    timestamps: true,
  }
);

// autoIncrement.initialize(mongoose.connection);
// EmployeeSchema.plugin(autoIncrement.plugin, { model: 'Employee', field: 'employee_id' , startAt: "EMP001",incrementBy: 1});
export default mongoose.model("Employee", EmployeeSchema);
