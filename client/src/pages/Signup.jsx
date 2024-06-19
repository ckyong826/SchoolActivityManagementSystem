import Box from '@mui/material/Box';
import {TextField, Button, Alert} from '@mui/material';
import { useRef, useState } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/contextProvider';

const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [formErrors, setFormErrors] = useState(null);
    const {setUser, setToken} = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            passwordConfirmation: passwordConfirmationRef.current.value,
        }
        axiosClient.post('/signup', payload)
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
                        <h1>Sign up</h1>       
                        {formErrors && <Alert severity="error">
                          {Object.keys(formErrors).map(key => (
                            <p key={key}>{formErrors[key]}</p>
                          ))}  
                        </Alert>} 
                        <TextField id="outlined-basic" label="Name" variant="outlined" inputRef={nameRef}/>
                        <TextField id="outlined-basic" label="Email" variant="outlined" name="email" inputRef={emailRef}/>
                        <TextField id="outlined-basic" label="Password" variant="outlined" type="password" inputRef={passwordRef}/>
                        <TextField id="outlined-basic" label="Password Confirmation" variant="outlined" type="password" inputRef={passwordConfirmationRef}/>
                        <Button type='submit' variant='contained'>Sign up</Button>
                </Box>
            </form>
        </>
    );
}
 
export default Signup ;