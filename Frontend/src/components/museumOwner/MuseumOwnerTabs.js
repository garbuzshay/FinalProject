// Frontend\src\components\museumOwner\MuseumOwnerTabs.js
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const MuseumOwnerTabs = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex border-b mb-4">
        <NavLink
          to="edit"
          className={({ isActive }) =>
            `px-4 py-2 ${
              isActive
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`
          }
        >
          Edit Exhibition
        </NavLink>
        <NavLink
          to="artworks"
          className={({ isActive }) =>
            `px-4 py-2 ${
              isActive
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`
          }
        >
          View Artworks
        </NavLink>
        <NavLink
          to="add-artwork"
          className={({ isActive }) =>
            `px-4 py-2 ${
              isActive
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`
          }
        >
          Add New Artwork
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default MuseumOwnerTabs;
