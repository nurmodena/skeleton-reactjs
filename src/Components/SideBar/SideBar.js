import React, { Component, useEffect } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    NavLink
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

const getClassName = ({ isActive }) => {
    return isActive ? "nav-link active" : "nav-link";
}

const SideBar = () => {
    let { userInfo } = useSelector(state => state.auth);

    if (!userInfo) {
        userInfo = {};
    }

    return (
        <aside className="main-sidebar  elevation-4 sidebar-light-navy">
            {/* Brand Logo */}
            <a href="#" className="brand-link" >
                <img src="dist/img/logo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8', background: 'white', padding: 2 }} />
                <span className="brand-text font-weight-light"><strong style={{ color: 'orange', fontWeight: 700 }}>TSM</strong> Modena</span>
            </a>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="dist/img/avatar5.png" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">{userInfo.fullname}</a>
                    </div>
                </div>
                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
                        <li className="nav-item ">
                            <NavLink to="/dashboard" className={getClassName}>
                                <i className="nav-icon fas fa-th" />
                                <p>Dashboard</p>
                            </NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to="/language" className={getClassName}>
                                <i className="nav-icon fas fa-globe" />
                                <p>Manage Language</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-tags" />
                                <p>
                                    Manage Brand
                                    <i className="right fas fa-angle-left"></i>
                                </p>

                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <NavLink to="/brand" className={getClassName}>
                                        <i className="far fa-circle nav-icon" />
                                        <p>Brand</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/category" className={getClassName}>
                                        <i className="far fa-circle nav-icon" />
                                        <p>Category</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/subcategory" className={getClassName}>
                                        <i className="far fa-circle nav-icon" />
                                        <p>Sub Category</p>
                                    </NavLink>
                                </li>
                                {
                                    /**
                                     * <li className="nav-item">
                                            <NavLink to="/series" className={getClassName}>
                                                <i className="far fa-circle nav-icon" />
                                                <p>Series</p>
                                            </NavLink>
                                        </li>
                                     */
                                }
                                <li className="nav-item">
                                    <NavLink to="/model" className={getClassName}>
                                        <i className="far fa-circle nav-icon" />
                                        <p>Model</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/faq" className={getClassName}>
                                <i className="nav-icon fa fa-question-circle" />
                                <p>FAQ</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/installation" className={getClassName}>
                                <i className="nav-icon fas fa-download" />
                                <p>Installation</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/troubleshoot" className={getClassName}>
                                <i className="nav-icon fas fa-tools" />
                                <p>Troubleshooting</p>
                            </NavLink>
                        </li>
                        <li className="nav-header">General Menu</li>
                        <li className="nav-item">
                            <NavLink to="/roleaccess" className={getClassName}>
                                <i className="nav-icon fas fa-address-card" />
                                <p>Role &amp; Access</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/user" className={getClassName}>
                                <i className="nav-icon fas fa-user-tag" />
                                <p>Users</p>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            {/* /.sidebar */}
        </aside>


    )

}

export default SideBar;
