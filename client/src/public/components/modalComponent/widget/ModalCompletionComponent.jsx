
import React from 'react';
import Box from '@mui/material/Box';
import SuccessAnimation from './useSuccessAnimation';
import ButtonComponent from './useButton';

const ModalCompletionComponent = (props) => {

  return (
    <>
    <Box sx={{ width:'90%',height:'75%',overflow:'hidden',overflowY:'scroll' }} className="mt-8 pt-2 px-8 scrollbar-hide" >
       <SuccessAnimation color="#6366F1" text="Joined !" liveRegion="completion" />
    </Box>
    <ButtonComponent setStep={props.setStep} next={3} prev={1}/>
    
    </>
  );
};


export default ModalCompletionComponent;