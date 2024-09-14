import mongoose from 'mongoose';

const termOfUseSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true, // The terms of use content is mandatory
    },
    lastUpdated: {
      type: Date,
      default: Date.now, // Automatically set the current date if not provided
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` timestamps
  }
);

const TermOfUseModel = mongoose.model('termsOfUse', termOfUseSchema);

export default TermOfUseModel;
