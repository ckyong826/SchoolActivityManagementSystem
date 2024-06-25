import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, TextField, Typography, Avatar, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ResponsiveAppBar from '../public/components/HeaderComponent';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import { IoIosCloudUpload } from "react-icons/io";
import axiosClient from '../axios-client';

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

const ProfileContainer = styled(Box)({
  position: 'relative',
  width: 'fit-content',
  margin: 'auto',
});

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.background.paper}`,
}));

const UploadIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  borderRadius: '50%',
  boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
}));

const EditProfile = () => {
  const navigate = useNavigate();
  const user = useGetCurrentUser();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);  // State for the profile picture
  const [previewImage, setPreviewImage] = useState('');  // State for the preview image
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosClient.get(`/profile/edit/${user.userID}`);
        const userData = response.data; 
        setFormData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phoneNumber: userData.phoneNumber || '',
          address: userData.address || '',
          dateOfBirth: userData.dateOfBirth || '',
        });
        setPreviewImage(userData.profilePicture || '');
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file));  // Create a preview URL for the selected file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
    if (profilePicture) {
      formDataToSend.append('profilePicture', profilePicture);
    }

    try {
      console.log('formDataToSend', formDataToSend)
      await axiosClient.put(`/profile/update/${user.userID}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/profile');
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <ResponsiveAppBar />
      <EditProfileForm>
        <Typography variant="h4" align="center" gutterBottom>Edit Profile</Typography>
        <ProfileContainer>
          <ProfileAvatar src={previewImage || ""} alt={`${formData.firstName} ${formData.lastName}`} />
          <input
            accept="image/*"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="profile-picture-upload"
          />
          <label htmlFor="profile-picture-upload">
            <UploadIconButton component="span">
              <IoIosCloudUpload />
            </UploadIconButton>
          </label>
        </ProfileContainer>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                label="Email"
                name="email"
                value={user.email}
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
            <Grid item xs={12}>
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
