
import React, { useEffect } from "react";
import { TiUserDelete } from "react-icons/ti";
import useOpenExhibit from "../../hooks/useOpenExhibit"; // Adjust the path as needed

const MuseumOwnerOpenExhibit = () => {
  const {
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
  } = useOpenExhibit();

  if (isLoading) {
    return <p>Loading museum...</p>;
  }

  if (error) {
    return <p>Error loading museum: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-4">Open New Exhibition</h1>
      {museum && (
        <>
          <p>
            Exhibitions Left:{" "}
            {planDetails.exhibitionsLeft !== null ? planDetails.exhibitionsLeft : "unlimited"}
          </p>
          <p>
            Artworks Left:{" "}
            {planDetails.artworksLeft !== null ? planDetails.artworksLeft : "unlimited"}
          </p>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto shadow p-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Exhibition Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
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
                Maximum Number of Artworks:
                <input
                  type="number"
                  name="maxArtworks"
                  value={formData.maxArtworks}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </label>
            </div>
            <h2 className="text-xl font-bold text-center my-4">Curators</h2>
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={handleAddCurator}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                + Add Curator
              </button>
            </div>
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
                    Surname
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {curators.map((curator, index) => (
                  <tr key={index} className="even:bg-gray-100">
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <input
                        type="text"
                        name="name"
                        value={curator.name}
                        onChange={(e) => handleCuratorChange(index, e)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <input
                        type="text"
                        name="lastName"
                        value={curator.lastName}
                        onChange={(e) => handleCuratorChange(index, e)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <input
                        type="email"
                        name="email"
                        value={curator.email}
                        onChange={(e) => handleCuratorChange(index, e)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={curator.phoneNumber}
                        onChange={(e) => handleCuratorChange(index, e)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex justify-center items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleRemoveCurator(index)}
                        className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                      >
                        <TiUserDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Confirm & Create Exhibition
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default MuseumOwnerOpenExhibit;
