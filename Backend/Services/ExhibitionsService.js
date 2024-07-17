import ExhibitionModel from '../Models/Exhibition.js';
import ArtworkModel from '../Models/Artwork.js';
import MuseumsService from './MuseumsService.js';
import UsersService from './UsersService.js';
import MuseumModel from '../models/Museum.js';

class ExhibitionsService {
  async createExhibition(exhibitionData) {
    const { curators, museum: museumId, ...otherData } = exhibitionData;
    
    try {
      const curatorPromises = curators.map(curatorData => UsersService.createUser({...curatorData, role: 'Curator'}));
      const createdCurators = await Promise.all(curatorPromises);
      const curatorIds = createdCurators.map(curator => curator._id);

      // Fetch the museum
      const museum = await MuseumsService.getMuseumById(museumId);
      if (!museum) {
        throw new Error('Museum not found');``
      }

      // Create the exhibition
      const exhibition = new ExhibitionModel({
        ...otherData,
        curators: curatorIds,
        museum: museum._id
      });

      const savedExhibition = await exhibition.save();

      // Update the museum to include the new exhibition
      await MuseumModel.findByIdAndUpdate(
        museum._id,
        { $push: { exhibitions: savedExhibition._id } },
        { new: true, useFindAndModify: false }
      );

      return exhibition;
    } catch (error) {
      console.error('Error creating exhibition:', error);
      throw error;
    }
  }

  async getExhibitions() {
    return await ExhibitionModel.find().populate('curators').populate('museum').populate('artworks');
  }

  async getExhibitionById(id) {
    return await ExhibitionModel.findById(id).populate('curators').populate('museum').populate('artworks');
  }

  async updateExhibition(id, exhibitionData) {
    return await ExhibitionModel.findByIdAndUpdate(id, exhibitionData, { new: true, runValidators: true });
  }

  async deleteExhibition(id) {
    return await ExhibitionModel.findByIdAndDelete(id);
  }
}

export default new ExhibitionsService();