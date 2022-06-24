import React, { Component, useEffect, useState, useRef } from 'react';
import { getRoleAccessAll, getRoleAccessById, createRoleAccess, updateRoleAccess, deleteRoleAccess } from '../../Service/RoleAccessService';
import { getCategoryAll } from '../../Service/CategoriesService';
import { useForm, Controller, handleSubmit } from 'react-hook-form';
import Swal from 'sweetalert2';
import MTable from '../../Components/MTable/MTable';
import { InputSwitch } from 'primereact/inputswitch';
import { useNavigate } from 'react-router-dom';
const { $ } = window;
const localState = {};

const RoleAccessScreen = () => {
    const navigate = useNavigate(); 
    const mTable = useRef();

    const removeData = item => { 
        deleteRoleAccess(item.id).then(
            Swal.fire({
                icon: 'success',
                title: 'Delete data success',
                text: 'Data has been deleted!'
            }).then(r => { mTable.current.refresh(); })
        ).catch(({ response: { data } }) => { 
            const [key] = Object.keys(data.errors || {});
            const message = data.errors[key];
            if (message) {
                console.log('error data', data);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: message[0]
                });
            } 
        });
    };

    const onEdit = item => () => {
        navigate("edit/" + item.id);
    };

    const onRemove = item => () => {
        console.log('You click remove', item);
        Swal.fire({
            icon: 'question',
            title: 'Are you sure?',
            text: 'Deleted data can not be restored!',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
          }).then(({ isConfirmed }) => {
            if (isConfirmed) {
              removeData(item);
            }
          });
    };

    const columns = [
        { id: 1, title: 'Role', field: 'roles_name', sortable: true },
        { id: 2, title: 'Description', field: 'descriptions', sortable: true },
        { id: 3, title: 'Create Date', field: 'created_on', sortable: true, style: { textAlign: 'center' } },
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
                        <a
                            onClick={onRemove(item)}
                            style={{
                                cursor: 'pointer',
                                color: 'maroon',
                                display: 'inline-block',
                                marginRight: 20
                            }}
                        >
                            <i className="fas fa-trash" />
                            <span style={{ marginLeft: 10 }}>Delete</span>
                        </a>
                    </div>
                );
            },
        },
    ];

    const onAddData = () => {
        navigate("add/new");
    }

    const propsTable = { columns, getData: getRoleAccessAll, showIndex: true, showAddButton: true, onAddData };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Role &amp; Access</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Role &amp; Access</li>
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
                                    <div className='card-title'><i className='fa fa-address-card' /> Role List</div>
                                </div>
                                <div className='card-body'>
                                    <MTable ref={mTable} {...propsTable} />
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


export default RoleAccessScreen;