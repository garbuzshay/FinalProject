import ArtworkService from '../Services/ArtworkService.js';

export const createArtwork = async (req, res) => {
  try {
    const { id: exhibitionId } = req.params;  // Extract exhibition ID from URL parameters
    const artworkData = { ...req.body, exhibition: exhibitionId };  // Include exhibition ID in the artwork data

    const artwork = await ArtworkService.createArtwork(artworkData);
    res.status(201).json({
      message: 'Artwork created successfully',
      success: true,
      data: artwork
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false
    });
  }
};

export const getArtworks = async (req, res) => {
  try {
    const artworks = await ArtworkService.getArtworks();
    res.status(200).json({
      message: 'Artworks retrieved successfully',
      success: true,
      data: artworks
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

export const getArtworkById = async (req, res) => {
  try {
    const artwork = await ArtworkService.getArtworkById(req.params.id);
    if (!artwork) {
      return res.status(404).json({
        message: 'Artwork not found',
        success: false
      });
    }
    res.status(200).json({
      message: 'Artwork retrieved successfully',
      success: true,
      data: artwork
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

export const updateArtwork = async (req, res) => {
  try {
    const artwork = await ArtworkService.updateArtwork(req.params.id, req.body);
    if (!artwork) {
      return res.status(404).json({
        message: 'Artwork not found',
        success: false
      });
    }
    res.status(200).json({
      message: 'Artwork updated successfully',
      success: true,
      data: artwork
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false
    });
  }
};

export const deleteArtwork = async (req, res) => {
  try {
    const artwork = await ArtworkService.deleteArtwork(req.params.id);
    if (!artwork) {
      return res.status(404).json({
        message: 'Artwork not found',
        success: false
      });
    }
    res.status(200).json({
      message: 'Artwork deleted successfully',
      success: true
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};
