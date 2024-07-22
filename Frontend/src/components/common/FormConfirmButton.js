import React, { useState } from 'react';
import ConfirmationDialog from './ConfirmationDialog';

const FormConfirmButton = ({ onSubmit, buttonText, dialogMessage }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [event, setEvent] = useState(null);

    const handleConfirm = () => {
        setShowDialog(false);
        if (event) {
            onSubmit(event);
        }
    };

    const handleCancel = () => {
        setShowDialog(false);
    };

    return (
        <>
            <button
                type="button"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2 flex justify-center"
                onClick={(e) => {
                    e.preventDefault();
                    setEvent(e);
                    setShowDialog(true);
                }}
            >
                {buttonText}
            </button>
            {showDialog && (
                <ConfirmationDialog
                    message={dialogMessage}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </>
    );
};

export default FormConfirmButton;
