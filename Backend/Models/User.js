import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  terms: { type: Boolean, required: true },
  paymentMethodId: { type: String }, // Stripe payment method ID
}, {
  timestamps: true,
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
