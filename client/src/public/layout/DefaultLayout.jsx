import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/contextProvider";
import { useEffect } from "react";
import axiosClient from "../../axios-client";

const DefaultLayout = () => {
    const {user, token, setUser} = useStateContext();
    if (!token){
        return <Navigate to="/login"/>
    }

    const onLogout = (e) => {
        e.preventDefault();
    }

    return ( 
        <div>
            <Outlet/>
        </div>
     );
}
 
export default DefaultLayout;