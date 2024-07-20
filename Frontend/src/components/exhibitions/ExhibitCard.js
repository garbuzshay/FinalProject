
import React from 'react';

const ExhibitCard = ({ name, description, imageUrl, location, artworks }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <div className="w-full h-48 overflow-hidden">
                <img className="object-cover w-full h-full cursor-pointer" src={imageUrl} alt={`${name}`} />
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{name}</div>
                <p className="text-gray-700 text-base">{description}</p>
                <p className="text-gray-700 text-base"><strong>Location:</strong> {location}</p>
                <p className="text-gray-700 text-base"><strong>Artworks:</strong> {artworks}</p>
            </div>
        </div>
    );
};

export default ExhibitCard;
