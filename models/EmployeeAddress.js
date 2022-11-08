import mongoose from "mongoose";
// import autoIncrement from "mongoose-auto-increment"

const EmployeeAddressSchema = mongoose.Schema(
  {
    address: {
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
export default mongoose.model("EmployeeAddress", EmployeeAddressSchema);
