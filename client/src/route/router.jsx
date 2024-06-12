import { Routes, Route } from "react-router-dom";
import { React } from 'react';
import Homepage from "../pages/Homepage";

export default function Router() {
  return (
    <>
    <Routes>
      <Route path='/' exact element = {<Homepage/>} />
    </Routes>
    </>
  )
}