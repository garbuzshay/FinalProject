import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersApi from '../../api/UsersApi';
import museumApi from '../../api/MuseumApi';


const Header = ({ buttonText, buttonPath }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await usersApi.getCurrentUser();
                if (user.role === 'Admin') {
                    setTitle('Admin Dashboard');
                } else if (user.role === 'MuseumOwner') {
                    const museum = await museumApi.getMuseumByOwner();
                    setTitle(`Hello ${user.name}, Wellcome to ${museum.name} CMS `);
                } else if (user.role === 'Curator') {
                  // to fill///
                  const museum = await museumApi.getMuseumByCurator(user._id);
                    setTitle(`Hello ${user.name}, Welcome to the Curators area in ${museum.name} museum CMS`);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    const handleButtonClick = () => {
        navigate(buttonPath);
    };

    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
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

export default Header;
