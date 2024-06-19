import useGetCurrentUser from "../hooks/useGetCurrentUser";

const Users = () => {
    const user = useGetCurrentUser();
    console.log(user)
    return ( 
        <>
        Users
        </>
     );
}
 
export default Users;