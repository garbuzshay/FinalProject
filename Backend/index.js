
// index.js

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./Routes/index.js";
import admin from 'firebase-admin';
import appConfig from './config.js'; // Import the configuration
import  db from './Models/db.js';
import createAdminUser from "./Utils/adminUtils.js";  

// Initialize Firebase Admin with config
admin.initializeApp({
  credential: admin.credential.cert(appConfig.firebase)
});



const app = express();
const PORT = appConfig.port;

app.use(bodyParser.json());

const corsOptions = {
  origin: function (origin, callback) {
    if (appConfig.allowedOrigins.indexOf(origin) !== -1 || !origin) {
 
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Use the CORS middleware
app.use(cors(corsOptions));
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});


// const adminData = {
//   name: 'admin',
//   lastName: 'admin',
//   email: 'adminTest@gmail.com',
//   password: 'adminTest',
//   phoneNumber: '+972541234567',
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



//mensch.edutainment@gmail.com  Mensch123
//shay.garbuz Shay123
//ofekaz24 ofek123
// curator1@gmail.com Generated Password: b1a0af80
// curator2@gmail.com Generated Password: 12df1b5f

//test users for client
// adminTest@gmail.com Generated Password: adminTest
//test@gmail.com password: test123