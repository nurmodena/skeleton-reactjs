import React, { Component } from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/Action/AuthAction';

const UserScreen = () => {
    const dispatch = useDispatch();

    const useLogout = () => {
        dispatch(logout());
        console.log('userLogout Invoked');
    }

    return (
        <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">User Screen</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">User</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className='col-md-6 col-6'>
                                <button className='btn btn-danger' onClick={useLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
}

export default UserScreen;