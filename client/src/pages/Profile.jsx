import React from 'react';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import { Box, Card, CardContent, Typography, Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ResponsiveAppBar from '../public/HeaderComponent';
import { format, isBefore, isAfter } from 'date-fns';
import '../axios-client';

const ProfileSidebar = styled(Box)(({ theme }) => ({
  width: 350,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  height: '150vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(10),
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
  marginTop: theme.spacing(10),
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
  const today = new Date();

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

  const activities = [
    { id: 1, activityName: 'Activity 1', description: 'Description 1', categoryTag: 'Category 1', startDate: '2024-07-01', endDate: '2024-07-02', created_at: '2024-06-01', updated_at: '2024-06-10' },
    { id: 2, activityName: 'Activity 2', description: 'Description 2', categoryTag: 'Category 2', startDate: '2024-07-05', endDate: '2024-07-06', created_at: '2024-06-05', updated_at: '2024-06-12' },
  ];

  // Filter activities based on endDate
  const upcomingActivities = activities.filter(activity => isAfter(new Date(activity.endDate), today));
  const previousActivities = activities.filter(activity => isBefore(new Date(activity.endDate), today));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <ResponsiveAppBar />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <ProfileSidebar>
          <SidebarHeader>
            <ProfileAvatar src={user?.profilePicture || ""} alt={`${user?.firstName} ${user?.lastName}`}>
              {(!user?.profilePicture) && <AccountCircleIcon sx={{ width: 80, height: 80 }} />}
            </ProfileAvatar>
            <Typography variant="h6" sx={{ mt: 2 }}>
              {user?.firstName} {user?.lastName}
            </Typography>
          </SidebarHeader>
          {user && profileFields.map(({ key, label, icon }) => (
            <FieldPaper key={key} elevation={1} sx={{ my: 1 }}>
              {icon && <Box sx={{ mr: 2 }}>{icon}</Box>}
              <ProfileField>
                <strong>{label}:</strong> {user[key] ?? 'N/A'}
              </ProfileField>
            </FieldPaper>
          ))}
        </ProfileSidebar>
        <ProfileContent>
          <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
            {user ? (
              <>
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
                              <TableCell>Created At</TableCell>
                              <TableCell>Updated At</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {upcomingActivities.map(activity => (
                              <TableRow key={activity.id}>
                                <TableCell>{activity.id}</TableCell>
                                <TableCell>{activity.activityName}</TableCell>
                                <TableCell>{activity.description}</TableCell>
                                <TableCell>{activity.categoryTag}</TableCell>
                                <TableCell>{activity.startDate}</TableCell>
                                <TableCell>{activity.endDate}</TableCell>
                                <TableCell>{activity.created_at}</TableCell>
                                <TableCell>{activity.updated_at}</TableCell>
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
                              <TableCell>Created At</TableCell>
                              <TableCell>Updated At</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {previousActivities.map(activity => (
                              <TableRow key={activity.id}>
                                <TableCell>{activity.id}</TableCell>
                                <TableCell>{activity.activityName}</TableCell>
                                <TableCell>{activity.description}</TableCell>
                                <TableCell>{activity.categoryTag}</TableCell>
                                <TableCell>{activity.startDate}</TableCell>
                                <TableCell>{activity.endDate}</TableCell>
                                <TableCell>{activity.created_at}</TableCell>
                                <TableCell>{activity.updated_at}</TableCell>
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
