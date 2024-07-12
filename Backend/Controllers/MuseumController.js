import MuseumModel from '../models/Museum.js';

export const createMuseum = async (req, res) => {
  try {
    const museum = new MuseumModel(req.body);
    await museum.save();
    res.status(201).json(museum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMuseums = async (req, res) => {
  try {
    const museums = await MuseumModel.find();
    res.status(200).json(museums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMuseumById = async (req, res) => {
  try {
    const museum = await MuseumModel.findById(req.params.id);
    if (!museum) return res.status(404).json({ message: 'Museum not found' });
    res.status(200).json(museum);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMuseum = async (req, res) => {
  try {
    const museum = await MuseumModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!museum) return res.status(404).json({ message: 'Museum not found' });
    res.status(200).json(museum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMuseum = async (req, res) => {
  try {
    const museum = await MuseumModel.findByIdAndDelete(req.params.id);
    if (!museum) return res.status(404).json({ message: 'Museum not found' });
    res.status(200).json({ message: 'Museum deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
