import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  bloodType: {
    type: String,
    default: ''
},
  location: {
    type: String,
    default: ''
  },
  fullname: {
    type: String,
    default: ''
  },
  email:{
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  phone : {
    type: String,
    default: ''
  },
  password : {
    type: String,
    default: ''
  },
  UserRole : {
    type: String,
    default: 'requester'
  }
});

const User = mongoose.model("User", UserSchema);
export default User;
