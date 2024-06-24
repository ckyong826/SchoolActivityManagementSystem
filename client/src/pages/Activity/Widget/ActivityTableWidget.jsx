import { Box, Typography, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";
import ViewActivityModal from "./ViewActivityModal";
import EditActivityModal from "./EditActivityModal";

const ActivityTableWidget = ({
    activity,
    setActivity,
    activityList,
    updateActivity,
}) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [activityModal, setActivityModal] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [selectedActivityID, setSelectedActivityID] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const columns = [
        { field: 'activityID', headerName: 'Activity ID', flex: 1 },
        { field: 'activityName', headerName: 'Activity Name', flex: 1 },
        { field: 'venue', headerName: 'Venue', flex: 1 },
        { field: 'startDateTime', headerName: 'Start Date & Time', flex: 1},
        { field: 'endDateTime', headerName: 'End Date & Time', flex: 1 },
        { field: 'category', headerName: 'Category', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
            <div>
                <IconButton onClick={() => openViewDialog(params.row.activityID)}>
                <VisibilityIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => openEditModal(params.row.activityID)}>
                <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => {}}>
                <DeleteIcon color="error" />
                </IconButton>
            </div>
            ),
        },
    ];
    
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
                    venue:  activity.venue,
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
        <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
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
                        backgroundColor: '#fafafa',
                        borderBottom: '1px solid #ddd',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: '#f1f1f1',
                    },
                    '& .MuiDataGrid-row': {
                        '& .MuiIconButton-root': {
                            color: '#5f6368',
                            '&:hover': {
                                color: '#1a73e8',
                            },
                        },
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
        </Box>
    );
}

export default ActivityTableWidget;
