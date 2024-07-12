import React from 'react';
import Header from '../common/Header';

const AdminHeader = () => {
    return (
        <div>
            <Header 
                title="Admin Dashboard" 
                buttonText="Logout" 
                buttonPath="/admin"
            />
        </div>
    );
};

export default AdminHeader;
