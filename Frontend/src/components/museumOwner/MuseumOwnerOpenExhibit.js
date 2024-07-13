import React, { useState, useEffect } from 'react';
import museumApi from '../../api/MuseumApi'; // Adjust the path as needed

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

    useEffect(() => {
        // Assume this function fetches plan details from the backend
        const fetchPlanDetails = async () => {
            try {
                // Replace this URL with the actual endpoint to fetch plan details
                const response = await museumApi.get('/path-to-get-plan-details');
                const { maxExhibitions, maxArtWorks } = response.data;
                setPlanDetails({
                    maxExhibitions,
                    maxArtWorks,
                    exhibitionsLeft: maxExhibitions, // Initially set to max, decrease based on actual usage
                    artworksLeft: maxArtWorks
                });
            } catch (error) {
                console.error('Error fetching plan details:', error);
            }
        };

        fetchPlanDetails();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        // Here you would also call an API to create the exhibition
        // For now, we just simulate the decrement of exhibitions and artworks
        if (planDetails.exhibitionsLeft > 0 && formData.numberOfArtworks <= planDetails.artworksLeft) {
            setPlanDetails(prev => ({
                ...prev,
                exhibitionsLeft: prev.exhibitionsLeft - 1,
                artworksLeft: prev.artworksLeft - formData.numberOfArtworks
            }));
            console.log('Exhibition created successfully');
        } else {
            console.error('Cannot create more exhibitions or artworks limit exceeded');
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-center my-4">Open New Exhibition</h1>
            <p>Exhibitions Left: {planDetails.exhibitionsLeft}</p>
            <p>Artworks Left: {planDetails.artworksLeft}</p>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto shadow p-6">
                {/* Form fields */}
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default MuseumOwnerOpenExhibit;
