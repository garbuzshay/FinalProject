import ExhibitionsService from '../Services/ExhibitionsService.js';
import logger from '../utils/logger.js'; // Assuming you have a logger utility

export const createExhibition = async (req, res) => {
  try {
    const data = req.body;
    logger.info(`Creating exhibition with data: ${JSON.stringify(data)}`);
    const exhibition = await ExhibitionsService.createExhibition({...data, museum: req.user.museum._id});
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
    exhibitionData.museum = req.user.museum._id;
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

export const getMuseumExhibitions = async (req, res) => {
  try {
    logger.info(`Retrieving exhibitions for museum with ID: ${req.user.museum._id}`);
    const exhibitions = await ExhibitionsService.getMuseumExhibitions(req.user.museum._id);
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
