import mongoose from 'mongoose';

const exhibitionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  curators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  museum: { type: mongoose.Schema.Types.ObjectId, ref: 'museums', required: true },
  artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'artworks' }]
}, {
  timestamps: true,
});

const ExhibitionModel = mongoose.model('exhibitions', exhibitionSchema);

export default ExhibitionModel;
