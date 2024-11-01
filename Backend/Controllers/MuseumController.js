import MuseumsService from "../Services/MuseumsService.js";
import { generateToken } from "../Utils/jwtUtils.js";

//
export const getMuseumByCurator = async (req, res) => {
  const curatorId = req.params.curatorId;
  try {
    const museum = await MuseumsService.getMuseumByCurator(curatorId);
    if (!museum) {
      return res.status(404).json({
        message: "Museum not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Museum retrieved successfully",
      success: true,
      data: museum,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//
export const createMuseum = async (req, res) => {
  try {
    const museum = await MuseumsService.createMuseum(req.body);
    res.status(201).json({
      message: "Museum created successfully",
      success: true,
      data: museum,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

export const getMuseums = async (req, res) => {
  try {
    const museums = await MuseumsService.getMuseums();
    res.status(200).json({
      message: "Museums retrieved successfully",
      success: true,
      data: museums,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getMuseumById = async (req, res) => {
  try {
    const museum = await MuseumsService.getMuseumById(req.params.id);
    if (!museum) {
      return res.status(404).json({
        message: "Museum not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Museum retrieved successfully",
      success: true,
      data: museum,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const updateMuseum = async (req, res) => {
  try {
    const museum = await MuseumsService.updateMuseum(req.params.id, req.body);
    if (!museum) {
      return res.status(404).json({
        message: "Museum not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Museum updated successfully",
      success: true,
      data: museum,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

export const deleteMuseum = async (req, res) => {
  try {
    const museum = await MuseumsService.deleteMuseum(req.params.id);
    if (!museum) {
      return res.status(404).json({
        message: "Museum not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Museum deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getUserMuseum = async (req, res) => {
  const userId = req.user._id;
  try {
    const museum = await MuseumsService.getMuseumByOwnerId(userId);
    if (!museum) {
      return res.status(404).json({
        message: "Museum not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Museum retrieved successfully",
      success: true,
      data: museum,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const verifyMuseumPassword = async (req, res) => {
  const { museumName, password } = req.body; // Use museumName instead of museumId
  try {
    const museum = await MuseumsService.verifyPassword(museumName, password);
    const token = generateToken({ museumId: museum.id, museumName: museum.name });


    res
      .status(200)
      .json({ message: "Password verified", success: true, data: {museum, token} });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getMuseumDetails = async (req, res) => {
  const { museumName } = req.params; // Use museumName instead of id
  try {
    const { museum, exhibitions } = await MuseumsService.getMuseumDetails(
      museumName
    );
    res.status(200).json({ success: true, data: {museum, exhibitions} });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
