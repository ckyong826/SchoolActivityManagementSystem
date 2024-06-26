import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetCurrentUser from '../../hooks/useGetCurrentUser';
import { Box, Card, CardContent, Typography, Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';
import { format, isBefore, isAfter, set } from 'date-fns';
import axiosClient from '../../axios-client';
import FilterComponent from '../../public/components/FilterComponent';
import SearchComponent from '../../public/components/searchComponent';

const ProfileSidebar = styled(Box)(({ theme }) => ({
  width: 350,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  height: '150vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
}));

const SidebarHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  margin: 'auto',
  border: `3px solid ${theme.palette.background.paper}`,
}));

const ProfileField = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  marginBottom: theme.spacing(1),
  color: theme.palette.common.white,
  textAlign: 'left',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
  },
}));

const FieldPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: theme.spacing(2),
  transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  width: '100%',
}));

const ActivityTable = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
  boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
  borderRadius: theme.spacing(2),
}));

const ProfileContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(4),
  color: theme.palette.text.primary,
  backgroundColor: '#f0f4f8',
  minHeight: '100vh',
  marginLeft: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}));

const DateDisplay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
}));

const Profile = () => {
  const user = useGetCurrentUser();
  const navigate = useNavigate();
  const today = new Date();

  const [profile, setProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const profileFields = [
    { key: 'profileID', label: 'Profile ID' },
    { key: 'userID', label: 'User ID' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'matrikNumber', label: 'Matrik Number' },
    { key: 'academicYear', label: 'Academic Year' },
    { key: 'phoneNumber', label: 'Phone Number', icon: <PhoneIcon color="inherit" /> },
    { key: 'address', label: 'Address', icon: <HomeIcon color="inherit" /> },
    { key: 'dateOfBirth', label: 'Date of Birth', icon: <CakeIcon color="inherit" /> },
  ];

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileResponse = await axiosClient.get(`/profile/${user.userID}`);
        setProfile(profileResponse.data);

        const registrationsResponse = await axiosClient.get(`/registrations/user/${user.userID}`);
        setRegistrations(registrationsResponse.data);
        // setActivities(registrationsResponse.data.activity);
        setRegistrations(registrationsResponse.data);
        console.log(registrationsResponse.data);

        const activities = registrationsResponse.data.map((registration) => registration.activity);
        setActivities(activities);
        
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfileData();
    }
  }, [user]);

  const [filter, setFilter] = useState('All');
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSearchedActivities = activities.filter(activity => {
    return (filter === 'All' || activity.category === filter) &&
           activity.activityName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <ProfileSidebar>
            <SidebarHeader>
              <Skeleton variant="circular" width={120} height={120} sx={{ mx: 'auto' }} />
              <Skeleton variant="text" width={220} height={40} sx={{ mx: 'auto', mt: 2 }} />
              <Skeleton variant="text" width={180} height={30} sx={{ mx: 'auto', mt: 1 }} />
            </SidebarHeader>
            <Grid container spacing={3} sx={{ mt: 3 }}>
              {profileFields.map(({ key }) => (
                <Grid item xs={12} key={key}>
                  <Skeleton variant="rectangular" width="100%" height={60} />
                </Grid>
              ))}
            </Grid>
          </ProfileSidebar>
        </Box>
      </Box>
    );
  }

  const upcomingActivities = filteredAndSearchedActivities.filter(activity =>
    isAfter(new Date(activity.endDateTime), today)
  );

  const previousActivities = filteredAndSearchedActivities.filter(activity =>
    isBefore(new Date(activity.endDateTime), today)
  );
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <ProfileSidebar>
          <SidebarHeader>
            <ProfileAvatar src={profile?.profilePicture || ""} alt={`${profile?.firstName} ${profile?.lastName}`}>
              {!profile?.profilePicture && <AccountCircleIcon sx={{ width: 80, height: 80 }} />}
            </ProfileAvatar>
            <Typography variant="h6" sx={{ mt: 2 }}>
              {profile?.firstName} {profile?.lastName}
            </Typography>
          </SidebarHeader>
          {profile ? (
            profileFields.map(({ key, label, icon }) => (
              <FieldPaper key={key} elevation={1} sx={{ my: 1 }}>
                {icon && <Box sx={{ mr: 2 }}>{icon}</Box>}
                <ProfileField>
                  <strong>{label}:</strong> {profile[key] ?? 'N/A'}
                </ProfileField>
              </FieldPaper>
            ))
          ) : (
            <Skeleton variant="rectangular" width="100%" height={60} />
          )}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          {profile ? (
              <Button variant="contained" color="primary" onClick={() => navigate('/profile/edit')}>
                Edit Profile
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={() => navigate('/profile/add')}>
                Add Profile
              </Button>
            )}
          </Box>
        </ProfileSidebar>
        <ProfileContent>
          <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
            {user ? (
              <>
              <Box  sx={{height:100, display:"flex", justifyContent:'space-between',alignItems:'center', paddingX:24, flexDirection:{xs:'column',md:'row'}}}>
                <p className="text-4xl font-bold font-mono text-center" >Features</p>
                <div className='flex flex-row justify-center gap-4 items-center'>
                  <SearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                  <FilterComponent filter={filter} handleFilter={handleFilter}/>
                </div>
              </Box>
                <Card>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Upcoming Activities
                    </Typography>
                    {upcomingActivities.length > 0 ? (
                      <ActivityTable component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Activity ID</TableCell>
                              <TableCell>Activity Name</TableCell>
                              <TableCell>Description</TableCell>
                              <TableCell>Category Tag</TableCell>
                              <TableCell>Start Date</TableCell>
                              <TableCell>End Date</TableCell>
                              <TableCell>Created By</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {upcomingActivities.map(activity => (
                              <TableRow key={activity.activityID}>
                                <TableCell>{activity.activityID}</TableCell>
                                <TableCell>{activity.activityName}</TableCell>
                                <TableCell>{activity.description}</TableCell>
                                <TableCell>{activity.category}</TableCell>
                                <TableCell>{format(new Date(activity.startDateTime), 'yyyy-MM-dd')}</TableCell>
                                <TableCell>{format(new Date(activity.endDateTime), 'yyyy-MM-dd')}</TableCell>
                                <TableCell>{activity.createdBy}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ActivityTable>
                    ) : (
                      <Typography>No upcoming activities</Typography>
                    )}
                  </CardContent>
                </Card>

                <Card sx={{ mt: 4 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Previous Activities
                    </Typography>
            
                    {previousActivities.length > 0 ? (
                      <ActivityTable component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Activity ID</TableCell>
                              <TableCell>Activity Name</TableCell>
                              <TableCell>Description</TableCell>
                              <TableCell>Category Tag</TableCell>
                              <TableCell>Start Date</TableCell>
                              <TableCell>End Date</TableCell>
                              <TableCell>Created By</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {previousActivities.map(activity => (
                              <TableRow key={activity.activityID}>
                                <TableCell>{activity.activityID}</TableCell>
                                <TableCell>{activity.activityName}</TableCell>
                                <TableCell>{activity.description}</TableCell>
                                <TableCell>{activity.category}</TableCell>
                                <TableCell>{format(new Date(activity.startDateTime), 'yyyy-MM-dd')}</TableCell>
                                <TableCell>{format(new Date(activity.endDateTime), 'yyyy-MM-dd')}</TableCell>
                                <TableCell>{activity.createdBy}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ActivityTable>
                    ) : (
                      <Typography>No previous activities</Typography>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Box sx={{ maxWidth: 900, mx: 'auto' }}>
                <Skeleton variant="circular" width={120} height={120} sx={{ mx: 'auto' }} />
                <Skeleton variant="text" width={220} height={40} sx={{ mx: 'auto', mt: 2 }} />
                <Skeleton variant="text" width={180} height={30} sx={{ mx: 'auto', mt: 1 }} />
                <Grid container spacing={3} sx={{ mt: 3 }}>
                  {profileFields.map(({ key }) => (
                    <Grid item xs={12} key={key}>
                      <Skeleton variant="rectangular" width="100%" height={60} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        </ProfileContent>
      </Box>
    </Box>
  );
};

export default Profile;
