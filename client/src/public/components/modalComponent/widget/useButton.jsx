import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const ButtonComponent = (props) => {
  const handleNext = () => {
    if (props.handleSubmit) {
      props.handleSubmit();
    } 
    else if (props.handleRegister)
     {
      props.handleRegister();
    }

    props.setStep(props.next);
  };

  return (
    <Box className="flex gap-2 mt-auto">
      <Button onClick={() => props.setStep(props.prev)} className="mt-4" variant="outlined" color="indigo" size='large'>prev</Button>
      <Button onClick={handleNext} className="mt-4" variant='contained' color="indigo" size='large'>Next</Button>
    </Box>
  );
}

export default ButtonComponent;