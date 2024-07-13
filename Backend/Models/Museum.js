import mongoose from 'mongoose';

const museumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  ownerID: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  planID: { type: String, ref: 'plans', required: true },
}, {
  timestamps: true,
});

const MuseumModel = mongoose.model('museums', museumSchema);


export default MuseumModel;
