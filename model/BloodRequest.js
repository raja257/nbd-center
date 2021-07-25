import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment"


const BloodRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  index:{
    type: Number,
  },
  bloodType: {
    type: String,
  },
  description: {
    type: String,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
  },
  thalassemia: {
    type: String,
    default: "No",
  },
  fromDate: {
    type: String,
  },
  toDate: {
    type: String,
  },
  emergency: {
    type: String,
    default: "No",
  },
  status: {
    type: String,
    default: "open",
  },
  views: {
    type: Number,
    default: 0,
  },
  hiredDonor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

var connection = mongoose.createConnection("mongodb+srv://fixedSuper:f62sMEEamFCkhUr5@fixedappcluster0.3rgol.mongodb.net/fixedapp?retryWrites=true&w=majority");

autoIncrement.initialize(connection)

BloodRequestSchema.plugin(autoIncrement.plugin, {
  model: 'BloodRequest',
  field: 'index',
  startAt: 1000,
  incrementBy: 1
});


const BloodRequest = mongoose.model("BloodRequest", BloodRequestSchema);
export default BloodRequest;
