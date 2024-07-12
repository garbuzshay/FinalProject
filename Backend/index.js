// const express = require('express');
import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./Routes/index.js";
import db from './Models/db.js';

config();


const app = express();
const PORT = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
