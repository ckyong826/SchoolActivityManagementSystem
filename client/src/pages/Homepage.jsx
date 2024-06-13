import React from 'react';
import ShuffleHero from '../public/HeroComponent';
import ResponsiveAppBar from '../public/HeaderComponent';
import SquishyCard from '../public/CardComponent';
import { Box } from '@mui/material';

const Homepage = () => {
  return (
    <Box >
      <ResponsiveAppBar/>
      <ShuffleHero/>
      <SquishyCard/>
      <SquishyCard/>
    </Box>
  );
};

export default Homepage;