import BloodRequest from "../model/BloodRequest.js";
import express from "express";

const router = express.Router();

//create proposal
router.post("/create", (req, res) => {
  const newProposal = new BloodRequest({
    userId: req.body.userId,
    bloodType: req.body.bloodType,
    description: req.body.description,
    name: req.body.name,
    phone: req.body.phone,
    location: req.body.location,
    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    emergency: req.body.emergency,
    thalassemia: req.body.thalassemia,
  });

  newProposal
    .save()
    .then((request) => {
      res.send({ request });
      console.log(request);
    })
    .catch((error) => {
      res.status(500).json({ error });
      console.log(error);
    });
});

router.get("/", (req, res) => {
  BloodRequest.find()
    .then((requests) => {
      res.send({ requests: requests });
      console.log(requests)
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const options = { new: true };
  BloodRequest.findById(id)
    .then((request) => {
      BloodRequest.findOneAndUpdate(
        { _id: request._id },
        { views: request.views + 1 },
        options
      ).then(() => {
        res.send({ request });
        console.log(request);
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/get/:id", (req, res) => {
  BloodRequest.find()
    .then((requests) => {
      res.send(requests);
      console.log(requests);
    })
    .catch((error) => {
      res.send(error);
    });
});


router.patch("/status/:id", (req, res) => {
  const id = req.params.id;
  let status = req.body.status;
  const update = { status };
  const options = { new: true };
  BloodRequest.findByIdAndUpdate(id, update, options)
    .select("status")
    .then((status) => {
      console.log(status)
      res.status(200).json({ status });
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json({ err });
    });
});


router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  BloodRequest.findByIdAndDelete(id)
    .then(() => {
      res.send('deleted');
    })
    .catch((error) => {
      res.send(error);
    });
});



router.patch("/hire/donor/:id", (req, res) => {
  const id = req.params.id;
  let hiredDonor = req.body.hiredDonor;
  const update = { hiredDonor };
  const options = { new: true };
  BloodRequest.findByIdAndUpdate(id, update, options)
    .select("hiredDonor")
    .then((hiredDonor) => {
      BloodRequest.update({ _id: id }, { status: "Active" }).then(status => {
        res.status(200).json({ status, hiredDonor });
        console.log(hiredDonor)
      });
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json({ err });
    });
});


router.get("/search/:location", (req, res) => {
  const location = req.params.location;
  BloodRequest.find({
    $or: [{ location: { $regex: location, $options: "i" } }],
  })
    .then((requests) => {
      res.send({ requests: requests });
    })
    .catch((err) => {
      res.send(err);
    });
});


router.patch("/update/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.params.id )

  const request = req.body;
  BloodRequest.findByIdAndUpdate({ _id: id }, { $set: request })
    .then(request => {
      res.status(200).json({ request });
      console.log(request)
    })
    .catch(err => {
      res.status(400).json({ err });
      console.log(err)
    });
});
export default router;
