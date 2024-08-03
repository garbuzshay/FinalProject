import ExhibitionModel from "../Models/Exhibition.js";
import ArtworkModel from "../Models/Artwork.js";
import MuseumsService from "./MuseumsService.js";
import UsersService from "./UsersService.js";
import MuseumModel from "../Models/Museum.js";
import logger from "../Utils/logger.js";

class ExhibitionsService {
  async createExhibition(exhibitionData) {
    const { curators, museum: museumId, ...otherData } = exhibitionData;

    try {
      const curatorPromises = curators.map((curatorData) =>
        UsersService.createUser({
          ...curatorData,
          role: "Curator",
          museum: museumId,
        })
      );
      const createdCurators = await Promise.all(curatorPromises);
      const curatorIds = createdCurators.map((curator) => curator._id);

      // Fetch the museum
      const museum = await MuseumsService.getMuseumById(museumId);
      if (!museum) {
        throw new Error("Museum not found");
      }

      // Create the exhibition
      const exhibition = new ExhibitionModel({
        ...otherData,
        curators: curatorIds,
        museum: museum._id,
        status: "open",
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
      console.error("Error creating exhibition:", error);
      throw error;
    }
  }

  async getExhibitions() {
    return await ExhibitionModel.find()
      .populate("curators", "name")
      .populate("museum", "name")
      .populate("artworks");
  }

  async getExhibitionById(id) {
    return await ExhibitionModel.findById(id)
      .populate("curators", "name lastName email phoneNumber")
      .populate("museum", "name")
      .populate("artworks", "name");
  }


  async updateExhibition(id, exhibitionData) {
    try {
      // Fetch the existing exhibition to get the current curators
      const existingExhibition = await ExhibitionModel.findById(id).select('curators status');
      if (!existingExhibition) {
        throw new Error('Exhibition not found');
      }
      
      let existingCurators = existingExhibition.curators.map(curator => curator.toString());
  
      // Filter out the existing curators not present in exhibitionData.curators (i.e., curators to be removed)
      let updatedCurators = exhibitionData.curators ? existingCurators.filter(curatorId => exhibitionData.curators.includes(curatorId)) : existingCurators;
  
      // If there are new curators to be added
      if (exhibitionData.newCurators) {
        // Create new curators and get their IDs
        const curatorPromises = exhibitionData.newCurators.map((curatorData) =>
          UsersService.createUser({
            ...curatorData,
            role: "Curator",
            museum: exhibitionData.museum,
          })
        );
        const createdCurators = await Promise.all(curatorPromises);
        const newCuratorIds = createdCurators.map((curator) => curator._id.toString());
  
        // Append new curators to the updated curators
        updatedCurators = [...updatedCurators, ...newCuratorIds];
        delete exhibitionData.newCurators;
      }
  
      // Assign the final list of curators to exhibitionData.curators
      exhibitionData.curators = updatedCurators;
  
      // Check for status change and update openedAt and closedAt fields
      if (exhibitionData.status && exhibitionData.status !== existingExhibition.status) {
        if (exhibitionData.status === 'closed') {
          exhibitionData.closedAt = new Date();
          exhibitionData.openedAt = existingExhibition.openedAt || null; // Retain openedAt if already set
        } else if (exhibitionData.status === 'open') {
          exhibitionData.openedAt = new Date();
          exhibitionData.closedAt = null; // Clear closedAt when reopening
        }
      }

      // Update the exhibition with the combined curators list
      logger.info(`Updating exhibition with ID: ${id} and data: ${JSON.stringify(exhibitionData)}`);
      const updatedExhibition = await ExhibitionModel.findByIdAndUpdate(id, exhibitionData, {
        new: true,
        runValidators: true,
      });
  
      return updatedExhibition;
    } catch (error) {
      logger.error(`Error updating exhibition with ID ${id}: ${error.message}`);
      throw error;
    }
  }
  
  async deleteExhibition(id) {
    return await ExhibitionModel.findByIdAndDelete(id);
  }

  async getMuseumExhibitions(museumId) {
    return await ExhibitionModel.find({ museum: museumId })
      .populate("curators")
      .populate("museum")
      .populate("artworks");
  }
  async getCuratorExhibitions(curatorId, status) {
    const query = {
      curators: { $in: [curatorId] }
    };
  
    if (status) {
      query.status = status;
    }
  
    try {
      const exhibitions = await ExhibitionModel.find(query)
        .populate("curators")
        .populate("museum")
        .populate("artworks");
      
      return exhibitions;
    } catch (error) {
      console.error(`Error fetching exhibitions for curator ${curatorId} with status ${status}:`, error);
      throw error;
    }
  }
  
  //
  async getExhibitionsWithDetails() {
    try {
      const exhibitions = await ExhibitionModel.find()
        .populate({
          path: "curators",
          select: "name", // Assuming 'name' is a field in the user schema
        })
        .populate({
          path: "museum",
          select: "name", // Assuming 'name' is a field in the museum schema
        })
        .populate("artworks");

      return exhibitions.map((exhibition) => ({
        exhibitionName: exhibition.name,
        description: exhibition.description,
        maxArtworks: exhibition.maxArtworks,
        curators: exhibition.curators.map((curator) => curator.name),
        museumName: exhibition.museum.name,
        createdAt: exhibition.createdAt,
        updatedAt: exhibition.updatedAt,
      }));
    } catch (error) {
      console.error("Error retrieving exhibitions with details:", error);
      throw error;
    }
  }

  async addArtworkToExhibition(exhibitionId, artworkId) {
    try {
      const exhibition = await ExhibitionModel.findById(exhibitionId);
      if (!exhibition) {
        throw new Error('Exhibition not found');
      }
      exhibition.artworks.push(artworkId);
      await exhibition.save();
    } catch (error) {
      console.error('Error adding artwork to exhibition:', error);
      throw error;
    }
  }

  async delArtworkFromExhibition(exhibitionId, artworkId) {
    try {
      const exhibition = await ExhibitionModel.findById(exhibitionId);
      if (!exhibition) {
        throw new Error('Exhibition not found');
      }
  
      const artworkIndex = exhibition.artworks.indexOf(artworkId);
      if (artworkIndex > -1) {
        // Remove the artwork using splice
        exhibition.artworks.splice(artworkIndex, 1);
        await exhibition.save();
      } else {
        throw new Error('Artwork not found in exhibition');
      }
    } catch (error) {
      console.error('Error deleting artwork from exhibition:', error);
      throw error;
    }
  }  
}
export default new ExhibitionsService();