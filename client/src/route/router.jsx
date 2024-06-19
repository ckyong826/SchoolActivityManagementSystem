import { Routes, Route, createBrowserRouter, Navigate } from "react-router-dom";
import { React } from 'react';
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Users from "../pages/Users";
import Signup from "../pages/Signup";
import DefaultLayout from "../public/layout/DefaultLayout";
import GuestLayout from "../public/layout/GuestLayout";

// export default function Router() {
//   return (
//     <>
//     <Routes>
//       <Route path='/' exact element = {<Homepage/>} />
//     </Routes>
//     </>
//   )
// }

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage/>
  },
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/users',
        element: <Users/>
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      },
    ]
  },
])

export default router;