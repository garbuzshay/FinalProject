// src/components/admin/AdminDashboard.js
import React from "react";
import MuseumCard from "../../museums/MuseumCard" 
import museumsData from "../../data/museumsData";
import ExhibitCard from "../exhibitions/ExhibitCard";
import exhibitionsData from "../../data/exhibitionsData";

const AdminDashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-5">Dashboard</h2>

      <p className="mt-5">The most visited museums</p>
      <div className="flex flex-wrap justify-center">
        {museumsData.map((museum, index) => (
          <MuseumCard
            key={index}
            name={museum.name}
            description={museum.description}
            imageUrl={museum.imageUrl}
            location={museum.location}
            exhibitions={museum.exhibitions}
            artworks={museum.artworks}
          />
        ))}
      </div>

      <p className="mt-5">The most visited exhibitions</p>
      <div className="flex flex-wrap justify-center">
        {exhibitionsData.map((exhibit, index) => (
          <ExhibitCard
            key={index}
            name={exhibit.name}
            description={exhibit.description}
            imageUrl={exhibit.imageUrl}
            location={exhibit.location}
            artworks={exhibit.artworks}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
