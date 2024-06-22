import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/contextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import userConsts from "../../consts/common-consts";
import { CircularProgress, Snackbar, Alert } from '@mui/material'

const AdminLayout = () => {
    const { token, user } = useStateContext();
    // const user = useGetCurrentUser();
    const [showFailSnackbar, setShowFailSnackbar] = useState(false);

    const isAdmin = user && user?.role == userConsts.ADMIN;

    if ((user && !isAdmin) || !token) {
        console.log("User role not allowed to access, change user role to admin to access")
        return <Navigate to="/login" />
    }

    return (
        <div>
            {!!isAdmin
                ? <Outlet />
                : <div className="flex justify-center items-center h-screen">
                    <div className="text-center">
                        <CircularProgress />
                        <p>Authenticating permissions</p>
                    </div>
                </div>
            }
        </div>
    );
}

export default AdminLayout;