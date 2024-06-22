import React from 'react';
import { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import ActivityFormWidget from './ActivityFormWidget';

const AddActivityModal = ({
    activity,
    setActivity,
    addActivity
}) => {

    const [activityModal, setActivityModal] = useState(false);
    const handleModalOpen = () => setActivityModal(true);
    const handleModalClose = () => {
        setActivityModal(false);
        setActivity({
            activityName: '',
            description: '',
            startDateTime: '',
            endDateTime: '',
            maxParticipants: '',
            venue: '',
        });
    }

  return (
    <>
        <Button variant="contained" color="indigo" onClick={handleModalOpen}>Add Activity</Button>
        <Modal
        open={activityModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <ActivityFormWidget
                initialData={activity}
                setActivityModal={setActivity}
                handleSubmit={addActivity}
                handleClose={handleModalClose}
                isEditMode={false}
            />
        </Modal>
    </>
    
  );
};

export default AddActivityModal;
