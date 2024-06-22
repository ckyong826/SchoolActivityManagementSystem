import useGetCurrentUser from "../hooks/useGetCurrentUser";
import { Box, Skeleton } from "@mui/material";
const Profile = () => {
    const user = useGetCurrentUser();
    console.log(user?.email)
    return ( 
        <>
        {
            user
            ? Object.entries(user).map(([key, value]) => (
                <div key={key}>
                    <strong>{key}:</strong> {value}
                </div>
              ))
            : <Box>
                <Skeleton animation="wave" width={400} />
                <Skeleton animation="wave" width={400} />
                <Skeleton animation="wave" width={400} />
                <Skeleton animation="wave" width={400} />
            </Box> 
        }
        </>
     );
}
 
export default Profile;