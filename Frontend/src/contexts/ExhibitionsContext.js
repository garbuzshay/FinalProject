import React, { createContext, useContext } from 'react';
import useUserExhibitions from '../hooks/useUserExhibitions';

const ExhibitionsContext = createContext();

export const ExhibitionsProvider = ({ children }) => {
    const { exhibitions, isLoading, error } = useUserExhibitions();

    return (
        <ExhibitionsContext.Provider value={{ exhibitions, isLoading, error }}>
            {children}
        </ExhibitionsContext.Provider>
    );
};

export const useExhibitions = () => {
    const context = useContext(ExhibitionsContext);
    if (!context) {
        throw new Error('useExhibitions must be used within an ExhibitionsProvider');
    }
    return context;
};
