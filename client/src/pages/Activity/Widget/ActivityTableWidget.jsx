import { Box, Icon, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";
import ViewActivityModal from "./ViewActivityModal";
import EditActivityModal from "./EditActivityModal";
import DeleteActivityModal from "./DeleteActivityModal";
import PersonIcon from '@mui/icons-material/Person';
import ParticipantsListModal from "./ParticipantsListModal";

const ActivityTableWidget = ({
    activity,
    setActivity,
    activityList,
    updateActivity,
    deleteActivity,
}) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [activityModal, setActivityModal] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [participantsDialogOpen, setParticipantsDialogOpen] = useState(false);
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [selectedActivityID, setSelectedActivityID] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const columns = [
        { field: 'activityID', headerName: 'Activity ID', flex: 1 },
        { field: 'activityName', headerName: 'Activity Name', flex: 1 },
        { field: 'venue', headerName: 'Venue', flex: 1 },
        { field: 'startDateTime', headerName: 'Start Date & Time', flex: 1 },
        { field: 'endDateTime', headerName: 'End Date & Time', flex: 1 },
        { field: 'category', headerName: 'Category', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <div>
                    <IconButton onClick={() => openViewDialog(params.row.activityID)}>
                        <VisibilityIcon color="indigo" />
                    </IconButton>
                    <IconButton onClick={() => openEditModal(params.row.activityID)}>
                        <EditIcon color="indigo" />
                    </IconButton>
                    <IconButton onClick={() => openParticipantsDialog(params.row.activityID)}>
                        <PersonIcon color="indigo" />
                    </IconButton>
                    <IconButton onClick={() => openDeleteModal(params.row.activityID)}>
                        <DeleteIcon color="error" />
                    </IconButton>

                </div>
            ),
        },
    ];

    // Delete activity modal
    const openDeleteModal = (activityID) => {
        setSelectedActivityID(activityID);
        setDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
        setSelectedActivityID(null);
    };

    const handleConfirmDelete = (activityID) => {
        deleteActivity(activityID);
        handleCloseDeleteModal();
    };

    // Edit activity modal
    const openEditModal = (activityID) => {
        activityList.forEach((activity) => {
            if (activity.activityID === activityID) {
                setActivity({
                    activityID: activity.activityID,
                    activityName: activity.activityName,
                    description: activity.description,
                    startDateTime: activity.startDateTime,
                    endDateTime: activity.endDateTime,
                    maxParticipants: activity.maxParticipants,
                    category: activity.category,
                    venue: activity.venue,
                });
            }
        });
        setActivityModal(true);
    }

    const handleCloseEditModal = () => {
        setActivityModal(false);
        setActivity({
            activityName: '',
            description: '',
            startDateTime: '',
            endDateTime: '',
            maxParticipants: '',
            category: '',
            venue: '',
        });
    };

    const handleUpdateActivity = () => {
        updateActivity();
        handleCloseEditModal();
    }

    // View participants modal
    const openParticipantsDialog = (activityID) => {
        activityList.forEach((activity) => {
            if (activity.activityID === activityID) {
                setSelectedParticipants(activity.users);
            }
        });
        setParticipantsDialogOpen(true);
    };

    const closeParticipantsDialog = () => {
        setParticipantsDialogOpen(false);
        setSelectedParticipants([]);
    }

    // View activity dialog
    const openViewDialog = (activityID) => {
        activityList.forEach((activity) => {
            if (activity.activityID === activityID) {
                setSelectedActivity(activity);
            }
        });
        setViewDialogOpen(true);
    };

    const closeViewDialog = () => {
        setViewDialogOpen(false);
        setSelectedActivity(null);
    }

    const getRowId = (row) => row.activityID;

    return (
        <Box sx={{ padding: 2, backgroundColor: '#e8eaf6', borderRadius: 2, boxShadow: 3 }}>
            <DataGrid
                rows={activityList}
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
                    '& .MuiDataGrid-row': {
                        '& .MuiIconButton-root': {
                            color: '#5f6368',
                            '&:hover': {
                                color: '#1a73e8',
                            },
                        },
                    },
                    '& .MuiDataGrid-row:nth-of-type(even)': {
                        backgroundColor: '#f3e5f5',
                    },
                }}
            />
            <ViewActivityModal
                open={viewDialogOpen}
                handleClose={closeViewDialog}
                activity={selectedActivity}
            />
            <EditActivityModal
                open={activityModal}
                handleClose={handleCloseEditModal}
                activity={activity}
                setActivity={setActivity}
                updateActivity={handleUpdateActivity}
            />
            <DeleteActivityModal    
                open={deleteModalOpen}
                handleClose={handleCloseDeleteModal}
                handleConfirm={handleConfirmDelete}
                activityID={selectedActivityID}
            />
            <ParticipantsListModal
                open={participantsDialogOpen}
                handleClose={closeParticipantsDialog}
                participantsList={selectedParticipants}
            />
        </Box>
    );
}

export default ActivityTableWidget;
