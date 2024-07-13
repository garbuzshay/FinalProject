import mongoose from 'mongoose';

const isOpenMuseum = (type) => type === 'Museum-Opening';

const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  museum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'museums',
    required: function() {
      return this.type === 'Museum Change Plan';
    },
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  type: {
    type: String,
    enum: ['Museum-Opening', 'Museum-Change-Plan'],
    required: true,
  },
  plan: {  type: mongoose.Schema.Types.ObjectId,ref:'plans', required: true },
  paymentMethodId: { type: String, required: true }, // Store Stripe payment method ID
  // Museum data for "Museum Opening Request"
  museumName: { type: String},
  museumAddress: { type: String },
  museumCity: { type: String },
  museumState: { type: String },
  museumZipCode: { type: String },
  museumPhoneNumber: { type: String },
  museumEmail: { type: String },
}, {
  timestamps: true,
});

const RequestModel = mongoose.model('requests', requestSchema);

export default RequestModel;
