import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterComponent(props) {

  return (
    <Box sx={{ minWidth: 120 }} >
      <FormControl fullWidth margin="normal">
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category-label"
          label="Category"
          name="category"
          value={props.filter}
          onChange={props.handleFilter}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Seminar">Seminar</MenuItem>
          <MenuItem value="Workshop">Workshop</MenuItem>
          <MenuItem value="Talk">Talk</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
