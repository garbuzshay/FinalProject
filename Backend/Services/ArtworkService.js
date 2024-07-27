import Artwork from '../Models/Artwork.js';

const createArtwork = async (artworkData) => {
  const artwork = new Artwork(artworkData);
  const savedArtwork = await artwork.save();
  return savedArtwork;
};

const getArtworks = async () => {
  return await Artwork.find().populate('artist');
};

const getArtworkById = async (id) => {
  return await Artwork.findById(id).populate('artist');
};

const updateArtwork = async (id, updateData) => {
  return await Artwork.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteArtwork = async (id) => {
  return await Artwork.findByIdAndDelete(id);
};

export default {
  createArtwork,
  getArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork
};
