import { createContext, useContext, useEffect, useState } from "react";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import axiosClient from "../axios-client";

const StateContext = createContext({
    token: null,
    user: null,
    setToken: () => {},
    setUser: () => {},
});

export const ContextProvider = ({children}) => {
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [user, setUser] = useState({});
    // const [token, _setToken] = useState(123123123);
    const setToken = (token) => {
        _setToken(token);
        if (token){
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const getCurrentUser = async () => {
        if (!token){
            return undefined;
        }
        await axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
    }

    useEffect(()=>{
        getCurrentUser();
    },[])


    return (
        <StateContext.Provider value={{
            token,     
            user,
            setToken,
            setUser,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);