import React from 'react';
import ShuffleHero from '../public/HeroComponent';
import ResponsiveAppBar from '../public/HeaderComponent';
import SquishyCard from '../public/CardComponent';

const Homepage = () => {
  return (
    <div>
      <ResponsiveAppBar/>
      <ShuffleHero/>
      <SquishyCard/>
      <SquishyCard/>
    </div>
  );
};

export default Homepage;