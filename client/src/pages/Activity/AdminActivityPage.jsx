import React, { useState, useEffect } from 'react';
import { Typography, Box, Container } from '@mui/material';
import ResponsiveAppBar from '../../public/HeaderComponent';
import AddActivityModal from './Widget/AddActivityModal';
import axiosClient from '../../axios-client';
import ActivityTableWidget from './Widget/ActivityTableWidget';

const AdminActivityPage = () => {
  const [activity, setActivity] = useState([
    {
      activityName: '',
      description: '',
      startDateTime: '',
      endDateTime: '',
      maxParticipants: '',
      category: '',
      venue: '',
    },
  ]);

  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axiosClient.get('/activities');
        setActivityList(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error.response?.data || error.message);
      }
    };

    fetchActivities();
  }, [activity]);


  const handleAddActivity = async () => {
    try {
        const newActivity = {
            activityName: activity.activityName,
            description: activity.description,
            startDateTime: activity.startDateTime,
            endDateTime: activity.endDateTime,
            maxParticipants: activity.maxParticipants,
            venue: activity.venue,
            category: activity.category,
        };
        const response = await axiosClient.post('/activities', newActivity);
        setActivity({
          activityName: '',
          description: '',
          startDateTime: '',
          endDateTime: '',
          maxParticipants: '',
          venue: '',
          category: '',
        });
      } catch (error) {
        console.error('Error adding activity:', error.response?.data || error.message);
      }
};

  const handleEditActivity = async () => {
    try {
        console.log('activity:', activity);
        const response = await axiosClient.put(`/activities/${activity.activityID}`, activity);
    } catch (error) {
        console.error('Error editing activity:', error.response ? error.response.data : error.message);
    }
  };

  return (

    <Container maxWidth="xl">
        <Box sx={{ paddingTop: `90px` }}>
      <ResponsiveAppBar />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h3" component="h2">
            Activity List
          </Typography>
          <AddActivityModal
            activity={activity}
            setActivity={setActivity}
            addActivity={handleAddActivity}
          />
      </Box>
      <ActivityTableWidget
        activity={activity}
        setActivity={setActivity}
        activityList={activityList}
        updateActivity={handleEditActivity}
      />
    </Box>
    </Container>
  );
};

export default AdminActivityPage;
