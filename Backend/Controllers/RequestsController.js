
import RequestsService from '../Services/RequestsService.js';

/**
 * Creates a new request.
 */
export const createRequest = async (req, res) => {
  try {
      const newRequest = await RequestsService.createRequest(req.body);
      res.status(201).json({ message: 'Request created successfully', success: true, data: newRequest });
  } catch (error) {
      console.error('Error creating request:', error);
      res.status(500).json({ message: error.message, success: false });
  }
};

/**
* Retrieves all requests.
*/
export const getRequests = async (req, res) => {
  try {
      const requests = await RequestsService.getRequests();
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
      const request = await RequestsService.getRequestById(req.params.id);
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
      const updatedRequest = await RequestsService.updateRequest(req.params.id, req.body);
      if (!updatedRequest) {
          return res.status(404).json({ message: 'Request not found', success: false });
      }
      res.status(200).json({ message: 'Request updated successfully', success: true, data: updatedRequest });
  } catch (error) {
      console.error(`Error updating request with ID ${req.params.id}:`, error);
      res.status(500).json({ message: 'Internal server error', success: false });
  }
};

/**
* Deletes a request by its ID.
*/
export const deleteRequest = async (req, res) => {
  try {
      const deletedRequest = await RequestsService.deleteRequest(req.params.id);
      if (!deletedRequest) {
          return res.status(404).json({ message: 'Request not found', success: false });
      }
      res.status(200).json({ message: 'Request deleted successfully', success: true });
  } catch (error) {
      console.error(`Error deleting request with ID ${req.params.id}:`, error);
      res.status(500).json({ message: 'Internal server error', success: false });
  }
};