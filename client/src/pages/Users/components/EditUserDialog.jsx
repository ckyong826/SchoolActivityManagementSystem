import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Alert, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react';
import axiosClient from '../../../axios-client';

const EditUserDialog = ({ userId, showEditModal, setShowEditModal, onEditSuccess }) => {
    const [user, setUser] = useState({
        username: '',
        email: '',
    });
    const [formErrors, setFormErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        if (!userId) {
            return;
        }
        axiosClient.get(`/users/${userId}`)
            .then(({ data }) => {
                console.log(data.data)
                setUser(data.data)
                setLoading(false);
            })
            .catch(error => {
                console.log(error)
            })
    }, [userId])

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosClient.put(`/users/${userId}`, user)
            .then(() => {
                setShowEditModal(false);
                onEditSuccess();
            })
            .catch((error) => {
                const response = error.response;
                if (response && response.status == 422) {
                    setFormErrors(response.data.errors);
                }
            })
    }
    return (
        <Dialog
            open={showEditModal}
            onClose={() => setShowEditModal(false)}
            PaperProps={{
                component: 'form',
            }}
            maxWidth={"sm"}
            fullWidth
        >

            <DialogTitle>Edit User</DialogTitle>
            {formErrors && <Alert severity="error">
                {Object.keys(formErrors).map(key => (
                    <p key={key}>{formErrors[key]}</p>
                ))}
            </Alert>}
            {loading
                ? <DialogContent>
                    <Skeleton height={30}/>
                    <Skeleton height={30}/>
                    <Skeleton height={30}/>
                    <Skeleton height={30}/>
                </DialogContent>
                : <DialogContent>
                    <TextField
                        placeholder=''
                        required
                        margin="normal"
                        fullWidth
                        label="Name"
                        value={user.username}
                        onChange={e => setUser({ ...user, username: e.target.value })}
                    />
                    <TextField
                        required
                        margin="normal"
                        fullWidth
                        label="Email Address"
                        value={user.email}
                        onChange={e => setUser({ ...user, email: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        onChange={e => setUser({ ...user, password: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password Confirmation"
                        type="password"
                        onChange={e => setUser({ ...user, password_confirmation: e.target.value })}

                    />
                </DialogContent>
            }
            <DialogActions>
                <Button onClick={() => setShowEditModal(false)}>Cancel</Button>
                <Button type="submit" onClick={e => handleSubmit(e)}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditUserDialog;