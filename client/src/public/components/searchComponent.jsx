// src/components/SearchComponent.js
import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';

const SearchComponent = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <TextField
      label="Search Activities"
      variant="outlined"
      value={searchQuery}
      onChange={handleSearchChange}
      fullWidth
      sx={{ marginTop:1, width:'240px'}}
    />
  );
};

export default SearchComponent;
