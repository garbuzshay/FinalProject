
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
