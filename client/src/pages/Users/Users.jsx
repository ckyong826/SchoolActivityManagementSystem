import { useEffect, useState } from "react";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import axiosClient from "../../axios-client";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, TablePagination, Paper, Button, IconButton, Box, Typography, Skeleton, Snackbar, Alert, Container } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditUserDialog from "./components/EditUserDialog";
import SnackbarAlertComponent from "../../public/components/SnackbarAlertComponent";


const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState({
        update: false,
        delete: false,
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users')
            .then(({ data }) => {
                setLoading(false);
                setUsers(data.data);
            })
            .catch((error) => {
                setLoading(false);
            })
    }

    const onDelete = (id) => {
        axiosClient.delete(`/users/${id}`)
            .then(() => {
                setShowSnackbar(prev => ({...prev, delete: true}));
                getUsers();
            })
    }

    const editUser = (id) => {
        setSelectedUserId(id);
        setShowEditModal(true);
    }

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" py={3}>
                Users
            </Typography>
            <TableContainer component={Paper}>
                <Table
                    size="medium"
                    loading={loading}
                    rowsPerPageOptions={[5, 10, 25]}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.userID}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.userID}
                                </TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.createdAt}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => editUser(user.userID)}>
                                        <ModeEditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => onDelete(user.userID)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <EditUserDialog
                userId={selectedUserId}
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                onEditSuccess={() => {
                    setShowSnackbar(prev => ({...prev, update: true}))
                    getUsers();
                }} />

            <Snackbar
                open={showSnackbar.update}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                autoHideDuration={2000}
                onClose={() => setShowSnackbar(prev => ({...prev, update: false}))}
            >
                <Alert
                    onClose={() => setShowSnackbar(prev => ({...prev, update: false}))}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    User Updated Successfully
                </Alert>
            </Snackbar>
            <SnackbarAlertComponent
                open={showSnackbar.delete}
                onClose={()=>{setShowSnackbar(prev => ({...prev, update: false}))}}
                severity="success"
                title="User Deleted Successfully"
            />
            <SnackbarAlertComponent
                open={showSnackbar.delete}
                onClose={()=>{setShowSnackbar(prev => ({...prev, update: false}))}}
                severity="success"
                title="User Deleted Successfully"
            />
        </Container>
    );
}

export default Users;