import { useState, useEffect } from "react";
import RequestsApi from "../api/RequestsApi";

const useRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      const data = await RequestsApi.getRequests();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching Requests:", error);
      setError("Failed to load Requests. please try again later");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  const updateRequestStatus = async (id, status) => {
    try {
      const updatedRequest = await RequestsApi.updateRequest(id, { status });
      setRequests(
        requests.map((request) =>
          request._id === id ? { ...updatedRequest } : { ...request }
        )
      );
    } catch (error) {
      console.error("Error updating request:", error);
      setError("Failed to update request. Please try again later.");
    }
  };

  return { requests, loading, error, updateRequestStatus, fetchRequests };
};
export default useRequests;
