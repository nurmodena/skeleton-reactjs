import React, { Component, useEffect } from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/NavBar/NavBar';
import Preloader from '../../Components/Preloader/Preloader';
import SideBar from '../../Components/SideBar/SideBar';

const LayoutScreen = () => {
     
    return (
        <div className='wrapper'>
            {/* <Preloader /> */}
            <NavBar />
            <SideBar />
            <div id="main-content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default LayoutScreen;