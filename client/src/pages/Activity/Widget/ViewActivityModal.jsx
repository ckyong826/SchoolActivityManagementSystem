import { Button, Modal, Box } from "@mui/material";
import ActivityDetailsCard from "./ActivityDetailsCard";

const ViewActivityModal = ({ open, handleClose, activity }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <Box sx={{ outline: 0 }}>
                <ActivityDetailsCard activity={activity} />
            </Box>
        </Modal>
    );
};
 
export default ViewActivityModal;