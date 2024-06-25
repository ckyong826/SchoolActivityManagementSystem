import { Outlet,Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/contextProvider";
import ResponsiveAppBar from "../components/HeaderComponent";

const GuestLayout = () => {
    const {user, token} = useStateContext();
    if (token){
        return <Navigate to="/"/>
    }
    return ( 
        <div>
            <ResponsiveAppBar/>
            <Outlet/>
        </div>
     );
}
 
export default GuestLayout;