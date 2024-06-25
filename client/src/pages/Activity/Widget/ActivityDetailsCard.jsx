import React from 'react';
import { Box, Container, Card, CardContent, Grid, Avatar, Button, Typography } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import PeopleIcon from '@mui/icons-material/People';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ActivityDetailsCard = ({ activity }) => {
    return (
        <Box sx={{ padding: 4 }}>
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ maxWidth: 900, width: '100%', borderRadius: 3, boxShadow: 4, border: '1px solid #ccc', backgroundColor: 'white', padding: 3 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                                <Typography variant="h3" component="h1" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif' }}>
                                    {activity.activityName}
                                </Typography>
                            </Box>
                            <Typography variant="body1" color="textSecondary" gutterBottom sx={{ fontSize: '1.1rem', lineHeight: 1.6, fontFamily: 'Roboto, sans-serif' }}>
                                {activity.description}
                            </Typography>
                            <Grid container spacing={2} alignItems="center" sx={{ marginTop: 3 }}>
                                <Grid item>
                                    <EventIcon />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: '1rem', fontFamily: 'Roboto, sans-serif' }}>
                                        Start: {new Date(activity.startDateTime).toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: '1rem', fontFamily: 'Roboto, sans-serif' }}>
                                        End: {new Date(activity.endDateTime).toLocaleString()}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
                                <Grid item>
                                    <PlaceIcon />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: '1rem', fontFamily: 'Roboto, sans-serif' }}>
                                        Venue: {activity.venue}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
                                <Grid item>
                                    <PeopleIcon />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: '1rem', fontFamily: 'Roboto, sans-serif' }}>
                                        Participants: {activity.users.length} / {activity.maxParticipants}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
                                <Grid item>
                                    <Avatar sx={{ width: 25, height: 25 }}>
                                        <Typography variant="body2" color="textSecondary" sx={{ fontSize: '1.2rem', fontFamily: 'Roboto, sans-serif' }}>
                                            {activity.category.charAt(0).toUpperCase()}
                                        </Typography>
                                    </Avatar>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: '1rem', fontFamily: 'Roboto, sans-serif' }}>
                                        Category: {activity.category}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </Box>
    );
};

export default ActivityDetailsCard;
