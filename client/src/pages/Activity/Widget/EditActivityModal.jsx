import { Modal } from "@mui/material";
import ActivityFormWidget from "./ActivityFormWidget";

const EditActivityModal = ({
    open,
    handleClose,
    activity,
    setActivity,
    updateActivity
}) => {
    return ( 
        <Modal open={open} onClose={handleClose}>
            <ActivityFormWidget
                initialData={activity}
                setActivityModal={setActivity}
                handleSubmit={updateActivity}
                handleClose={handleClose}
                isEditMode={true}
            />
        </Modal>
     );
}
 
export default EditActivityModal;