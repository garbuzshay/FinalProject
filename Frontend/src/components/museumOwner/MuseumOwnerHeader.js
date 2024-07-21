// import React from 'react';
// import Header from '../common/Header';

// const MuseumOwnerHeader = () => {
//     return (
//         <div>
//             <Header 
//                 title="Museum Owner Dashboard" 
//                 buttonText="Logout" 
//                 buttonPath="/logout" // Adjust this path according to your application's routing
//             />
//         </div>
//     );
// };

// export default MuseumOwnerHeader;
import React from 'react';
import Header from '../common/Header';

const MuseumOwnerHeader = () => {
    return (
        <div>
            <Header 
                buttonText="Logout"
                buttonPath="/logout"
            />
        </div>
    );
};

export default MuseumOwnerHeader;
