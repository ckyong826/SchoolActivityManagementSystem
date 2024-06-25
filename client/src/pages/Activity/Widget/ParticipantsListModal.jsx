import { Box, Modal, Typography, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const ParticipantsListModal = ({ open, handleClose, participantsList }) => {

    const columns = [
        { field: 'userID', headerName: 'User ID', flex: 1 },
        { field: 'firstName', headerName: 'First Name', flex: 1 },
        { field: 'lastName', headerName: 'Last Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'matrikNumber', headerName: 'Matric Number', flex: 1 },
        { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 },
    ];

    // Flatten the data to be used in the DataGrid
    const rows = participantsList.map(participant => ({
        userID: participant.userID,
        firstName: participant.profile?.firstName || '',
        lastName: participant.profile?.lastName || '',
        email: participant.email,
        matrikNumber: participant.profile?.matrikNumber || '',
        phoneNumber: participant.profile?.phoneNumber || '',
    }));

    const getRowId = (row) => row.userID;

    return (
        <Modal open={open} onClose={handleClose}>
            <Box 
                sx={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    width: '80%', 
                    bgcolor: 'background.paper', 
                    borderRadius: 8, // Rounded border
                    boxShadow: 24, // Shadow
                    p: 4 
                }}
            >
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    Participants List
                </Typography>
                <Container sx={{ maxHeight: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        getRowId={getRowId}
                        hideFooter={true}
                        autoHeight
                        sx={{
                            '& .MuiDataGrid-root': {
                                border: 'none',
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom: '1px solid #ddd',
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#7986cb',
                                borderBottom: '1px solid #ddd',
                            },
                            '& .MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 'bold',
                                color: '#000',
                            },
                            '& .MuiDataGrid-row:hover': {
                                backgroundColor: '#c5cae9',
                            },
                            '& .MuiDataGrid-row:nth-of-type(even)': {
                                backgroundColor: '#f3e5f5',
                            },
                        }}
                    />
                </Container>
            </Box>
        </Modal>
    );
}

export default ParticipantsListModal;
