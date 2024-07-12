import React from 'react';
import Header from '../common/Header';

const CuratorHeader = () => {
    return (
        <div>
            <Header 
                title="Curator Dashboard" 
                buttonText="Logout" 
                buttonPath="/" // Adjust this path according to your application's routing
            />
        </div>
    );
};

export default CuratorHeader;
