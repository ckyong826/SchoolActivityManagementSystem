import { Outlet,Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/contextProvider";

const GuestLayout = () => {
    const {user, token} = useStateContext();
    if (token){
        return <Navigate to="/"/>
    }
    return ( 
        <div>
            <Outlet/>
        </div>
     );
}
 
export default GuestLayout;