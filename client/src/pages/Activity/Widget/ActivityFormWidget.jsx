import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from "@mui/material";

const ActivityFormWidget = ({
  initialData,
  setActivityModal,
  handleSubmit,
  handleClose,
  isEditMode
}) => {
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState(initialData);

  const validateInput = (name, value) => {
    let error = '';

    if (typeof value !== 'string') {
      value = value.toString();
    }

    if (value.trim() === '') {
      error = 'This field is required';
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateInput(name, value);

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));

    setFormValues(prevState => ({
      ...prevState,
      [name]: value
    }));

    setActivityModal(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = () => {
    const fieldsToValidate = ['activityName', 'description', 'venue', 'category', 'startDateTime', 'endDateTime', 'maxParticipants'];
    let allValid = true;
    const newErrors = {};

    fieldsToValidate.forEach(key => {
      const error = validateInput(key, formValues[key]);
      if (error) {
        allValid = false;
      }
      newErrors[key] = error;
    });

    setErrors(newErrors);

    if (allValid) {
      handleSubmit(formValues);
      handleClose();
    }
  };

  const getMinStartDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0, 16);
  };

  const getMinEndDate = () => {
    if (formValues.startDateTime) {
      const startDate = new Date(formValues.startDateTime);
      startDate.setMinutes(startDate.getMinutes() + 1);
      return startDate.toISOString().slice(0, 16);
    }
    return getMinStartDate();
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant="h6">
        {isEditMode ? 'Edit Activity' : 'Add Activity'}
      </Typography>
      <TextField
        margin="normal"
        fullWidth
        label="Activity Name"
        name="activityName"
        variant="outlined"
        value={formValues.activityName}
        onChange={handleInputChange}
        error={Boolean(errors.activityName)}
        helperText={errors.activityName}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Description"
        name="description"
        variant="outlined"
        multiline
        rows={8}
        value={formValues.description}
        onChange={handleInputChange}
        error={Boolean(errors.description)}
        helperText={errors.description}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Venue"
        name="venue"
        variant="outlined"
        value={formValues.venue}
        onChange={handleInputChange}
        error={Boolean(errors.venue)}
        helperText={errors.venue}
      />
      <FormControl fullWidth margin="normal" error={Boolean(errors.department)}>
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category-label"
          label="Category"
          name="category"
          value={formValues.category}
          onChange={handleInputChange}
        >
          <MenuItem value="Seminar">Seminar</MenuItem>
          <MenuItem value="Workshop">Workshop</MenuItem>
          <MenuItem value="Talk">Talk</MenuItem>
        </Select>
        {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
      </FormControl>
      <TextField
        margin="normal"
        fullWidth
        label="Start Date & Time"
        name="startDateTime"
        variant="outlined"
        type="datetime-local"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: getMinStartDate()
        }}
        value={formValues.startDateTime}
        onChange={handleInputChange}
        error={Boolean(errors.startDateTime)}
        helperText={errors.startDateTime}
      />
      <TextField
        margin="normal"
        fullWidth
        label="End Date & Time"
        name="endDateTime"
        variant="outlined"
        type="datetime-local"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: getMinEndDate()
        }}
        value={formValues.endDateTime}
        onChange={handleInputChange}
        error={Boolean(errors.endDateTime)}
        helperText={errors.endDateTime}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Max Participants"
        name="maxParticipants"
        variant="outlined"
        type="number"
        value={formValues.maxParticipants}
        onChange={handleInputChange}
        error={Boolean(errors.maxParticipants)}
        helperText={errors.maxParticipants}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFormSubmit}
        >
          {isEditMode ? 'Update Activity' : 'Add Activity'}
        </Button>
      </Box>
    </Box>
  );
};

export default ActivityFormWidget;
