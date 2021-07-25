import FeedBack from "../model/FeedBack.js";
import express from "express";

const router = express.Router();

//create feedback
router.post("/add", async (req, res) => {
    
    const newFeedBack = new FeedBack({
      sender : req.body.sender,
      reciver : req.body.reciver,
      rating : req.body.rating,
      description: req.body.description,
      requestId: req.body.requestId,
    });
  
    newFeedBack
      .save()
      .then((feedback) => {
        res.send({ feedback : feedback });
        console.log(feedback)
      })
      .catch((error) => {
        res.status(500).json({ error });
        console.log(error)
      });
  });

router.get("/", (req, res) => {
  FeedBack.find()
        .populate('sender')
        .populate('reciver')
      .then((feedback) => {
        res.send({ feedback: feedback });
      })
      .catch((error) => {
        res.send(error);
      });
  });


//   router.get("/count/:id", (req, res) => {
//     Proposal.find({requestId : req.params.id})
//       .then((request) => {
//         res.send({ request:request.length });
//         console.log(request)
//       })
//       .catch((error) => {
//         res.send(error);
//       });
//   });

//   router.get("/get/by/request/:id", (req, res) => {
//     Proposal.find({requestId : req.params.id})
//       .populate('userId')
//       .then((request) => {
//         res.send({ request:request });
//         console.log(request)
//       })
//       .catch((error) => {
//         res.send(error);
//       });
//   });







  export default router;
