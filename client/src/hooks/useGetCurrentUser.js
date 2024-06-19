import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/contextProvider";

const useGetCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const {token} = useStateContext();

    useEffect(()=> {
        if (!token){
            return undefined;
        }
        getCurrentUser();
    },[])

    const getCurrentUser = async () => {
        await axiosClient.get('/user')
            .then(({data}) => {
                // setUser(data)
                setCurrentUser(data);
            })
    }

    return currentUser;
}
 
export default useGetCurrentUser;