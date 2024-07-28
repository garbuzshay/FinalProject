// Frontend/src/components/exhibitions/ExhibitCard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExhibitCard = ({ id, name, description, imageUrl, location, artworks, curators }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`${id}`);
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer" onClick={handleCardClick}>
            <div className="w-full h-48 overflow-hidden">
                <img className="object-cover w-full h-full" src={imageUrl} alt={`${name}`} />
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{name}</div>
                <p className="text-gray-700 text-base">{description}</p>
                {location && <p className="text-gray-700 text-base"><strong>Location:</strong> {location}</p>} 
                <p className="text-gray-700 text-base"><strong>Artworks:</strong> {artworks}</p>
                <p className="text-gray-700 text-base"><strong>Curators:</strong> {curators}</p>
            </div>
        </div>
    );
};

export default ExhibitCard;
