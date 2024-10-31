// import React, { createContext, useState, useContext } from 'react';

// const MuseumContext = createContext();

// export const MuseumProvider = ({ children }) => {
//   const [museum, setMuseum] = useState(null);
//   const [exhibitions, setExhibitions] = useState([]);

//   return (
//     <MuseumContext.Provider value={{ museum, setMuseum, exhibitions, setExhibitions }}>
//       {children}
//     </MuseumContext.Provider>
//   );
// };

// export const useMuseum = () => useContext(MuseumContext);


import React, { createContext, useState, useContext, useEffect } from 'react';

const MuseumContext = createContext();
const TOKEN_EXPIRY_TIME = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

export const MuseumProvider = ({ children }) => {
  const [museum, setMuseum] = useState(null);
  const [exhibitions, setExhibitions] = useState([]);
  const [artworks, setArtworks] = useState([]);

  // Check if the token is valid (exists and not expired)
  const validateMuseumToken = () => {
    const lastVisitTimestamp = localStorage.getItem('visitTimestamp');
    const currentTime = Date.now();
    return lastVisitTimestamp && currentTime - Number(lastVisitTimestamp) < TOKEN_EXPIRY_TIME;
  };

  // Initialize museum data and set the token only if it's a first visit or an expired session
  const initializeMuseumData = (museumData) => {
    // Set state for museum data
    setMuseum(museumData.museum);
    setExhibitions(museumData.exhibitions || []);
    setArtworks(museumData.exhibitions?.flatMap((exhibition) => exhibition.artworks) || []);

    // Set museum data only if the token has expired or is missing
    if (!validateMuseumToken()) {
      localStorage.setItem('museumData', JSON.stringify({
        museum: museumData.museum,
        exhibitions: museumData.exhibitions || [],
        artworks: museumData.exhibitions?.flatMap((exhibition) => exhibition.artworks) || []
      }));
      localStorage.setItem('visitTimestamp', Date.now().toString());
    }
  };

  // Load existing data on initial render if token is valid
  useEffect(() => {
    if (validateMuseumToken()) {
      const savedMuseumData = localStorage.getItem('museumData');
      if (savedMuseumData) {
        const { museum, exhibitions, artworks } = JSON.parse(savedMuseumData);
        setMuseum(museum);
        setExhibitions(exhibitions);
        setArtworks(artworks);
      }
    } else {
      localStorage.removeItem('museumData');
      localStorage.removeItem('visitTimestamp');
    }
  }, []);

  return (
    <MuseumContext.Provider value={{
      museum,
      exhibitions,
      artworks,
      initializeMuseumData,
      validateMuseumToken
    }}>
      {children}
    </MuseumContext.Provider>
  );
};

export const useMuseum = () => useContext(MuseumContext);
