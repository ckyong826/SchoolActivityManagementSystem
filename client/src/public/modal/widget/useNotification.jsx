import React from "react";
import Slide from '@mui/material/Slide';
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const Notification = (props) => {
  return (
      <Snackbar
       open={props.render}
       TransitionComponent={SlideTransition}
       onClose={props.hideRender}
       autoHideDuration={2000} 
       anchorOrigin={{ vertical:'top', horizontal:'right' }} >
        <Alert
          onClose={props.hideRender}
          autoHideDuration={2000} 
          severity="indigo"
          variant="filled"
          sx={{ width: {xs:'60%',sm:'100%'},height:'56px',display:'flex',justifyContent:'center',alignItems:'center' }}
        >
          {props.text}
        </Alert>
      </Snackbar>
  );
};

export default Notification;

