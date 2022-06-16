import React, { Component, useEffect, useState } from 'react';
import { getFAQAll, getFAQById, createFAQ, updateFAQ, deleteFAQ } from '../../Service/FAQService';
import { getCategoryAll } from '../../Service/CategoriesService';
import { useForm, Controller, handleSubmit } from 'react-hook-form';
import Swal from 'sweetalert2';
import MTable from '../../Components/MTable/MTable';
import { InputSwitch } from 'primereact/inputswitch';
import { useNavigate } from 'react-router-dom';
const { $ } = window;
const localState = {};

const FAQScreen = () => {
    let navigate = useNavigate();

    useEffect(() => {

    }, []);

    const loadData = payload => {
        getFAQAll(
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
        { id: 1, title: 'Name', field: 'name', sortable: true },
        { id: 2, title: 'Models', field: 'models', sortable: true },
        { id: 3, title: 'Languages', field: 'languages', sortable: true },
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
                            <h1 className="m-0">FAQ Screen</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">FAQ</li>
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
                                    <div className='card-title'><i className='fa fa-question-circle' /> FAQ List</div>
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

export default FAQScreen;