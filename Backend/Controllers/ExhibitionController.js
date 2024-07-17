import ExhibitionsService from '../Services/ExhibitionsService.js';

export const createExhibition = async (req, res) => {
  try {
    const exhibition = await ExhibitionsService.createExhibition(req.body);
    res.status(201).json({
      message: 'Exhibition created successfully',
      success: true,
      data: exhibition
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false
    });
  }
};

export const getExhibitions = async (req, res) => {
  try {
    const exhibitions = await ExhibitionsService.getExhibitions();
    res.status(200).json({
      message: 'Exhibitions retrieved successfully',
      success: true,
      data: exhibitions
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

export const getExhibitionById = async (req, res) => {
  try {
    const exhibition = await ExhibitionsService.getExhibitionById(req.params.id);
    if (!exhibition) {
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
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

export const updateExhibition = async (req, res) => {
  try {
    const exhibition = await ExhibitionsService.updateExhibition(req.params.id, req.body);
    if (!exhibition) {
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
    res.status(400).json({
      message: error.message,
      success: false
    });
  }
};

export const deleteExhibition = async (req, res) => {
  try {
    const exhibition = await ExhibitionsService.deleteExhibition(req.params.id);
    if (!exhibition) {
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
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};