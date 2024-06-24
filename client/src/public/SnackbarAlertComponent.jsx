import { Snackbar, Alert } from "@mui/material";

const SnackbarAlertComponent = ({open, onClose, severity, title}) => {
    return ( <Snackbar
                open={open}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                autoHideDuration={2000}
                onClose={onClose}
            >
                <Alert
                    onClose={onClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {title}
                </Alert>
            </Snackbar> );
}
 
export default SnackbarAlertComponent;