import RequestModel from "../Models/Request.js";
import UsersService from "./UsersService.js";
import MuseumsService from "./MuseumsService.js";
import { sendEmail } from "../Controllers/ContactUsController.js";
import UserModel from "../Models/User.js";

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
      owner: request.user,
      plan: request.plan,
    };
    await MuseumsService.createMuseum(museumData);
  }

  // Additional handlers can be added here for different actions
}
class RequestsService {
  constructor() {
    // Maps request type and status to a specific handler function
    this.actionHandlers = {
      "Museum-Opening": {
        Approved: RequestActions.createMuseum,
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
      const { userData, museumData, type } = requestData;
      const { paymentMethodId = "paymentTokenId" } = requestData;

      let newUser;
      if (type === "Museum-Opening") {
        userData.role = "MuseumOwner";
        newUser = await UsersService.createUser(userData);
        if (!newUser) {
          throw new Error("Error creating user");
        }
        const adminEmail = process.env.EMAIL_USER;
        const emailSubject = `New User Registration: ${userData.name}`;
        const emailMessage = `A new user has registered with the following details:\n
        Name: ${userData.name} ${userData.lastName}\n
        Email: ${userData.email}\n
        Please review and approve the request.
        In order to get more information, please log in to the admin system to access the list of requests`;
        await sendEmail(adminEmail, emailSubject, emailMessage);
      }

      const newRequest = new RequestModel({
        user: newUser ? newUser._id : null,
        type,
        status: "Pending",
        plan: userData.plan,
        paymentMethodId: paymentMethodId,
        museumName: museumData?.name,
        museumAddress: museumData?.address,
        museumCity: museumData?.city,
        museumState: museumData?.state,
        museumZipCode: museumData?.zipCode,
        museumPhoneNumber: museumData?.phoneNumber,
        museumEmail: museumData?.email,
      });

      await newRequest.save();
      return newRequest;
    } catch (error) {
      console.error("Error creating request:", error);
      throw error;
    }
  }

  /**
   * Retrieves all requests.
   * @returns {Array} The list of requests.
   */
  async getRequests() {
    try {
      const requests = await RequestModel.find().populate("user");
      return requests;
    } catch (error) {
      console.error("Error fetching requests:", error);
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
      const request = await RequestModel.findById(id).populate("user");
      return request ? request : null;
    } catch (error) {
      console.error("Error fetching request by ID:", error);
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

      // Check if the request status has changed to "Approved"
      if (requestData.status === "Approved" && request.status !== "Approved") {
        // Execute any actions related to this status change
        const typeActions = this.actionHandlers[request.type];
        if (typeActions && typeActions.Approved) {
          await typeActions.Approved(request);
        }

        // Retrieve the owner's email from the museum data
        const owner = await UserModel.findById(request.user);

        if (owner && owner.email) {
          const ownerEmail = owner.email;
          const emailSubject = "Your Request Has Been Approved";
          const emailMessage = `Dear ${owner.name},\n\nYour request for ${request.museumName} has been approved.\nYou can now log into the system and enjoy managing your museum through the CMS.\n\nThank you,\nThe Museum Team`;

          // Send email to the museum owner
          await sendEmail(ownerEmail, emailSubject, emailMessage);
        }
      }

      // Update the request in the database
      const updatedRequest = await RequestModel.findByIdAndUpdate(
        id,
        requestData,
        { new: true }
      ).populate("user");
      return updatedRequest;
    } catch (error) {
      console.error("Error updating request:", error);
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
      console.error("Error deleting request:", error);
      throw error;
    }
  }
}

export default new RequestsService();
