// const mongoose = import('mongoose');
import mongoose from 'mongoose'
import appConfig from '../config.js';

const mongo_url = appConfig.mongo.conn;

const db = mongoose.connect(mongo_url)
.then(()=>{
    console.log('MongoDB Connected.');
}).catch((err)=>{
    console.log('MongoDb Connection Error: ', err);
})

export default db;

