import React, { useEffect } from 'react';
import ShuffleHero from '../public/components/HeroComponent';
import ResponsiveAppBar from '../public/components/HeaderComponent';
import SquishyCard from '../public/components/CardComponent';
import { Box, Typography } from '@mui/material';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import {Skeleton } from '@mui/material';
import Notification from '../public/components/modalComponent/widget/useNotification';
import FilterComponent from '../public/components/FilterComponent';
import axiosClient from '../axios-client';
import { useState } from 'react';
import SearchComponent from '../public/components/searchComponent';


const theme = createTheme({
  palette: {
    indigo: {
      main: '#6366F1',
      light: '#9CA3AF',
      dark: '#4f46e5',
      contrastText: '#fff',
    },
  },
});

const Homepage = () => {
  const user = useGetCurrentUser();
  const [loading, setLoading] = React.useState(false);
  const [registration, setRegistration] = useState([]);
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
    const fetchRegestration = async () => {
      try {
        const response = await axiosClient.get(`/registration/${user?.userID}`);
        setRegistration(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error.response?.data || error.message);
      }
    }
    fetchRegestration();
  }, [user]);


  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get('/activities');
        setActivityList(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error.response?.data || error.message);
      }
    };

    fetchActivities();
    setLoading(false);
  }, [activity]);

  
  const [render, setRender] = React.useState(false);
  const hideRender = () => {
    setRender(false);
  }

  const [filter, setFilter] = React.useState('All');
  const handleFilter = (e) => {
    setFilter(e.target.value);
  }

  const [searchQuery, setSearchQuery] = useState('');
  const filteredAndSearchedActivities = activityList.filter(activity => {
    const isRegistered = registration.some(reg => reg.activityID === activity.activityID);
    
    return (filter === 'All' || activity.category === filter) &&
           activity.activityName.toLowerCase().includes(searchQuery.toLowerCase()) &&
           !isRegistered;
});

  return (
    <ThemeProvider theme={theme}>
    <Box >
      <ResponsiveAppBar/>
      <ShuffleHero/>
      <Box  sx={{height:100, display:"flex", justifyContent:'space-between',alignItems:'center', paddingX:24, flexDirection:{xs:'column',md:'row'}}}>
        <p className="text-4xl font-bold font-mono text-center" >Features</p>
        <div className='flex flex-row justify-center gap-4 items-center'>
          <SearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          <FilterComponent filter={filter} handleFilter={handleFilter}/>
        </div>
      </Box>
      <Box  className="w-[80%] h-[70vh] grid grid-cols-4 max-md:grid-cols-1 max-lg:grid-cols-2 max-2xl:grid-cols-3 gap-4 max-w-8xl mx-auto px-4 py-8" >
        {loading?filteredAndSearchedActivities.map((data, index) => (
          <Skeleton key={index} variant="rounded" className='rounded border-2 mx-auto w-fit'  >
            <SquishyCard key={index} {...data} setRender={setRender}/>
          </Skeleton>
        )):
        filteredAndSearchedActivities.map((data, index) => (
          <SquishyCard key={index} {...data} setRender={setRender}/>
        ))
      }
      </Box>
    </Box>
    <Notification text="The activity is registered !" render={render} hideRender={hideRender}/>
    </ThemeProvider>
  );
};

export default Homepage;