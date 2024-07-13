import mongoose from 'mongoose';

const artworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  year: { type: Number, required: true },
  museum: { type: mongoose.Schema.Types.ObjectId, ref: 'museums', required: true },
  exhibition: { type: mongoose.Schema.Types.ObjectId, ref: 'exhibitions', required: true }
}, {
  timestamps: true,
});

const ArtworkModel = mongoose.model('artworks', artworkSchema);

export default ArtworkModel;
