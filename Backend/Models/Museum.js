import mongoose from 'mongoose';

const museumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'plans', required: true },
  exhibitions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'exhibitions' }], // Adding exhibitions reference array
  artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'artworks' }], // Adding artworks reference array


}, {
  timestamps: true,
});

const MuseumModel = mongoose.model('museums', museumSchema);


export default MuseumModel;
