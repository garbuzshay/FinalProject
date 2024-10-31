import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import MuseumHeader from '../components/MuseumHeader';
import { useMuseum } from '../contexts/MuseumContext';
import { useMuseumApi } from '../hooks/useMuseumApi';

const MuseumLayout = () => {
  const { museumName } = useParams();
  const { museum, setMuseum, exhibitions, setExhibitions } = useMuseum();
  const { fetchMuseumDetails } = useMuseumApi();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!museum || !exhibitions || museum.name !== museumName) {
        setLoading(true);
        try {
          const data = await fetchMuseumDetails(museumName);
          setMuseum(data.museum);
          setExhibitions(data.exhibitions);
        } catch (error) {
          console.error("Error fetching museum data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [museumName, museum, exhibitions, fetchMuseumDetails, setMuseum, setExhibitions]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <MuseumHeader title={museum.name} address={museum.address} state={museum.state} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MuseumLayout;
