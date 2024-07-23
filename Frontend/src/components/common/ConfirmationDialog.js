// Frontend\src\components\common\ConfirmationDialog.js

import React from 'react';

const ConfirmationDialog = ({ message, onConfirm, onCancel, type="button" }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg text-center">
                <p className="mb-4">{message}</p>
                <div className="flex justify-center">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        onClick={onConfirm}
                        type={type}
                    >
                        Yes
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={onCancel}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
