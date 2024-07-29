// // const express = require('express');
// import express from "express";
// import { config } from "dotenv";
// import bodyParser from "body-parser";
// import cors from "cors";
// import router from "./Routes/index.js";
// import db from './Models/db.js';
// import admin from 'firebase-admin';
// import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };
// import createAdminUser from "./Utils/adminUtils.js";

// config();

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
 

// const app = express();
// const PORT = process.env.PORT || 8080;


// app.use(bodyParser.json());
// app.use(cors());
// app.use('/api', router);

// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });

//Tanya@gmail.com Generated Password: 227166a1
//GrigoryGarbuz@gmail.com Generated Password: 85e1ef34
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


import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./Routes/index.js";
import db from './Models/db.js';
import admin from 'firebase-admin';
import createAdminUser from "./Utils/adminUtils.js";

config();

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
};

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

