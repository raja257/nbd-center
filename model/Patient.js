import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment"

const patientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  index:{
    type: Number,
  },
  name : {
    type: String,
  },
  location : {
    type: String,
  },
  phone : {
    type: String,
  },
  bloodType: {
    type: String,
  },
  duration: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },    
});

var connection = mongoose.createConnection("mongodb+srv://fixedSuper:f62sMEEamFCkhUr5@fixedappcluster0.3rgol.mongodb.net/fixedapp?retryWrites=true&w=majority");

autoIncrement.initialize(connection)

patientSchema.plugin(autoIncrement.plugin, {
  model: 'Patient',
  field: 'index',
  startAt: 1000,
  incrementBy: 1
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
