// import React from 'react';
// import Header from '../common/Header';

// const AdminHeader = () => {
//     return (
//         <div>
//             <Header 
//                 title="Admin Dashboard" 
//                 buttonText="Logout" 
//                 buttonPath="/logout"
//             />
//         </div>
//     );
// };

// export default AdminHeader;


import React from 'react';
import Header from '../common/Header';
import { useLang } from '../../contexts/LangContext';
import sideBarData from "../../data/sideBarData"; // Import sideBarData for links

const AdminHeader = () => {
    const { language } = useLang();

    // Load links for the Admin role based on the current language
    const links = sideBarData.Admin[language] || [];

    return (
        <div>
            <Header links={links} />
        </div>
    );
};

export default AdminHeader;
