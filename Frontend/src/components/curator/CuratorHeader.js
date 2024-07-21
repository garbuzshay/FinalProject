import React from 'react';
import Header from '../common/Header';

const CuratorHeader = () => {
    return (
        <div>
            <Header 
                buttonText="Logout"
                buttonPath="/logout"
            />
        </div>
    );
};

export default CuratorHeader;
