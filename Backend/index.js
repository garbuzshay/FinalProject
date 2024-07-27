// const express = require('express');
import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./Routes/index.js";
import db from './Models/db.js';
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };
import createAdminUser from "./Utils/adminUtils.js";

config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
 

const app = express();
const PORT = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

//Tanya@gmail.com Generated Password: 227166a1
//mirit@gmail.com Generated Password: 3c5e9b93
//mensch.edutainment@gmail.com  Password: Mensch123
//apple@gmail.com Generated Password: 29bd4db4
// abcdef@gmail.com Generated Password: d8601e15
//shay.garbuz Shay123
// const adminData = {
//   name: 'admin',
//   lastName: 'admin',
//   email: 'admin@gmail.com',
//   password: 'admin123',
//   phoneNumber: '+972522835145',
//   terms: true,
//   role : {roleId : '1', roleName: 'Admin'}
// };

// createAdminUser(adminData)
//   .then((adminUser) => {
//     console.log('Admin user created:', adminUser);
//   })
//   .catch((error) => {
//     console.error('Error creating admin user:', error);
//   });