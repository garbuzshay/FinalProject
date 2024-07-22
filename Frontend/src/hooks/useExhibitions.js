import { useState, useEffect } from 'react';
import exhibitionsApi from '../api/ExhibitionsApi'; // Adjust the path as needed

const useExhibitions = () => {
    const [exhibitions, setExhibitions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExhibitions = async () => {
            setIsLoading(true);
            try {
                const data = await exhibitionsApi.getExhibitions();
                setExhibitions(data); // Make sure this matches the structure of your API response
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchExhibitions();
    }, []);

    return { exhibitions, isLoading, error };
};

export default useExhibitions;

