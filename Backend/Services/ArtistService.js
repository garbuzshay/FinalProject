import Artist from '../Models/Artist.js';

const createArtist = async (artistData) => {
  const artist = new Artist(artistData);
  return await artist.save();
};

const getArtists = async () => {
  return await Artist.find();
};

const getArtistById = async (id) => {
  return await Artist.findById(id);
};

const updateArtist = async (id, updateData) => {
  return await Artist.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteArtist = async (id) => {
  return await Artist.findByIdAndDelete(id);
};

export default {
  createArtist,
  getArtists,
  getArtistById,
  updateArtist,
  deleteArtist
};
