import { useState, useEffect } from "react";
import TermsOfUseApi from "../api/TermsOfUseApi";

const useTermsOfUse = () => {
  const [termsOfUse, setTermsOfUse] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch terms of use from the API
  const fetchTermsOfUse = async () => {
    try {
      const response = await TermsOfUseApi.getTermsOfUse();
      setTermsOfUse(response.content); // Assuming the response contains a `content` field
    } catch (error) {
      console.error("Error fetching terms of use:", error);
      setError("Failed to load terms of use. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Update the terms of use
  const updateTermsOfUse = async (updatedContent) => {
    try {
      const updatedTerms = await TermsOfUseApi.updateTermsOfUse({
        content: updatedContent,
      });
      setTermsOfUse(updatedTerms.content); // Update the local state with the updated terms
    } catch (error) {
      console.error("Error updating terms of use:", error);
      setError("Failed to update terms of use. Please try again later.");
    }
  };

  useEffect(() => {
    fetchTermsOfUse();
  }, []);

  return { termsOfUse, loading, error, updateTermsOfUse, fetchTermsOfUse };
};

export default useTermsOfUse;
