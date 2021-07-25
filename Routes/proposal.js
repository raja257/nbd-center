import Proposal from "../model/Proposal.js";
import express from "express";
import { addProposalValidation } from "../validations/proposal.js";

const router = express.Router();

//create proposal

router.post("/create", async (req, res) => {

  const emailExist = await Proposal.findOne({ userId: req.body.userId , requestId : req.body.requestId});
  if (emailExist) return res.status(400).send("Proposal ALREADY EXIST");

    const newProposal = new Proposal({
      userId : req.body.userId,
      requestId : req.body.requestId,
      deliveryTime : req.body.deliveryTime,
      description: req.body.description,
      name: req.body.name,
      phone1: req.body.phone1,
      phone2: req.body.phone2,
      location: req.body.location,
    });
  
    newProposal
      .save()
      .then((Proposal) => {
        res.send({ Proposal });
        console.log(Proposal)
      })
      .catch((error) => {
        res.status(400).json({ error });
        console.log(error)
      });
  

 
  });

router.get("/:requestId", (req, res) => {
  Proposal.find({requestId : req.params.requestId})
      .then((proposals) => {
        res.send({ proposals: proposals });
        console.log(proposals)
      })
      .catch((error) => {
        console.log(error)
        res.send(error);
      });
  });


  router.get("/count/:id", (req, res) => {
    Proposal.find({requestId : req.params.id})
      .then((request) => {
        res.send({ request:request.length });
        console.log(request)
      })
      .catch((error) => {
        res.send(error);
      });
  });

  router.get("/get/by/request/:id", (req, res) => {
    Proposal.find({requestId : req.params.id})
      .populate('userId')
      .then((request) => {
        res.send({ request:request });
        console.log(request)
      })
      .catch((error) => {
        res.send(error);
      });
  });







  export default router;
