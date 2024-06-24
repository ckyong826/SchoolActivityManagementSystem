import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const ModalDescriptionComponent = ({prop}) => {
  return (
    <Box sx={{ width:'90%',height:'75%',overflow:'hidden',overflowY:'scroll' }} className="mt-8 my-4 px-8 max-md:px-2 scrollbar-hide" >
      <Typography variant="h3" sx={{color:'black', fontWeight:700, fontFamily:'serif'}}>{prop.activityName}</Typography>
      <Typography variant="h8" className='pl-2' sx={{color:'grey', fontWeight:400, fontFamily:'serif'}}>{new Date(prop.startDateTime).toLocaleString()} - {new Date(prop.endDateTime).toLocaleString()}</Typography>
      <Typography variant="h4" className='pt-8 ' sx={{color:'black', fontWeight:600, fontFamily:'serif'  }}>Venue</Typography>
      <Typography variant="h8" className='pl-2' sx={{color:'grey', fontWeight:400 , fontFamily:'serif'}}>{prop.venue}</Typography>
      <Typography variant="h4" className='pt-8 ' sx={{color:'black', fontWeight:600, fontFamily:'serif'  }}>Participants</Typography>
      <Typography variant="h8" className='pl-2' sx={{color:'grey', fontWeight:400 , fontFamily:'serif'}}>{prop.users.length} / {prop.maxParticipants}</Typography>
      <Typography variant="h4" className='pt-8 ' sx={{color:'black', fontWeight:600, fontFamily:'serif'  }}>Description</Typography>
      <Box className='pl-2'>
      <Typography variant="h8" sx={{color:'grey', fontWeight:400 , fontFamily:'serif'}}>
      {prop.description}
      </Typography>
      </Box>
    </Box>
  );
};

export default ModalDescriptionComponent;