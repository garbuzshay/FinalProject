import ArtistService from '../services/ArtistService.js';

export const createArtist = async (req, res) => {
  try {
    const artist = await ArtistService.createArtist(req.body);
    res.status(201).json({
      message: 'Artist created successfully',
      success: true,
      data: artist
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false
    });
  }
};

export const getArtists = async (req, res) => {
  try {
    const artists = await ArtistService.getArtists();
    res.status(200).json({
      message: 'Artists retrieved successfully',
      success: true,
      data: artists
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

export const getArtistById = async (req, res) => {
  try {
    const artist = await ArtistService.getArtistById(req.params.id);
    if (!artist) {
      return res.status(404).json({
        message: 'Artist not found',
        success: false
      });
    }
    res.status(200).json({
      message: 'Artist retrieved successfully',
      success: true,
      data: artist
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

export const updateArtist = async (req, res) => {
  try {
    const artist = await ArtistService.updateArtist(req.params.id, req.body);
    if (!artist) {
      return res.status(404).json({
        message: 'Artist not found',
        success: false
      });
    }
    res.status(200).json({
      message: 'Artist updated successfully',
      success: true,
      data: artist
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false
    });
  }
};

export const deleteArtist = async (req, res) => {
  try {
    const artist = await ArtistService.deleteArtist(req.params.id);
    if (!artist) {
      return res.status(404).json({
        message: 'Artist not found',
        success: false
      });
    }
    res.status(200).json({
      message: 'Artist deleted successfully',
      success: true
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};
