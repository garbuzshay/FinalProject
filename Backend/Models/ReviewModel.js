// Backend/Models/Review.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  museum: { type: mongoose.Schema.Types.ObjectId, ref: 'museums', required: true },
  museumScores: [Number], // Array of overall experience ratings for the museum

  exhibitions: [
    {
      exhibitionId: { type: mongoose.Schema.Types.ObjectId, ref: 'exhibitions', required: true },
      exhibitionScores: [Number], // Array of ratings for each exhibition
    },
  ],
}, {
  timestamps: true,
});

const ReviewModel = mongoose.model('reviews', reviewSchema);
export default ReviewModel;
