// src/hooks/useOpenExhibit.js
import { useState, useEffect } from "react";
import museumApi from "../api/MuseumApi"; // Adjust the path as needed
import useMuseums from "./useMuseums"; // Adjust the path as needed
import exhibitionsApi from "../api/ExhibitionsApi";

const useOpenExhibit = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxArtworks: "",
  });

  const [curators, setCurators] = useState([{ name: "", lastName: "", email: "", phoneNumber: "" }]);

  const [planDetails, setPlanDetails] = useState({
    maxExhibitions: 0,
    maxArtWorks: 0,
    exhibitionsLeft: 0,
    artworksLeft: 0,
  });

  const [selectedMuseumId, setSelectedMuseumId] = useState(null);
  const { museums, isLoading, error } = useMuseums();

  useEffect(() => {
    if (selectedMuseumId) {
      const fetchPlanDetails = async () => {
        try {
          const museumData = await museumApi.getMuseumById(selectedMuseumId);
          const planData = museumData.plan;

          const exhibitionsUsed = museumData.exhibitions?.length || 0; // Assuming museumData contains exhibitions array
          const artworksUsed = museumData.exhibitions?.reduce((total, exhibition) => total + (exhibition.maxArtworks || 0), 0) || 0; // Sum of maxArtworks in each exhibition

          setPlanDetails({
            maxExhibitions: planData.maxExhibitions,
            maxArtWorks: planData.maxArtWorks,
            exhibitionsLeft: planData.maxExhibitions
              ? planData.maxExhibitions - exhibitionsUsed
              : null,
            artworksLeft: planData.maxArtWorks
              ? planData.maxArtWorks - artworksUsed
              : null,
          });
        } catch (error) {
          console.error("Error fetching plan details:", error);
        }
      };

      fetchPlanDetails();
    }
  }, [selectedMuseumId]);

  const handleMuseumSelect = (e) => {
    setSelectedMuseumId(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCuratorChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCurators = curators.map((curator, i) =>
      i === index ? { ...curator, [name]: value } : curator
    );
    setCurators(updatedCurators);
  };

  const handleAddCurator = () => {
    setCurators([...curators, { name: "", lastName: "", email: "", phoneNumber: "" }]);
  };

  const handleRemoveCurator = (index) => {
    const updatedCurators = curators.filter((_, i) => i !== index);
    setCurators(updatedCurators);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (planDetails.exhibitionsLeft !== null && planDetails.exhibitionsLeft > 0) &&
      (planDetails.artworksLeft !== null && formData.maxArtworks <= planDetails.artworksLeft) || 
      (planDetails.artworksLeft === null)
    ) {
      try {
        const exhibitionData = {
          ...formData,
          curators,
          museum: selectedMuseumId,
        };
        await exhibitionsApi.createExhibition(exhibitionData);
        alert("Exhibition created successfully");
        setPlanDetails((prev) => ({
          ...prev,
          exhibitionsLeft: prev.exhibitionsLeft !== null ? prev.exhibitionsLeft - 1 : prev.exhibitionsLeft,
          artworksLeft: prev.artworksLeft !== null ? prev.artworksLeft - formData.maxArtworks : prev.artworksLeft,
        }));
      } catch (error) {
        console.error("Error creating exhibition:", error);
        alert("Failed to create exhibition");
      }
    } else {
      alert("Cannot create more exhibitions or artworks limit exceeded");
    }
  };

  return {
    formData,
    curators,
    planDetails,
    selectedMuseumId,
    museums,
    isLoading,
    error,
    handleMuseumSelect,
    handleChange,
    handleCuratorChange,
    handleAddCurator,
    handleRemoveCurator,
    handleSubmit,
  };
};

export default useOpenExhibit;
