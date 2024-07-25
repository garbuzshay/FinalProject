import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';

const Header = ({ buttonText, buttonPath }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const { user } = useUserContext();

    useEffect(() => {
        const getTitle = () => {
            if (!user || !user.role) return;

            switch (user.role.roleName) {
                case 'Admin':
                    return 'Admin Dashboard';
                case 'MuseumOwner':
                    return `Hello ${user.name}, Welcome to ${user.museum? user.museum.name : "your museum "} CMS`;
                case 'Curator':
                    return `Hello ${user.name}, Welcome to the Curator's area in ${user.museum.name} CMS`;
                default:
                    return '';
            }
        };

        setTitle(getTitle());
    }, [user]);

    const handleButtonClick = () => {
        navigate(buttonPath);
    };

    return (
        <header className="shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold sm:text-lg">{title}</h1>
            <div className="sm:mt-2">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded sm:px-3 sm:py-1"
                    onClick={handleButtonClick}
                >
                    {buttonText}
                </button>
            </div>
        </header>
    );
};

export default Header
