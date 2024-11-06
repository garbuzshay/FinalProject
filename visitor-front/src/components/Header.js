import React from 'react';

const Header = ({ museumData, LogoutButton }) => {
  return (
    <div className="flex justify-between items-center px-4
     bg-gray-200  transition-colors shadow-lg ">
      <div>
        <h1 className="text-3xl font-bold">{museumData.name}</h1>
        <p className="text-lg ">
          {museumData.address}, {museumData.state}
        </p>
      </div>
      <LogoutButton /> {/* Logout button */}
    </div>
  );
};

export default Header;
