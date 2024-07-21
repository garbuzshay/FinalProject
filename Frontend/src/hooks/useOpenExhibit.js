import { useState, useEffect } from "react";
import museumApi from "../api/MuseumApi"; // Adjust the path as needed
import exhibitionsApi from "../api/ExhibitionsApi";

const useOpenExhibit = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxArtworks: "",
  });

  const [curators, setCurators] = useState([
    { name: "", lastName: "", email: "", phoneNumber: "" },
  ]);

  const [planDetails, setPlanDetails] = useState({
    maxExhibitions: 0,
    maxArtWorks: 0,
    exhibitionsLeft: 0,
    artworksLeft: 0,
  });

  const [museum, setMuseum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMuseum = async () => {
      try {
        const museumData = await museumApi.getMuseumByOwner();
        setMuseum(museumData);

        const planData = museumData.plan;

        const exhibitionsUsed = museumData.exhibitions?.length || 0;
        const artworksUsed =
          museumData.exhibitions?.reduce(
            (total, exhibition) => total + (exhibition.maxArtworks || 0),
            0
          ) || 0;

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
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMuseum();
  }, []);

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
    setCurators([
      ...curators,
      { name: "", lastName: "", email: "", phoneNumber: "" },
    ]);
  };

  const handleRemoveCurator = (index) => {
    const updatedCurators = curators.filter((_, i) => i !== index);
    setCurators(updatedCurators);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (planDetails.exhibitionsLeft !== null &&
        planDetails.exhibitionsLeft > 0 &&
        planDetails.artworksLeft !== null &&
        formData.maxArtworks <= planDetails.artworksLeft) ||
      planDetails.artworksLeft === null
    ) {
      try {
        const exhibitionData = {
          ...formData,
          curators,
          museum: museum.id, // Use the museum's ID
        };
        await exhibitionsApi.createExhibition(exhibitionData);
        alert("Exhibition created successfully");
        // Reset form data and curators
        setFormData({
          name: "",
          description: "",
          maxArtworks: "",
        });
        setCurators([{ name: "", lastName: "", email: "", phoneNumber: "" }]);

        setPlanDetails((prev) => ({
          ...prev,
          exhibitionsLeft:
            prev.exhibitionsLeft !== null
              ? prev.exhibitionsLeft - 1
              : prev.exhibitionsLeft,
          artworksLeft:
            prev.artworksLeft !== null
              ? prev.artworksLeft - formData.maxArtworks
              : prev.artworksLeft,
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
    museum,
    isLoading,
    error,
    handleChange,
    handleCuratorChange,
    handleAddCurator,
    handleRemoveCurator,
    handleSubmit,
  };
};

export default useOpenExhibit;
