// Frontend/src/components/common/ConfirmationDialog.js

import React from 'react';

const ConfirmationDialog = ({ message, onConfirm, onCancel, type = "button" }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-left">
                <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
                <p className="mb-6 text-gray-700">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded transition duration-200"
                        onClick={onCancel}
                    >
                        No
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition duration-200"
                        onClick={onConfirm}
                        type={type}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
