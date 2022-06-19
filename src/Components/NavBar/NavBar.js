import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../Redux/Action/AuthAction';

const NavBar = () => {

    let { userInfo } = useSelector(state => state.auth);

    if (!userInfo) {
        userInfo = {}
    }

    const dispatch = useDispatch();

    const signOut = () => {
        console.log('signOut invoked');
        dispatch(logout());
    }

    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <NavLink to="/home" className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="#" className="nav-link">Contact</a>
                </li>
            </ul>
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
                {/* Notifications Dropdown Menu */}
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-bell" />
                        <span className="badge badge-warning navbar-badge">15</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <span className="dropdown-item dropdown-header">15 Notifications</span>
                        <div className="dropdown-divider" />
                        <a href="#" className="dropdown-item">
                            <i className="fas fa-envelope mr-2" /> 4 new messages
                            <span className="float-right text-muted text-sm">3 mins</span>
                        </a>
                        <div className="dropdown-divider" />
                        <a href="#" className="dropdown-item">
                            <i className="fas fa-users mr-2" /> 8 friend requests
                            <span className="float-right text-muted text-sm">12 hours</span>
                        </a>
                        <div className="dropdown-divider" />
                        <a href="#" className="dropdown-item">
                            <i className="fas fa-file mr-2" /> 3 new reports
                            <span className="float-right text-muted text-sm">2 days</span>
                        </a>
                        <div className="dropdown-divider" />
                        <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-user mr-2" />
                        <span className="">{userInfo && userInfo.fullname}</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <div className='d-flex flex-column align-items-center mt-2 mb-2' >
                            <div className='mt-3 mb-3'>
                                <img src="dist/img/avatar5.png" alt='A' className='img-circle elevation-2' style={{ width: 80, height: 80 }} />
                            </div>
                            <div style={{ fontWeight: 600 }}>{userInfo && userInfo.fullname}</div>
                            <div style={{ fontSize: 12, margin: '0 24px', textAlign: 'center' }}>{userInfo.role}</div>
                            <div className='mb-3' style={{ fontSize: 14, margin: '0 24px', textAlign: 'center', fontWeight: 600 }}>{`Office - ${userInfo.office}`}</div>
                        </div>
                        <div className="dropdown-divider" />
                        <div className='d-flex justify-content-center mt-2 mb-2'>
                            <button type='button' className='btn btn-sm mr-2' style={{ width: 120 }}><i className='fa fa-user' /> Profile</button>
                            <div style={{ width: 1, background: '#ccc', height: 30 }} />
                            <button type='button' className='btn btn-sm' style={{ width: 120 }} onClick={signOut}><i className='fas fa-sign-out-alt' /> Sign Out</button>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt" />
                    </a>
                </li>
            </ul>
        </nav>
    )

}

export default NavBar;
