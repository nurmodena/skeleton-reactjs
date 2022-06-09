import React, { Component } from 'react';

const columns = [
    { id: 1, title: 'Series Name', field: 'name', sortTable: true },
    { id: 2, title: 'Description', field: 'description', sortTable: true },
];
const data = [
    { id: 1, name: 'HOB', description: 'Sub Category of HOB' },
    { id: 2, name: 'OVEN', description: 'Sub Category of OVEN' },
    { id: 3, name: 'HOOD', description: 'Sub Category of HOOD' },
    { id: 4, name: 'MICROWAVE', description: 'Sub Category of MICROWAVE' },
    { id: 5, name: 'SINK', description: 'Sub Category of SINK' },
    { id: 6, name: 'COOKWARE', description: 'Sub Category of COOKWARE' },
    { id: 7, name: 'ACCESSORIES', description: 'Sub Category of ACCESSORIES' }
];

const SeriesScreen = () => {
    const onEdit = item => () => {
        console.log('You click edit', item);
    }

    const onRemove = item => () => {
        console.log('You click remove', item);
    }

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Manage Series </h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Home Page</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className='col-md-4'>
                            <div className='card'>
                                <div className='card-header'>
                                    <h3 className="card-title">
                                        <i className="fas fa-tag mr-1" />
                                        Series Detail
                                    </h3>
                                </div>
                                <div className='card-body'>
                                    <div className='form-group'>
                                        <label htmlFor="brand-name">Series Name</label>
                                        <input id="series-name" name="seriesName" placeholder='Series name' className='form-control' />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="description">Description</label>
                                        <input id="description" name="description" placeholder='Description' className='form-control' />
                                    </div>
                                    <div className='form-group'>
                                        
                                        <div style={{ height: 1, background: '#ccc', marginTop: 16 }}></div>
                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                                            <div style={{ width: 150, marginRight: 10 }}><button type="button" className="btn btn-block btn-outline-danger" ><i className='fa fa-times'></i>  Clear</button></div>
                                            <div style={{ width: 150 }}><button type="button" className="btn btn-block btn-outline-dark"><i className='fa fa-save'></i> Save</button></div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <i className="fas fa-tags mr-1" />
                                        List Series
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 10 }}>#</th>
                                                {
                                                    columns.map((item, i) => (
                                                        <th key={'key-' + item.id}>{item.title}</th>
                                                    ))
                                                }
                                                <th style={{}}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map((item, i) => (
                                                    <tr key={'key-' + item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.description}</td>
                                                        <td>
                                                            <a onClick={onEdit(item)} style={{ cursor: 'pointer', color: 'green', display: 'inline-block', marginRight: 15 }}>
                                                                <i className="fas fa-edit" />
                                                                <span style={{ marginLeft: 10 }}>Edit</span>
                                                            </a>
                                                            <a onClick={onRemove(item)} style={{ cursor: 'pointer', color: 'red', display: 'inline-block' }}>
                                                                <i className="fas fa-trash" />
                                                                <span style={{ marginLeft: 10 }}>Remove</span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SeriesScreen;