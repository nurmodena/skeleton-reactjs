import React, { useState, useRef } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { InputSwitch } from 'primereact/inputswitch';
import { getRoleAccessAll, getRoleAccessById, createRoleAccess, updateRoleAccess, getMenuAll } from '../../Service/RoleAccessService';
import { useParams, useNavigate } from 'react-router-dom';
import MTable from '../../Components/MTable/MTable';
import { useForm, Controller } from 'react-hook-form';

const RoleAccessDetailScreen = () => {
    const navigate = useNavigate();
    const { pageState, roleid } = useParams();
    const { register, handleSubmit, formState: { errors }, control } = useForm({});
    const mTable = useRef();

    const columns = [
        { id: 1, title: 'Menu', field: 'menu_name' },
        { id: 2, title: 'Description', field: 'descriptions' },
        {
            id: 3,
            title: 'All',
            render: data => {
                return <Checkbox checked={true} />;
            },
        },
        {
            id: 4,
            title: 'View',
            style: { textAlign: 'center' },
            render: data => {
                return <Checkbox checked={true} />;
            },
        },
        {
            id: 5,
            title: 'Create',
            style: { textAlign: 'center' },
            render: data => {
                return <Checkbox checked={true} />;
            },
        },
        {
            id: 6,
            title: 'Update',
            style: { textAlign: 'center' },
            render: data => {
                return <Checkbox checked={true} />;
            },
        },
        {
            id: 7,
            title: 'Delete',
            style: { textAlign: 'center' },
            render: data => {
                return <Checkbox checked={true} />;
            },
        },

    ];

    const propsTable  =  { columns, getData: getMenuAll, showIndex: true };

    const onGoBack = () => {
        navigate(-1);
    }

    const onSubmit = data => {

    }

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='card'>
                            <div className='card-header'>
                                <div className='card-title'><i className='fa fa-address-card' /> {pageState && pageState.charAt(0).toUpperCase() + pageState.slice(1)} Role</div>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-5'>
                                        <div className='form-group'>
                                            <label htmlFor='role-name'>Role Name</label>
                                            <input id="role-name" className='form-control' placeholder='Role name' />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='description'>Description</label>
                                            <textarea id="description" className='form-control' rows="3" placeholder='Description'>
                                            </textarea>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='active'>Active</label>
                                            <div>
                                                <Controller name="is_active" control={control} render={({ field }) => { return (<InputSwitch {...field} checked={field.value} />) }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-7'>
                                        <MTable ref={mTable} {...propsTable} />
                                    </div>
                                </div>
                            </div>
                            <div className='card-footer'>
                                <div className='d-flex justify-content-end'>
                                    <button type='button' onClick={onGoBack} className='btn btn-outline-dark' style={{ width: 100, marginRight: 20 }}><i className='fa fa-reply' /> Back</button>
                                    <button type='submit' className='btn btn-dark' style={{ width: 100 }}><i className='fa fa-save' /> Save</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}


export default RoleAccessDetailScreen;