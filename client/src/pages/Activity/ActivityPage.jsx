import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import ResponsiveAppBar from '../../public/HeaderComponent';
import AddActivityModal from './Widget/AddActivityModal';
import axiosInstance, { fetchCsrfToken, setCsrfToken } from '../../route/axiosConfig';

const ActivityPage = () => {
  const [activity, setActivity] = useState([
    {
      activityName: '',
      description: '',
      startDateTime: '',
      endDateTime: '',
      maxParticipants: '',
      venue: '',
    },
  ]);

  useEffect(() => {
    const fetchCsrfAndSetToken = async () => {
      try {
        const csrfToken = await fetchCsrfToken();
        setCsrfToken(csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };

    fetchCsrfAndSetToken();
  }, []);

  const handleAddActivity = async () => {
    try {
        const newActivity = {
            activityName: activity.activityName,
            description: activity.description,
            startDateTime: activity.startDateTime,
            endDateTime: activity.endDateTime,
            maxParticipants: activity.maxParticipants,
            venue: activity.venue,
        };
        const response = await axiosInstance.post('/api/activities', newActivity);
        setActivity({
          activityName: '',
          description: '',
          startDateTime: '',
          endDateTime: '',
          maxParticipants: '',
          venue: '',
        });
      } catch (error) {
        console.error('Error adding activity:', error.response?.data || error.message);
      }
};

  const handleEditActivity = (data) => {
    console.log('Activity edited:', data);
  };

  return (
    <Box sx={{ paddingTop: `90px` }}>
      <ResponsiveAppBar />
      <Typography variant="h1" component="h2">
        Activity Page
      </Typography>
      <AddActivityModal
        activity={activity}
        setActivity={setActivity}
        addActivity={handleAddActivity}
      />
    </Box>
  );
};

export default ActivityPage;
