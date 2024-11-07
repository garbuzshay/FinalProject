// import express from "express";
// import { config } from "dotenv";
// import bodyParser from "body-parser";
// import cors from "cors";
// import router from "./Routes/index.js";
// import admin from 'firebase-admin';


// config();

// const serviceAccount = {
//   type: process.env.FIREBASE_TYPE,
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: process.env.FIREBASE_AUTH_URI,
//   token_uri: process.env.FIREBASE_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
//   universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
// };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const app = express();
// const PORT = process.env.PORT || 8080;

// app.use(bodyParser.json());
// const allowedOrigins = ['http://localhost:3000', process.env.FRONTEND_URL, process.env.VISITOR_URL ]; // Add the URL of the frontend app to the allowed origins array

// const corsOptions = {
//   origin: function (origin, callback) {
//     // Check if the origin is in the allowed origins array
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// };

// // Use the CORS middleware
// app.use(cors(corsOptions));
// app.use('/api', router);

// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });

// index.js

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./Routes/index.js";
import admin from 'firebase-admin';
import appConfig from './config.js'; // Import the configuration
import  db from './Models/db.js';

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



//mensch.edutainment@gmail.com  Mensch123
//shay.garbuz Shay123
//ofekaz24 ofek123
//maycaspi May123




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