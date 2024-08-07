
import React, { useState } from "react";
import ExhibitCard from "../exhibitions/ExhibitCard"; // Adjust the path as needed
import { useMuseumContext } from "../../contexts/MuseumContext";

const MuseumOwnerExhibitionsList = () => {
  const { loading, openExhibition ,exhibitions, museum } = useMuseumContext();

  const [filter, setFilter] = useState("all");

  if (loading) {
    return <div>Loading...</div>;
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Exhibitions</h1>
      <div className="mb-4">
        <a
          href={`https://mensch-visitors.vercel.app/${museum?.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          For visit your museum, click here
        </a>
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Show All
        </button>
        <button
          onClick={() => setFilter("open")}
          className={`px-4 py-2 mx-2 ${
            filter === "open" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Show Opened Exhibitions
        </button>
        <button
          onClick={() => setFilter("closed")}
          className={`px-4 py-2 ${
            filter === "closed" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Show Closed Exhibitions
        </button>
      </div>
      <div className="flex flex-wrap -m-4">
        {filter === "all" ? (
          <>
            <h2 className="w-full text-2xl font-semibold mb-4">
              Opened Exhibitions
            </h2>
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
                />
              ))}
            <h2 className="w-full text-2xl font-semibold mt-6 mb-4">
              Closed Exhibitions
            </h2>
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
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MuseumOwnerExhibitionsList;
