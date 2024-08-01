// Frontend/src/components/exhibitions/ExhibitCard.js

import React from "react";
import { useNavigate } from "react-router-dom";
import FormConfirmButton from "../common/FormConfirmButton"; // Adjust the path as needed
import { useUserContext } from "../../contexts/UserContext";

const ExhibitCard = ({
  id,
  name,
  description,
  imageUrl,
  location,
  artworks,
  curators,
  status,
  openExhibition,
}) => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const handleCardClick = () => {
    if (status === "open") {
      navigate(`${id}`);
    }
  };

  const handleOpenExhibition = () => {
    openExhibition(id);
  };

  return (
    <div
      className={`max-w-sm rounded overflow-hidden shadow-lg m-4 ${
        status === "open" ? "cursor-pointer" : "cursor-default"
      }`}
      onClick={handleCardClick}
    >
      <div className="w-full h-48 overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src={imageUrl}
          alt={`${name}`}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base mb-2">{description}</p>
        {location && (
          <div className="flex mb-2">
            <span className="font-semibold text-gray-700">Location:</span>
            <span className="text-gray-700 ml-1">{location}</span>
          </div>
        )}
        <div className="flex mb-2">
          <span className="font-semibold text-gray-700">Artworks:</span>
          <span className="text-gray-700 ml-1">{artworks}</span>
        </div>
        <div className="flex">
          <span className="font-semibold text-gray-700">Curators:</span>
          <span className="text-gray-700 ml-1">{curators}</span>
        </div>
        {status === "closed" && user?.role?.roleName === "MuseumOwner" && (
          <div className="mt-3 text-gray-500 flex justify-end">
            <FormConfirmButton
              onSubmit={handleOpenExhibition}
              buttonText="Re-open?"
              dialogMessage="Are you sure you want to re-open this exhibition?"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
            />
          </div>
        )}
      </div>

    </div>
  );
};

export default ExhibitCard;


// Frontend/src/components/exhibitions/ExhibitCard.js
