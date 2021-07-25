import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bloodRequestroute from './Routes/bloodRequest.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './Routes/user.js'
import proposalRoutes from './Routes/proposal.js'
import feedbackRoutes from './Routes/feedback.js'
import patientRoutes from './Routes/patient.js'
const app = express()
const port = 5555;

dotenv.config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) 
// app.use(cors())
// parse application/json
app.use(bodyParser.json()) 

//connect to db
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch(err => {
    console.error(err);
  });

app.use('/api/posts'  , bloodRequestroute)
app.use('/users/' , userRoutes)
app.use('/api/proposals/' , proposalRoutes)
app.use('/api/feebacks/' , feedbackRoutes)
app.use('/api/patients/' , patientRoutes)


app.listen(port , () => {
    console.log(`listening on http://localhost:${port}`)
})