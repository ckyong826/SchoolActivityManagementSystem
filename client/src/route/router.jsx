import { Routes, Route, createBrowserRouter, Navigate } from "react-router-dom";
import { React } from 'react';
import Homepage from "../pages/Homepage";
import Login from "../pages/Auth/Login";
import Users from "../pages/Users/Users";
import DefaultLayout from "../public/layout/DefaultLayout";
import GuestLayout from "../public/layout/GuestLayout";
import Signup from "../pages/Auth/Signup";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/EditProfile";
import AdminLayout from "../public/layout/AdminLayout";
import Activities from "../pages/Activities/Activities";
import AdminActivityPage from "../pages/Activity/AdminActivityPage";
import ActivityDetailsPage from "../pages/Activity/ActivityDetailsPage";
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
        path: '/profile/edit',
        element: <EditProfile/>
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
        path: '/adminActivity',
        element: <AdminActivityPage/>
      },
      {
        path: '/adminActivity/:activityID',
        element: <ActivityDetailsPage/>
      },
    ]
  },
])

export default router;