import React, { Component, useEffect, useState } from 'react';
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
    let navigate = useNavigate();

    useEffect(() => {

    }, []);

    const loadData = payload => {
        getRoleAccessAll(
            payload,
            res => {
                console.log('res', res);
                const { data, total } = res.data;
                setPropsTable({ ...propsTable, data, totalRows: total });
            },
            err => { }
        );
    };

    const onView = item => () => {
        navigate("view/" + item.id);
    };

    const onEdit = item => () => {
        navigate("edit/" + item.id);
    };

    const onRemove = item => () => {
        console.log('You click remove', item);
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

    const [propsTable, setPropsTable] = useState({ data: [], columns, loadData, showIndex: true, showAddButton: true, onAddData });


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
                                    <MTable {...propsTable} />
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