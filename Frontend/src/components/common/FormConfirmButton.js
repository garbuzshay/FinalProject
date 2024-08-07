
// Frontend\src\components\common\FormConfirmButton.js

import React, { useState } from 'react';
import ConfirmationDialog from './ConfirmationDialog';

const FormConfirmButton = ({ onSubmit, buttonText, dialogMessage, className }) => {
    const [showDialog, setShowDialog] = useState(false);

    const defaultClassName = 'w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2 flex justify-center';
    const handleConfirm = () => {
        setShowDialog(false);
        onSubmit();
    };

    const handleCancel = () => {
        setShowDialog(false);
    };

    const handleClick = (e) => {
        e.preventDefault();
        setShowDialog(true);
    };

    return (
        <>
            <button
                type="button"
                className={className || defaultClassName}
                onClick={handleClick}

            >
                {buttonText}
            </button>
            {showDialog && (
                <ConfirmationDialog
                    type="submit"
                    message={dialogMessage}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}

                />
            )}
        </>
    );
};

export default FormConfirmButton;
