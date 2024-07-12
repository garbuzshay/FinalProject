// const mongoose = import('mongoose');
import mongoose from 'mongoose'
import { config } from "dotenv";
config()

const mongo_url = process.env.MONGO_CONN;

const db = mongoose.connect(mongo_url)
.then(()=>{
    console.log('MongoDB Connected.');
}).catch((err)=>{
    console.log('MongoDb Connection Error: ', err);
})

export default db;

