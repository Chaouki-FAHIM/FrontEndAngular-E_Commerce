import React from 'react';
import { Toast } from 'react-bootstrap';

const DynamicToast = ({ showToast, setShowToast, toastMessage }) => {
    const handleClose = () => setShowToast(false);

    return (
        <Toast show={showToast} onClose={handleClose}>
            <Toast.Header>
                <strong className="me-auto">Speed Shop</strong>
                <small className="text-muted">Maintenant</small>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
    );
};

export default DynamicToast;
