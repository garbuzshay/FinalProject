// import React from 'react';

// const Header = ({ title, buttonText }) => {
//     return (
//         <header className="bg-white shadow p-4 flex justify-between items-center">
//             <h1 className="text-xl font-semibold sm:text-lg">{title}</h1>
//             <div className="sm:mt-2">
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded sm:px-3 sm:py-1">{buttonText}</button>
//             </div>
//         </header>
//     );
// };

// export default Header;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, buttonText, buttonPath }) => {
    const navigate = useNavigate();

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
