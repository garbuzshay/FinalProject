import React, { useState } from 'react';

const MuseumOwnerOpenExhibit = () => {
    const [formData, setFormData] = useState({
        exhibitionName: '',
        description: '',
        curators: '',
        numberOfArtworks: ''
    });

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
        // Add logic to handle form submission like sending data to backend
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-center my-4">Open New Exhibition</h1>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto shadow p-6">
                <div className="mb-4">
                    <label htmlFor="exhibitionName" className="block text-sm font-medium text-gray-700">Exhibition Name</label>
                    <input
                        type="text"
                        id="exhibitionName"
                        name="exhibitionName"
                        value={formData.exhibitionName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="curators" className="block text-sm font-medium text-gray-700">Curators</label>
                    <input
                        type="text"
                        id="curators"
                        name="curators"
                        value={formData.curators}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="numberOfArtworks" className="block text-sm font-medium text-gray-700">Number of Artworks</label>
                    <input
                        type="number"
                        id="numberOfArtworks"
                        name="numberOfArtworks"
                        value={formData.numberOfArtworks}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default MuseumOwnerOpenExhibit;
