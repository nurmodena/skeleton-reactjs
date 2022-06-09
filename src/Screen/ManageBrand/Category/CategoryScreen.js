import React, { Component } from 'react';

const columns = [
    { id: 1, title: 'Category Name', field: 'name', sortTable: true },
    { id: 2, title: 'Description', field: 'description', sortTable: true },
];
const data = [
    { id: 1, name: 'Cooking', description: 'Category of Cooking' },
    { id: 2, name: 'Cleaning', description: 'Category of Cleaning' },
    { id: 3, name: 'Cooling', description: 'Category of Cooling' },
    { id: 4, name: 'Professional', description: 'Category of Professional' },
    { id: 5, name: 'Energy', description: 'Category of Energy' }
];

const CategoryScreen = () => {
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
                            <h1 className="m-0">Manage Category </h1>
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
                                        Category Detail
                                    </h3>
                                </div>
                                <div className='card-body'>
                                    <div className='form-group'>
                                        <label htmlFor="brand-name">Category Name</label>
                                        <input id="brand-name" name="brandName" placeholder='Category name' className='form-control' />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="description">Description</label>
                                        <input id="description" name="description" placeholder='Description' className='form-control' />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="description">Image</label>
                                        <div >
                                            <img src="https://media.web.modena.com/images/homepage/category/3/SB6DKczzaWmNZA5FIgPNXc9bkh7278NhFKpbJmmz.jpg" style={{ objectFit: 'cover', width: '100%' }} alt="select image" />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                                            <button type='button' className='btn btn-default btn-block' style={{ width: 100 }}><i className='fa fa-image'></i> Browse</button>
                                        </div>
                                        <div style={{height: 1, background: '#ccc', marginTop: 16}}></div>
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
                                        List Category
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

export default CategoryScreen;