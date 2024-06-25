import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/contextProvider";
import { useEffect } from "react";
import axiosClient from "../../axios-client";
import ResponsiveAppBar from "../components/HeaderComponent";

const DefaultLayout = () => {
    const {user, token, setUser} = useStateContext();
    if (!token){
        return <Navigate to="/login"/>
    }

    const onLogout = (e) => {
        e.preventDefault();
    }

    return ( 
        <div className="w-full mt-[90px]">
            <ResponsiveAppBar/>
            <Outlet/>
        </div>
     );
}
 
export default DefaultLayout;