import mongoose from "mongoose";

const feedBackSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reciver: {
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
  rating: {
    type: String,
  },
  
  date: {
    type: Date,
    default: Date.now(),
  },
});

const FeedBack = mongoose.model("FeedBack", feedBackSchema);
export default FeedBack;
