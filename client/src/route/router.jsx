import { Routes, Route } from "react-router-dom";
import { React } from 'react';
import Homepage from "../pages/Homepage";
import ActivityPage from "../pages/Activity/ActivityPage";

export default function Router() {
  return (
    <>
    <Routes>
      <Route path='/' exact element = {<Homepage/>} />
      <Route path='/activity' exact element = {<ActivityPage/>} />
    </Routes>
    </>
  )
}