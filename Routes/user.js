import User from "../model/User.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();
const AVATAR = "/static/images/avatars/user.png";
const DONOR = "donor";

//register users
router.post("/register", async (req, res) => {
    console.log("Register request Landed ");
    console.log(req.body);
    //check if email already exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("EMAIL ALREADY EXIST");
    //encrypt password before saving into DB
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
      bloodType: req.body.bloodType,
      UserRole:req.body.UserRole,
      address: req.body.address,
      location: req.body.location,
      phone: req.body.phone,
    });
    try {
      const savedUser = await user.save();
   
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      res.header("auth-token", accessToken);
      let userObj = {
        _id: savedUser._id,
        avatar: AVATAR,
        fullname: savedUser.fullname,
        email: savedUser.email,
        UserRole: savedUser.UserRole,
        phone: savedUser.phone,
        location: savedUser.location,
      };
      const userData = {
        user: { ...savedUser, ...userObj },
        accessToken,
      };
      res.send(userData);
      console.log(userData)
    } catch (err) {
      res.status(400).send(err);
      console.log(err)
    }
  });

  router.post("/login", async (req, res) => {
    console.log("Login request Landed");
    console.log(req.body);

    //check if user exist
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send("EMAIL DOES NOT EXIST");
    //  Check for valid password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) res.status(400).send("PASSWORD IS INVALID");
      const accessToken = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      res.send({
      accessToken,
      user: {
        _id: user._id,
        avatar: AVATAR,
        fullname: user.fullname,
        email: user.email,
        bloodType: user.bloodType,
        location: user.location,
        phone: user.phone,
        UserRole: user.UserRole,
      },
    });
  });

//update user profile
router.post("/me/:userId", (req, res) => {
  const id = req.params.userId;
  console.log(req.params.userId )

  const user = req.body;
  User.findByIdAndUpdate({ _id: id }, { $set: user })
    .then(user => {
      res.status(200).json({ user });
      console.log(user)
    })
    .catch(err => {
      res.status(400).json({ err });
      console.log(err)
    });
});

router.get("/:userId", (req, res) => {
  console.log(req.params.userId )

  User.findOne({ _id: req.params.userId })
    .then(user => {
      res.status(200).json({ user : user });
      console.log(user)
    })
    .catch(err => {
      res.status(400).json({ err });
      console.log(err)
    });
});


router.get('/' , (req, res) => {
  User.find()
  .then((res) => {
    res.send(res)
  })
  .catch((err) => {
    res.send(err)
  })
})

router.get("/search/:location", (req, res) => {
  const location = req.params.location;
  User.find({
    $or: [{ location: { $regex: location, $options: "i" } }],
  })
    .then((users) => {
      res.send({ users: users });
    })
    .catch((err) => {
      res.send(err);
    });
});
  export default router;
