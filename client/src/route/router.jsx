import { Routes, Route, createBrowserRouter, Navigate } from "react-router-dom";
import { React } from 'react';
import Homepage from "../pages/Homepage";
import Login from "../pages/Auth/Login";
import Users from "../pages/Users/Users";
import DefaultLayout from "../public/layout/DefaultLayout";
import GuestLayout from "../public/layout/GuestLayout";
import Signup from "../pages/Auth/Signup";
import Profile from "../pages/Profile";
import AdminLayout from "../public/layout/AdminLayout";
import AdminActivityPage from "../pages/Activity/AdminActivityPage";
import ActivityDetailsPage from "../pages/Activity/ActivityDetailsPage";
import Activities from "../pages/Activities/Activities";
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
        path: '/profile',
        element: <Profile/>
      },
      {
        path: '/activities',
        element: <Activities/>
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
  {
    path: '/',
    element: <AdminLayout/>,
    children: [
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/activity',
        element: <AdminActivityPage/>
      },
      {
        path: '/activity/:activityID',
        element: <ActivityDetailsPage/>
      },
    ]
  },
])

export default router;