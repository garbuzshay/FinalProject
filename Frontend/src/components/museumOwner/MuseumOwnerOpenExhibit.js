import React, { useState, useEffect } from 'react';
import museumApi from '../../api/MuseumApi'; // Adjust the path as needed
import useMuseums from '../../hooks/useMuseums'; // Adjust the path as needed

const MuseumOwnerOpenExhibit = () => {
    const [formData, setFormData] = useState({
      exhibitionName: '',
      description: '',
      curators: '',
      numberOfArtworks: ''
    });
  
    const [planDetails, setPlanDetails] = useState({
      maxExhibitions: 0,
      maxArtWorks: 0,
      exhibitionsLeft: 0,
      artworksLeft: 0
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
            const artworksUsed = museumData.artworks?.length || 0; // Assuming museumData contains artworks array
  
            setPlanDetails({
              maxExhibitions: planData.maxExhibitions,
              maxArtWorks: planData.maxArtWorks,
              exhibitionsLeft: planData.maxExhibitions - exhibitionsUsed,
              artworksLeft: planData.maxArtWorks - artworksUsed
            });
          } catch (error) {
            console.error('Error fetching plan details:', error);
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
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (planDetails.exhibitionsLeft > 0 && formData.numberOfArtworks <= planDetails.artworksLeft) {
        try {
          await museumApi.createExhibition(selectedMuseumId, formData);
          alert('Exhibition created successfully');
          setPlanDetails(prev => ({
            ...prev,
            exhibitionsLeft: prev.exhibitionsLeft - 1,
            artworksLeft: prev.artworksLeft - formData.numberOfArtworks
          }));
        } catch (error) {
          console.error('Error creating exhibition:', error);
          alert('Failed to create exhibition');
        }
      } else {
        alert('Cannot create more exhibitions or artworks limit exceeded');
      }
    };
  
    return (
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center my-4">Open New Exhibition</h1>
        {isLoading && <p>Loading museums...</p>}
        {error && <p>Error loading museums: {error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Select Museum:
            <select
              onChange={handleMuseumSelect}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={selectedMuseumId || ''}
              disabled={isLoading}
            >
              <option value="" disabled>Select a museum</option>
              {museums.map((museum) => (
                <option key={museum._id} value={museum._id}>
                  {museum.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        {selectedMuseumId && (
          <>
            <p>Exhibitions Left: {planDetails.exhibitionsLeft}</p>
            <p>Artworks Left: {planDetails.artworksLeft}</p>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto shadow p-6">
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Exhibition Name:
                  <input
                    type="text"
                    name="exhibitionName"
                    value={formData.exhibitionName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Description:
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Names of Curators (comma-separated):
                  <input
                    type="text"
                    name="curators"
                    value={formData.curators}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Number of Artworks:
                  <input
                    type="number"
                    name="numberOfArtworks"
                    value={formData.numberOfArtworks}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    );
  };
  
  export default MuseumOwnerOpenExhibit;