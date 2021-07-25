import mongoose from "mongoose";

const ProposalsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BloodRequest",
  },
  description: {
    type: String,
  },
  deliveryTime: {
    type: String,
  },
  name : {
    type: String,
  },
  location : {
    type: String,
  },
  phone1 : {
    type: String,
  },
  phone2 : {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },    
});

const Proposals = mongoose.model("Proposals", ProposalsSchema);
export default Proposals;
