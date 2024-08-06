import React, { createContext, useState, useContext } from 'react';

const MuseumContext = createContext();

export const MuseumProvider = ({ children }) => {
  const [museum, setMuseum] = useState(null);
  const [exhibitions, setExhibitions] = useState([]);

  return (
    <MuseumContext.Provider value={{ museum, setMuseum, exhibitions, setExhibitions }}>
      {children}
    </MuseumContext.Provider>
  );
};

export const useMuseum = () => useContext(MuseumContext);
