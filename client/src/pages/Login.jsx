import Box from '@mui/material/Box';
import {TextField, Button, Alert} from '@mui/material';
import { useRef, useState } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/contextProvider';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [formErrors, setFormErrors] = useState(null);
    const {setUser, setToken} = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post('/login', payload)
            .then(res => {
                setUser(res.data.user);
                setToken(res.data.token);
                console.log(res);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status == 422){
                    setFormErrors(response.data.errors);
                }
            })
    }
    return (
        <>
            <form action="POST" onSubmit={onSubmit}>
                <Box className="flex items-center justify-center flex-col gap-2">  
                        <h1>Login</h1>       
                        {formErrors && <Alert severity="error">
                          {Object.keys(formErrors).map(key => (
                            <p key={key}>{formErrors[key]}</p>
                          ))}  
                        </Alert>} 
                        <TextField id="outlined-basic" label="Email" variant="outlined" name="email" inputRef={emailRef}/>
                        <TextField id="outlined-basic" label="Password" variant="outlined" type="password" inputRef={passwordRef}/>
                        <Button type='submit' variant='contained'>Log in</Button>
                </Box>
            </form>
        </>
    );
}

export default Login;