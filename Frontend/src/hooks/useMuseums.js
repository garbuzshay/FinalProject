import { useState, useEffect } from 'react';
import museumApi from '../api/MuseumApi'; // Adjust the path as needed

const useMuseums = () => {
    const [museums, setMuseums] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMuseums = async () => {
            setIsLoading(true);
            try {
                const data = await museumApi.getMuseums();
                setMuseums(data); // Make sure this matches the structure of your API response
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchMuseums();
    }, []);

    return { museums, isLoading, error };
};

export default useMuseums;
