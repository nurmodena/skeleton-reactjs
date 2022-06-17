import React, { Component, useEffect, useState } from 'react';
import { getTraoubleshootAll, getTraoubleshootById, createTraoubleshoot, updateTraoubleshoot, deleteTraoubleshoot } from '../../Service/TroubleshootService';
import { useForm, Controller, handleSubmit } from 'react-hook-form';
import Swal from 'sweetalert2';
import MTable from '../../Components/MTable/MTable';
import { InputSwitch } from 'primereact/inputswitch';
import { useNavigate } from 'react-router-dom';
const { $ } = window;
const localState = {};

const TroubleShootingScreen = () => {
    let navigate = useNavigate();

    useEffect(() => {

    }, []);

    const loadData = payload => {
        getTraoubleshootAll(
            payload,
            res => { 
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
        { id: 1, title: 'Name', field: 'name', sortable: true },
        { id: 2, title: 'Models', field: 'models', sortable: true },
        { id: 3, title: 'Error Code', field: 'error_code', sortable: true },
        { id: 4, title: 'Languages', field: 'languages', sortable: true },
        {
            id: 6,
            title: 'Active',
            field: 'is_active',
            sortable: true,
            render: data => {
                return <InputSwitch checked={data.is_active} />;
            },
        },
        {
            id: 7,
            title: 'Action',
            render: item => {
                return (
                    <div>
                        <a
                            onClick={onView(item)}
                            style={{
                                cursor: 'pointer',
                                color: 'orange',
                                display: 'inline-block',
                                marginRight: 20
                            }}
                        >
                            <i className="fas fa-eye" />
                            <span style={{ marginLeft: 10 }}>View</span>
                        </a>
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
                            <h1 className="m-0">Troubleshoot Screen</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Troubleshoot</li>
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
                                    <div className='card-title'><i className='fa fa-copy' /> Troubleshoot List</div>
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

export default TroubleShootingScreen;