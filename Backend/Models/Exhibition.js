import mongoose from 'mongoose';

const exhibitionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  maxArtworks: { type: Number, required: true },
  curators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  museum: { type: mongoose.Schema.Types.ObjectId, ref: 'museums', required: true },
  artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'artworks' }],
  imageUrl: { type: String, required: true },
  status: { type: String, enum: ['open', 'closed'], default: 'closed' },
  openedAt: { type: Date },
  closedAt: { type: Date },
}, {
  timestamps: true,
});

const ExhibitionModel = mongoose.model('exhibitions', exhibitionSchema);

export default ExhibitionModel;
