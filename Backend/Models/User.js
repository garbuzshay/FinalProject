import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  terms: { type: Boolean },
  paymentMethodId: { type: String }, // Stripe payment method ID
  museum: { type: mongoose.Schema.Types.ObjectId, ref: 'museums' }, // Reference to Museum
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'roles' }, // Reference to Role schema
}, {
  timestamps: true,
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
