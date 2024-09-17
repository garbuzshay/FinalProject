// src/components/MuseumOwnerExhibitionsList.js

import React, { useState } from "react";
import { useThemeMode } from '../../contexts/DarkModeContext'; // Import Theme Context
import ExhibitCard from "../common/ExhibitCard"; // Adjust the path as needed
import { useMuseumContext } from "../../contexts/MuseumContext";

const MuseumOwnerExhibitionsList = () => {
  const { loading, openExhibition, exhibitions } = useMuseumContext();
  const { isDarkMode } = useThemeMode(); // Destructure isDarkMode

  const [filter, setFilter] = useState("all");

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <p className="text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  const filterExhibitions = () => {
    switch (filter) {
      case "open":
        return exhibitions?.filter(
          (exhibition) => exhibition.status === "open"
        );
      case "closed":
        return exhibitions?.filter(
          (exhibition) => exhibition.status === "closed"
        );
      case "all":
      default:
        return exhibitions;
    }
  };

  const filteredExhibitions = filterExhibitions();

  return (
    <div
      className={`container mx-auto p-4  transition-colors duration-300`}
    >
      <h1
        className={`text-4xl font-extrabold mb-8 text-center ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Your Exhibitions
      </h1>
      <p
        className={`text-md mb-6 ${
          isDarkMode ? "text-gray-400" : "text-gray-700"
        }`}
      >
        To view or edit an exhibition, simply click on the tab and start exploring.
      </p>
      <div className="flex justify-center mb-4 space-x-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all"
              ? isDarkMode
                ? "bg-blue-600 text-white"
                : "bg-blue-500 text-white"
              : isDarkMode
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } transition-colors duration-300`}
        >
          Show All
        </button>
        <button
          onClick={() => setFilter("open")}
          className={`px-4 py-2 rounded ${
            filter === "open"
              ? isDarkMode
                ? "bg-blue-600 text-white"
                : "bg-blue-500 text-white"
              : isDarkMode
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } transition-colors duration-300`}
        >
          Show Opened Exhibitions
        </button>
        <button
          onClick={() => setFilter("closed")}
          className={`px-4 py-2 rounded ${
            filter === "closed"
              ? isDarkMode
                ? "bg-blue-600 text-white"
                : "bg-blue-500 text-white"
              : isDarkMode
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } transition-colors duration-300`}
        >
          Show Closed Exhibitions
        </button>
      </div>
      <div className="flex flex-wrap -m-4">
        {filter === "all" ? (
          <>
            {filteredExhibitions
              ?.filter((exhibition) => exhibition.status === "open")
              .map((exhibition) => (
                <ExhibitCard
                  key={exhibition._id}
                  id={exhibition._id}
                  name={exhibition.name}
                  description={exhibition.description}
                  imageUrl={
                    exhibition.imageUrl || "https://via.placeholder.com/150"
                  }
                  location={exhibition.location}
                  artworks={exhibition.artworks?.length}
                  curators={exhibition.curators
                    .map((curator) => curator.name)
                    .join(", ")}
                  status={exhibition.status}
                  isDarkMode={isDarkMode} // Pass isDarkMode as a prop if needed
                />
              ))}
            {filteredExhibitions
              ?.filter((exhibition) => exhibition.status === "closed")
              .map((exhibition) => (
                <ExhibitCard
                  key={exhibition._id}
                  id={exhibition._id}
                  name={exhibition.name}
                  description={exhibition.description}
                  imageUrl={
                    exhibition.imageUrl || "https://via.placeholder.com/150"
                  }
                  location={exhibition.location}
                  artworks={exhibition.artworks?.length}
                  curators={exhibition.curators
                    .map((curator) => curator.name)
                    .join(", ")}
                  status={exhibition.status}
                  openExhibition={openExhibition}
                  isDarkMode={isDarkMode} // Pass isDarkMode as a prop if needed
                />
              ))}
          </>
        ) : (
          filteredExhibitions?.map((exhibition) => (
            <ExhibitCard
              key={exhibition._id}
              id={exhibition._id}
              name={exhibition.name}
              description={exhibition.description}
              imageUrl={
                exhibition.imageUrl || "https://via.placeholder.com/150"
              }
              location={exhibition.location}
              artworks={exhibition.artworks?.length}
              curators={exhibition.curators
                .map((curator) => curator.name)
                .join(", ")}
              status={exhibition.status}
              openExhibition={openExhibition}
              isDarkMode={isDarkMode} // Pass isDarkMode as a prop if needed
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MuseumOwnerExhibitionsList;
