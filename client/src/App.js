import logo from './logo.svg';
import Router from "./route/router";
import './App.css';
import useGetCurrentUser from './hooks/useGetCurrentUser';
import { useEffect } from 'react';
import { useStateContext } from './contexts/contextProvider';
import userConsts from './consts/common-consts';

function App() {
  const { setIsAdmin } = useStateContext();
  const user = useGetCurrentUser();
  console.log(user)
  useEffect(()=>{
    const isAdmin = user && user?.role == userConsts.ADMIN;
    setIsAdmin(isAdmin);
  },[])
  return (
    <div className="App" >
        <Router />
    </div>
  );
}

export default App;
