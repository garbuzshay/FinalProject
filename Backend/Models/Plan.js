import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxExhibitions: {
    type: Number,
  },
  maxArtWorks: {
    type: Number,
  },
  features: {
    type: String,
    required: true,
  },
 
}, {
  timestamps: true,
});

const PlanModel = mongoose.model('plans', planSchema);

export default PlanModel;
