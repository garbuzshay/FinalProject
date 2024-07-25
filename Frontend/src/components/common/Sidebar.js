// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ links }) => {
  if (!links || links.length === 0) {
    return (
      <div className="h-full bg-gray-800 text-white w-64 p-5 md:w-64 sm:w-48 sm:p-3">
        <h2 className="text-2xl font-semibold mb-5 sm:text-xl">Waiting for museum to be approved</h2>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-800 text-white w-64 p-5 md:w-64 sm:w-48 sm:p-3">
      <h2 className="text-2xl font-semibold mb-5 sm:text-xl">
        <Link to={links[0].path}>{links[0].name}</Link>
      </h2>
      <nav>
        <ul>
          {links.slice(1).map((link, index) => (
            <li key={index} className="mb-4">
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
