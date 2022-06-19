import React, { Component, useEffect, useState } from 'react';
import { getTraoubleshootAll, getTraoubleshootById, createTraoubleshoot, updateTraoubleshoot, deleteTraoubleshoot } from '../../Service/TroubleshootService';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import MTable from '../../Components/MTable/MTable';
import { InputSwitch } from 'primereact/inputswitch';
import { useNavigate, useParams } from 'react-router-dom';
const { $ } = window;
const localState = {};

const list = [
    { id: 1, name: 'Installation-1', step_order: 1 },
    { id: 2, name: 'Installation-2', step_order: 2 },
    { id: 3, name: 'Installation-3', step_order: 3 },
    { id: 4, name: 'Installation-4', step_order: 4 },
    { id: 5, name: 'Installation-5', step_order: 5 },
    { id: 6, name: 'Installation-6', step_order: 6 },
    { id: 7, name: 'Installation-7', step_order: 7 },
];

const InstallationDetailScreen = () => {
    const navigate = useNavigate();
    const { pageState, dataid } = useParams();
    const { register, handleSubmit, formState: { errors }, control } = useForm();

    useEffect(() => {
        $('.select2').select2();
    }, []);

    const loadData = payload => {
        getTraoubleshootAll(
            payload,
            res => {
                const { data, total } = res.data;
                //setPropsTable({ ...propsTable, data, totalRows: total });
            },
            err => { }
        );
    };

    const onSubmit = data => {

    }

    const onEdit = item => () => {
        navigate("content/edit/" + item.id);
    };

    const onRemove = item => () => {
        console.log('You click remove', item);
    };

    const columns = [
        { id: 1, title: 'Name', field: 'name', sortable: true },
        { id: 2, title: 'Step Order', field: 'step_order', sortable: true, style: { textAlign: 'center' } },
        {
            id: 3,
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
        navigate("content/add/new");
    }

    const [propsTable, setPropsTable] = useState({ data: list, columns, loadData, showIndex: true, showAddButton: true, onAddData, totalRows: 0 });

    const onGoback = () => {
        navigate(-1);
    }

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Manage Installation</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Installation</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='card'>
                            <div className='card-header'>
                                <div className='card-title'><i className='fa fa-tools' /> {pageState && pageState.charAt(0).toUpperCase() + pageState.slice(1)} installation</div>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-7'>
                                        <div className='form-group'>
                                            <label htmlFor='installation-name'>Installation Name</label>
                                            <input id="installation-name" className='form-control' placeholder='Installation Name' />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='is-active'>Active</label>
                                            <div>
                                                <InputSwitch checked={true} />
                                            </div>
                                        </div>
                                        <div style={{ height: 1, background: '#ccc', margin: '20px 0' }} />
                                        <div className='form-group'>
                                            <label htmlFor='is-active'>List Installation Content</label>
                                            <div>
                                                <MTable {...propsTable} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-1'></div>
                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <label htmlFor='model-list'>Model List</label>
                                            <select id="select-models" className='select2' multiple="multiple" data-paleceholder="Select models" style={{ width: '100%' }}>
                                                <option>Model - 1</option>
                                                <option>Model - 2</option>
                                                <option>Model - 3</option>
                                                <option>Model - 4</option>
                                                <option>Model - 5</option>
                                                <option>Model - 6</option>
                                                <option>Model - 7</option>
                                            </select>
                                        </div>
                                        <div style={{ height: 1, background: '#ccc', margin: '20px 0' }} />
                                        <div className='form-group'>
                                            <div className='d-flex justify-content-right'>
                                                <button type='button' className='btn btn-outline-dark' style={{ width: 100, marginRight: 20 }} onClick={onGoback}><i className='fa fa-reply' /> Back</button>
                                                <button type='submit' className='btn btn-dark' style={{ width: 100 }}><i className='fa fa-save' /> Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='card-footer'></div>
                        </div>
                    </form>
                </div>

            </section>
        </div>
    );
}

export default InstallationDetailScreen;