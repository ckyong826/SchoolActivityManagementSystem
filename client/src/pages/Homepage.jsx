import React, { useEffect } from 'react';
import ShuffleHero from '../public/HeroComponent';
import ResponsiveAppBar from '../public/components/HeaderComponent';
import SquishyCard from '../public/components/CardComponent';
import { Box, Typography } from '@mui/material';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import {Skeleton } from '@mui/material';
import Notification from '../public/modal/widget/useNotification';
import FilterComponent from '../public/components/FilterComponent';

const dummyData = [
  { tag: "Academic", title: "Dummy Event 1", description: "This is the description for Dummy Event 1" },
  { tag: "Sports", title: "Dummy Event 2", description: "This is the description for Dummy Event 2" },
  { tag: "Music", title: "Dummy Event 3", description: "This is the description for Dummy Event 3" },
  { tag: "Academic", title: "Dummy Event 1", description: "This is the description for Dummy Event 1" },
  { tag: "Sports", title: "Dummy Event 2", description: "This is the description for Dummy Event 2" },
  { tag: "Music", title: "Dummy Event 3", description: "This is the description for Dummy Event 3" },
  { tag: "Academic", title: "Dummy Event 1", description: "This is the description for Dummy Event 1" },
  { tag: "Sports", title: "Dummy Event 2", description: "This is the description for Dummy Event 2" },
  { tag: "Music", title: "Dummy Event 3", description: "This is the description for Dummy Event 3" },
  { tag: "Academic", title: "Dummy Event 1", description: "This is the description for Dummy Event 1" },
  { tag: "Sports", title: "Dummy Event 2", description: "This is the description for Dummy Event 2" },
  { tag: "Music", title: "Dummy Event 3", description: "This is the description for Dummy Event 3" },
  { tag: "Academic", title: "Dummy Event 1", description: "This is the description for Dummy Event 1" },
  { tag: "Sports", title: "Dummy Event 2", description: "This is the description for Dummy Event 2" },
  { tag: "Music", title: "Dummy Event 3", description: "This is the description for Dummy Event 3" },
  { tag: "Academic", title: "Dummy Event 1", description: "This is the description for Dummy Event 1" },
  { tag: "Sports", title: "Dummy Event 2", description: "This is the description for Dummy Event 2" },
  { tag: "Music", title: "Dummy Event 3", description: "This is the description for Dummy Event 3" },
];

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
  const [render, setRender] = React.useState(false);
  const hideRender = () => {
    setRender(false);
  }
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <ThemeProvider theme={theme}>
    <Box >
      <ResponsiveAppBar/>
      <ShuffleHero/>
      <Box  sx={{height:100, display:"flex", justifyContent:'space-between',alignItems:'center', paddingX:24}}>
        <p className="text-4xl font-bold font-mono text-center" >Features</p>
        <FilterComponent/>
      </Box>
      <Box  className="w-[80%] grid grid-cols-4 max-md:grid-cols-1 max-lg:grid-cols-2 max-2xl:grid-cols-3 gap-4 max-w-8xl mx-auto px-4 py-8" >
        {loading?dummyData.map((data, index) => (
          <Skeleton key={index} variant="rounded" className='rounded border-2 mx-auto w-fit'  >
            <SquishyCard key={index} {...data} setRender={setRender}/>
          </Skeleton>
        )):
        dummyData.map((data, index) => (
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