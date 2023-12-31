import React, { Component, useEffect, useState, useRef } from 'react';
import { getUserAll, getUserById, createUser, updateUser, deleteUser } from '../../Service/UserService';
import { useForm, Controller, handleSubmit } from 'react-hook-form';
import Swal from 'sweetalert2';
import MTable from '../../Components/MTable/MTable';
import { InputSwitch } from 'primereact/inputswitch';
import { useNavigate } from 'react-router-dom';

const { $ } = window;

const UserScreen = () => {
    const navigate = useNavigate();
    const mTable = useRef();
    useEffect(() => {

    }, []);

    const onView = item => () => {
        navigate("view/" + item.id);
    };

    const onEdit = item => () => {
        console.log('selected', item);
        navigate("edit/" + item.username);
    };

    const onResetPassword = item => () => {
        console.log('You click remove', item);
        Swal.fire({
            icon: 'question',
            title: 'Are you sure',
            text: 'Reseted password can not be restored',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
        }).then(({ isConfirmed }) => {
            console.log('isConfirmed', isConfirmed);
            if (isConfirmed) {
                Swal.fire({
                    title: 'Input the new password here!',
                    input: 'text',
                    showCancelButton: true,
                    confirmButtonText: 'Reset'
                }).then(({ value }) => {
                    console.log('result', value);
                })
            }

        });
    };

    const columns = [
        { id: 1, title: 'NIK', field: 'nik', sortable: true },
        { id: 3, title: 'Full Name', field: 'full_name', sortable: true },
        { id: 2, title: 'User Name', field: 'username', sortable: true },
        { id: 3, title: 'Role', field: 'roles_name', sortable: true },
        { id: 3, title: 'Email', field: 'email', sortable: true },
        {
            id: 4,
            title: 'Active',
            field: 'is_active',
            sortable: true,
            render: data => {
                return <InputSwitch checked={data.is_active} />;
            },
        },
        {
            id: 5,
            title: 'Action',
            render: item => {
                return (
                    <div>
                        <a
                            onClick={onEdit(item)}
                            style={{
                                cursor: 'pointer',
                                color: 'green',
                                display: 'inline-block',
                                marginRight: 20
                            }}
                        >
                            <i className="fas fa-edit" />
                            <span style={{ marginLeft: 10 }}>Edit</span>
                        </a>
                        {
                            ((item.email || '').indexOf('@modena.com') == -1) && (<a
                                onClick={onResetPassword(item)}
                                style={{
                                    cursor: 'pointer',
                                    color: 'maroon',
                                    display: 'inline-block',
                                    marginRight: 20
                                }}
                            >
                                <i className="fas fa-key" />
                                <span style={{ marginLeft: 10 }}>Reset Password</span>
                            </a>)
                        }

                    </div>
                );
            },
        },
    ];

    const onAddData = () => {
        navigate("add/new");
    }

    const propsTable = { columns, getData: getUserAll, showIndex: true, showAddButton: true, onAddData };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Manage User</h1>
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
                        <div className='col-12'>
                            <div className='card'>
                                <div className='card-header'>
                                    <div className='card-title'><i className='fa fa-user-tag' /> List User</div>
                                </div>
                                <div className='card-body'>
                                    <MTable ref={mTable} {...propsTable} order="nik" />
                                </div>
                                <div className='card-footer'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default UserScreen;