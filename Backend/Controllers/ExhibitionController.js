import ExhibitionsService from '../Services/ExhibitionsService.js';
import ArtworkService from '../Services/ArtworkService.js';
import logger from '../Utils/logger.js'; // Assuming you have a logger utility
import MuseumsService from '../Services/MuseumsService.js';

export const createExhibition = async (req, res) => {
  try {
    const data = req.body;
    logger.info(`Creating exhibition with data: ${JSON.stringify(data)}`);
    const museum= await MuseumsService.getMuseumByOwnerId(req.user._id);
    if(!museum){
      return res.status(404).json({
        message: 'Museum not found for the current user',
        success: false
      });
    }
    const exhibition = await ExhibitionsService.createExhibition({
      ...data,
      museum: museum._id // use the museum's _id retrieved from the database
    });

    res.status(201).json({
      message: 'Exhibition created successfully',
      success: true,
      data: exhibition
    });
  } catch (error) {
    logger.error(`Error creating exhibition: ${error.message}`);
    res.status(400).json({
      message: error.message,
      success: false
    });
  }
};

export const createArtworkInExhibition = async (req, res) => {
  try {
    const { id: exhibitionId } = req.params;  // Extract exhibition ID from URL parameters
    const artworkData = { ...req.body, exhibition: exhibitionId };  // Include exhibition ID in the artwork data

    logger.info(`Creating artwork for exhibition with ID: ${exhibitionId}`);
    const artwork = await ArtworkService.createArtwork(artworkData);

    await ExhibitionsService.addArtworkToExhibition(exhibitionId, artwork._id);
    
    res.status(201).json({
      message: 'Artwork created successfully',
      success: true,
      data: artwork
    });
  } catch (error) {
    logger.error(`Error creating artwork for exhibition with ID ${req.params.id}: ${error.message}`);
    res.status(400).json({
      message: error.message,
      success: false
    });
  }
};


export const deleteArtworkFromExhibition = async (req, res) => {
  try {
    const { id, artworkId } = req.params;
    logger.info(`Deleting artwork with ID ${artworkId} from exhibition with ID ${id}`);
    
    await ExhibitionsService.delArtworkFromExhibition(id, artworkId);
    await ArtworkService.deleteArtwork(artworkId);

    res.status(200).json({
      message: 'Artwork deleted successfully from exhibition',
      success: true
    });
  } catch (error) {
    logger.error(`Error deleting artwork with ID ${artworkId} from exhibition with ID ${id}: ${error.message}`);
    res.status(400).json({
      message: error.message,
      success: false
    });
  }
};



export const getExhibitions = async (req, res) => {
  try {
    logger.info('Retrieving all exhibitions');
    const exhibitions = await ExhibitionsService.getExhibitions();
    res.status(200).json({
      message: 'Exhibitions retrieved successfully',
      success: true,
      data: exhibitions
    });
  } catch (error) {
    logger.error(`Error retrieving exhibitions: ${error.message}`);
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

export const getExhibitionById = async (req, res) => {
  try {
    logger.info(`Retrieving exhibition with ID: ${req.params.id}`);
    const exhibition = await ExhibitionsService.getExhibitionById(req.params.id);
    if (!exhibition) {
      logger.warn(`Exhibition not found with ID: ${req.params.id}`);
      return res.status(404).json({
        message: 'Exhibition not found',
        success: false
      });
    }
    res.status(200).json({
      message: 'Exhibition retrieved successfully',
      success: true,
      data: exhibition
    });
  } catch (error) {
    logger.error(`Error retrieving exhibition with ID ${req.params.id}: ${error.message}`);
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

export const updateExhibition = async (req, res) => {
  try {
    const exhibitionData = req.body;
    // console.log(exhibitionData)
    // exhibitionData.museum = req.user.museum._id;
    logger.info(`Updating exhibition with ID: ${req.params.id} and data: ${JSON.stringify(exhibitionData)}`);
    const exhibition = await ExhibitionsService.updateExhibition(req.params.id, exhibitionData);
    if (!exhibition) {
      logger.warn(`Exhibition not found with ID: ${req.params.id}`);
      return res.status(404).json({
        message: 'Exhibition not found',
        success: false
      });
    }
    res.status(200).json({
      message: 'Exhibition updated successfully',
      success: true,
      data: exhibition
    });
  } catch (error) {
    logger.error(`Error updating exhibition with ID ${req.params.id}: ${error.message}`);
    res.status(400).json({
      message: error.message,
      success: false
    });
  }
};

export const deleteExhibition = async (req, res) => {
  try {
    logger.info(`Deleting exhibition with ID: ${req.params.id}`);
    const exhibition = await ExhibitionsService.deleteExhibition(req.params.id);
    if (!exhibition) {
      logger.warn(`Exhibition not found with ID: ${req.params.id}`);
      return res.status(404).json({
        message: 'Exhibition not found',
        success: false
      });
    }
    res.status(200).json({
      message: 'Exhibition deleted successfully',
      success: true
    });
  } catch (error) {
    logger.error(`Error deleting exhibition with ID ${req.params.id}: ${error.message}`);
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

export const getUserExhibitions = async (req, res) => {
  let exhibitions = [];
  try {
    logger.info(`Retrieving exhibitions for User with ID: ${req.user._id}`);

    if (req.user.role.roleName === 'MuseumOwner') {
      exhibitions = await ExhibitionsService.getMuseumExhibitions(req.user.museum._id);
    } else if (req.user.role.roleName === 'Curator') {
      exhibitions = await ExhibitionsService.getCuratorExhibitions(req.user._id, req.query.status);
    }

    res.status(200).json({
      message: 'Exhibitions retrieved successfully',
      success: true,
      data: exhibitions,
    });
  } catch (error) {
    logger.error(`Error retrieving exhibitions for museum with ID ${req.user.museum._id}: ${error.message}`);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getExhibitionsWithDetails = async (req, res) => {
  try {
    logger.info('Retrieving exhibitions with details');
    const exhibitions = await ExhibitionsService.getExhibitionsWithDetails();
    res.status(200).json({
      message: 'Exhibitions with details retrieved successfully',
      success: true,
      data: exhibitions
    });
  } catch (error) {
    logger.error(`Error retrieving exhibitions with details: ${error.message}`);
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

export const closeExhibition = async (req, res) => {
  try {
    logger.info(`Closing exhibition with ID: ${req.params.id}`);
    const exhibition = await ExhibitionsService.closeExhibition(req.params.id);
    if (!exhibition) {
      logger.warn(`Exhibition not found with ID: ${req.params.id}`);
      return res.status(404).json({
        message: 'Exhibition not found',
        success: false
      });
    }
    res.status(200).json({
      message: 'Exhibition closed successfully',
      success: true,
      data: exhibition
    });
  } catch (error) {
    logger.error(`Error closing exhibition with ID ${req.params.id}: ${error.message}`);
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

export const reopenExhibition = async (req, res) => {
  try {
    logger.info(`Reopening exhibition with ID: ${req.params.id}`);
    const exhibition = await ExhibitionsService.reopenExhibition(req.params.id);
    if (!exhibition) {
      logger.warn(`Exhibition not found with ID: ${req.params.id}`);
      return res.status(404).json({
        message: 'Exhibition not found',
        success: false
      });
    }
    res.status(200).json({
      message: 'Exhibition reopened successfully',
      success: true,
      data: exhibition
    });
  } catch (error) {
    logger.error(`Error reopening exhibition with ID ${req.params.id}: ${error.message}`);
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

