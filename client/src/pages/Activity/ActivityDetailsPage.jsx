import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { Typography, Container, Box, Card, CardContent, CircularProgress, Grid, Avatar, Paper, Button } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import PeopleIcon from '@mui/icons-material/People';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';

const ActivityDetailsPage = () => {
  const { activityID } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axiosClient.get(`/activities/${activityID}`);
        setActivity(response.data);
      } catch (error) {
        console.error('Error fetching activity details:', error.response?.data || error.message);
      }
    };

    fetchActivity();
  }, [activityID]);

  const handleEdit = () => {
    // Implement edit functionality here
    console.log('Edit button clicked');
  };

  const handleDelete = () => {
    // Implement delete functionality here
    console.log('Delete button clicked');
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    // Add more columns as needed
  ];

  const rows = activity ? activity.users.map((user, index) => ({
    id: index + 1,
    name: user.name,
    email: user.email,
    // Add more fields as needed
  })) : [];

  if (!activity) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ minHeight: '100vh', padding: 3, backgroundColor: '#f5f5f5' }}>
      <Container>
        <Box sx={{ paddingTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ maxWidth: 800, width: '100%', borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {activity.activityName}
                </Typography>
                <Box>
                  <Button variant="outlined" startIcon={<EditIcon />} onClick={handleEdit} sx={{ marginRight: 1 }}>
                    Edit
                  </Button>
                  <Button variant="outlined" startIcon={<DeleteIcon />} color="error" onClick={handleDelete}>
                    Delete
                  </Button>
                </Box>
              </Box>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {activity.description}
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <EventIcon />
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="textSecondary">
                    Start: {new Date(activity.startDateTime).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    End: {new Date(activity.endDateTime).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
                <Grid item>
                  <PlaceIcon />
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="textSecondary">
                    Venue: {activity.venue}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
                <Grid item>
                  <PeopleIcon />
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="textSecondary">
                    Participants: {activity.users.length} / {activity.maxParticipants}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
                <Grid item>
                  <Avatar>
                    <Typography variant="body2" color="textSecondary">
                      {activity.category.charAt(0).toUpperCase()}
                    </Typography>
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="textSecondary">
                    Category: {activity.category}
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={{ height: 400, width: '100%', marginTop: 3 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Participants
                </Typography>
                <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Paper>
  );
};

export default ActivityDetailsPage;
