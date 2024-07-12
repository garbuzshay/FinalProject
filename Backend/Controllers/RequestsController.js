import RequestModel from '../Models/Request.js';

import UsersService from '../Services/UsersService.js';

/**
 * Creates a new request.
 */
export const createRequest = async (req, res) => {
    try {
        const {userData, museumData} = req.body;

       
       const {
        paymentMethodId = "paymentTokenId", // Request details
      } = req.body;
  
      const newUser = await UsersService.createUser(userData);
      if (!newUser) {
        return res.status(500).json({ message: 'Error creating user', success: false });
      }
  
      // Create a new request
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
      res.status(201).json({ message: 'Request created successfully', success: true, data: newRequest });
    } catch (error) {
      console.error('Error creating request:', error);
      res.status(500).json({ message: 'Internal server error', success: false });
    }
  };

/**
 * Retrieves all requests.
 */
export const getRequests = async (req, res) => {
  try {
    const requests = await RequestModel.find().populate('user').populate('museum');
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    console.error('Error getting requests:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

/**
 * Retrieves a request by its ID.
 */
export const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await RequestModel.findById(id).populate('user');
    if (!request) {
      return res.status(404).json({ message: 'Request not found', success: false });
    }
    res.status(200).json({ success: true, data: request });
  } catch (error) {
    console.error(`Error getting request with ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

/**
 * Updates a request by its ID.
 */
export const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedRequest = await RequestModel.findByIdAndUpdate(id, updateData, { new: true }).populate('user');
    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found', success: false });
    }
    res.status(200).json({ message: 'Request updated successfully', success: true, data: updatedRequest });
  } catch (error) {
    console.error(`Error updating request with ID ${id}:`, error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

/**
 * Deletes a request by its ID.
 */
export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRequest = await RequestModel.findByIdAndDelete(id);
    if (!deletedRequest) {
      return res.status(404).json({ message: 'Request not found', success: false });
    }
    res.status(200).json({ message: 'Request deleted successfully', success: true });
  } catch (error) {
    console.error(`Error deleting request with ID ${id}:`, error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};
