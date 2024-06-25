import React, { useEffect } from 'react';
import SquishyCard from '../../public/components/CardComponent';
import { Box } from '@mui/material';
import {Skeleton } from '@mui/material';
import axiosClient from '../../axios-client'
import { useState } from 'react';
import useGetCurrentUser from '../../hooks/useGetCurrentUser';
import SearchComponent from '../../public/components/searchComponent';
import FilterComponent from '../../public/components/FilterComponent';
import Notification from '../../public/components/modalComponent/widget/useNotification';


const Activities = () => {
    const user = useGetCurrentUser();
  const [loading, setLoading] = React.useState(false);
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
    return (filter === 'All' || activity.category === filter) &&
           activity.activityName.toLowerCase().includes(searchQuery.toLowerCase());
  });
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center mx-10 pt-10">
                <h3 className="text-3xl md:text-5xl font-bold text-center">
                    Find Your Next Perfect Activity!
                </h3>
                <p className="text-md md:text-xl text-slate-700 my-4 md:my-6 text-center w-[80%]">
                    Explore a wide range of activities for every interest. From academic to sports, find and join your next experience with ease!
                </p>

            </div>
            <Box className="flex flex-row w-[80%] justify-center items-center gap-20">
            <SearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            <FilterComponent filter={filter} handleFilter={handleFilter}/>
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
      <Notification text="The activity is registered !" render={render} hideRender={hideRender}/>
        </div>
    );
}

export default Activities;