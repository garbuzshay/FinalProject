// config.js

import { config } from "dotenv";
import { mongo } from "mongoose";

config();

const appConfig = {
  port: process.env.PORT || 8080,
  allowedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    process.env.FRONTEND_URL,
    process.env.VISITOR_URL,
  ],
  firebase: {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  },
  mongo: {
    conn: process.env.MONGO_CONN,
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
  },
  jwt: {
    jwt_secret: process.env.JWT_SECRET || "47e5H7KU15",
    jwt_expiration: process.env.JWT_EXPIRATION || '1h',
  },
};

export default appConfig;
