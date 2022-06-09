
import React, { Component, useEffect, useState } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { RadioButton } from 'primereact/radiobutton'; 
import MTable from '../../../Components/MTable/MTable'; 
import { getModelAll } from '../../../Service/ModelService';

const ModelScreen = () => {

    const [data, setData] = useState([]);

    useEffect(()=>{
        loadData();
    },[])

    const loadData = () => {
        getModelAll(res => {
            console.log('items', res.data.result);
            setData(res.data.result);
        }, err => {

        });
    }

    const onRemove = item => () => {
        console.log('You click remove', item);
    }

    const columns = [
        { id: 1, title: 'ID', field: 'id', sortTable: true },
        { id: 2, title: 'Modela Name', field: 'name', sortTable: true },
        { id: 3, title: 'Description', field: 'description', sortTable: true },
        { id: 2, title: 'Series', field: 'code', sortTable: true },
        {
            id: 4, title: 'Active', field: 'is_active', sortTable: true, render: (data) => {
                return (<InputSwitch checked={data.is_active} />);
            }
        }, 
        {
            id: 6,
            title: 'Action',
            render: item => {
                return (
                    <>
                        <a onClick={onRemove(item)} style={{ cursor: 'pointer', color: 'maroon', display: 'inline-block' }}>
                            <i className="fas fa-trash" />
                            <span style={{ marginLeft: 10 }}>Delete</span>
                        </a>
                    </>
                );
            }
        }
    ];

    const propsTable = { data, columns };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Manage Model </h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Manage Languages</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <i className="fas fa-globe mr-1" />
                                        List Model
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <MTable {...propsTable} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ModelScreen;