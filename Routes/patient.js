import Patient from "../model/Patient.js";
import express from "express";

const router = express.Router();

//create feedback
router.post("/add", async (req, res) => {
    
    const newPatient = new Patient(req.body);
    newPatient
      .save()
      .then((patient) => {
        res.send({ patient : patient });
        console.log(patient)
      })
      .catch((error) => {
        res.status(500).json({ error });
        console.log(error)
      });
  });

router.get("/get", (req, res) => {
  Patient.find()
      .then((patients) => {
        res.send({ patients: patients });
        console.log(patients)
      })
      .catch((error) => {
        res.send(error);
      });
  });


export default router;
