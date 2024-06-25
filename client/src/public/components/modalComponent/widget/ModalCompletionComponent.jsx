
import React from 'react';
import Box from '@mui/material/Box';
import SuccessAnimation from './useSuccessAnimation';
import ButtonComponent from './useButton';
import useGetCurrentUser from '../../../../hooks/useGetCurrentUser';
import Notification from './useNotification';
import axiosClient from '../../../../axios-client';

const ModalCompletionComponent = (props) => {
  const user = useGetCurrentUser();
  console.log(user?.userID)
  const handleRegister = async () => {
    const payload = {
      userID: user?.userID,
      activityID: props.prop.activityID,
      regDate : new Date().toISOString(),
    };
    try {
      await axiosClient.post('/registration', payload);
      console.log('Joined activity successfully');
      props.setStep(3);
    } catch (error) {
      console.error('Error joining activity:', error.response?.data || error.message);
    }
  }
  return (
    <>
    <Box sx={{ width:'90%',height:'75%',overflow:'hidden',overflowY:'scroll' }} className="mt-8 pt-2 px-8 scrollbar-hide" >
       <SuccessAnimation color="#6366F1" text="Joined !" liveRegion="completion" />
    </Box>
    <ButtonComponent setStep={props.setStep} handleRegister={handleRegister} prev={1}/>
    
    </>
  );
};


export default ModalCompletionComponent;