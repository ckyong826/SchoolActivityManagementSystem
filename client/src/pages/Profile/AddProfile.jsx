import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, TextField, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import ResponsiveAppBar from '../../public/components/HeaderComponent';
import useGetCurrentUser from '../../hooks/useGetCurrentUser';
import axiosClient from '../../axios-client';

// Styled components
const EditProfileForm = styled(Paper)(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  padding: theme.spacing(4),
  marginTop: '10vh',
  boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const EditProfile = () => {
  const navigate = useNavigate();
  const user = useGetCurrentUser();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    matrikNumber: '',
    academicYear: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
  });
  const [error, setError] = useState(null);
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axiosClient.post(`/profile/add/${user.userID}`, formData);
      navigate('/profile');
    } catch (error) {
      setError('Failed to save profile');
    }
  };

  const handleDateClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  return (
    <Box>
      <ResponsiveAppBar />
      <EditProfileForm>
        <Typography variant="h4" align="center" gutterBottom>
          Add Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Matrik Number"
                name="matrikNumber"
                value={formData.matrikNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Academic Year"
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} onClick={handleDateClick}>
              <TextField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputRef={dateInputRef}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </EditProfileForm>
    </Box>
  );
};

export default EditProfile;
