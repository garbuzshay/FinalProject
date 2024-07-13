import RequestModel from '../Models/Request.js';
import UsersService from './UsersService.js';
import MuseumsService from './MuseumsService.js';
class RequestActions {
  static async createMuseum(request) {
    const museumData = {
      name: request.museumName,
      address: request.museumAddress,
      city: request.museumCity,
      state: request.museumState,
      zipcode: request.museumZipCode,
      phoneNumber: request.museumPhoneNumber,
      email: request.museumEmail,
      ownerID: request.user,
      planID: request.planId,
    };
    await MuseumsService.createMuseum(museumData);
  }

  // Additional handlers can be added here for different actions
}
class RequestsService {
  constructor() {
    // Maps request type and status to a specific handler function
    this.actionHandlers = {
      'Museum-Opening': {
        'Approved': RequestActions.createMuseum,
      },
      // Additional mappings can be added for other types and statuses
    };
  }
  /**
   * Creates a new request.
   * @param {Object} requestData - The request data.
   * @returns {Object} The created request.
   */
  
  async createRequest(requestData) {
    try {
      const { userData, museumData } = requestData;
      const { paymentMethodId = "paymentTokenId" } = requestData;

      const newUser = await UsersService.createUser(userData);
      if (!newUser) {
        throw new Error('Error creating user');
      }

      const newRequest = new RequestModel({
        user: newUser._id,
        type: "Museum-Opening",
        status: 'Pending',
        planId: userData.plan,
        paymentMethodId: paymentMethodId,
        museumName: museumData.name,
        museumAddress: museumData.address,
        museumCity: museumData.city,
        museumState: museumData.state,
        museumZipCode: museumData.zipCode,
        museumPhoneNumber: museumData.phoneNumber,
        museumEmail: museumData.email,
      });

      await newRequest.save();
      return newRequest;
    } catch (error) {
      console.error('Error creating request:', error);
      throw error;
    }
  }

  /**
   * Retrieves all requests.
   * @returns {Array} The list of requests.
   */
  async getRequests() {
    try {
      const requests = await RequestModel.find().populate('user');
      return requests;
    } catch (error) {
      console.error('Error fetching requests:', error);
      throw error;
    }
  }

  /**
   * Retrieves a request by ID.
   * @param {String} id - The request ID.
   * @returns {Object|null} The fetched request or null if not found.
   */
  async getRequestById(id) {
    try {
      const request = await RequestModel.findById(id).populate('user');
      return request ? request : null;
    } catch (error) {
      console.error('Error fetching request by ID:', error);
      throw error;
    }
  }

  /**
   * Updates a request by ID.
   * @param {String} id - The request ID.
   * @param {Object} requestData - The request data to update.
   * @returns {Object|null} The updated request or null if not found.
   */
  async updateRequest(id, requestData) {
    try {
      const request = await RequestModel.findById(id);
      if (!request) {
        return null;
      }

      // Determine if a special action needs to be taken based on the type and new status
      const typeActions = this.actionHandlers[request.type];
      if (typeActions && requestData.status && typeActions[requestData.status] && request.status !== requestData.status) {
        await typeActions[requestData.status](request);
      }

      // Update the request in the database
      const updatedRequest = await RequestModel.findByIdAndUpdate(id, requestData, { new: true }).populate('user');
      return updatedRequest;
    } catch (error) {
      console.error('Error updating request:', error);
      throw error;
    }
  }


  /**
   * Deletes a request by ID.
   * @param {String} id - The request ID.
   * @returns {Object|null} The deleted request or null if not found.
   */
  async deleteRequest(id) {
    try {
      const deletedRequest = await RequestModel.findByIdAndDelete(id);
      return deletedRequest ? deletedRequest : null;
    } catch (error) {
      console.error('Error deleting request:', error);
      throw error;
    }
  }
}

export default new RequestsService();
