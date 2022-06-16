import { InputSwitch } from 'primereact/inputswitch';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const { $ } = window;

const UserDetailScreen = () => {
    const { pageState, modelid } = useParams();

    const navigate = useNavigate();

    const onBack = () => { navigate(-1); }

    const onSelectImage = () => {
        $('#user-image').click();
    }

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
                                <li className="breadcrumb-item active">FAQ</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className='col-md-12 '>
                            <div className='card'>
                                <form >
                                    <div className='card-header'>
                                        <div className='card-title'><i className='fa fa-user-tag' /> {pageState && pageState.charAt(0).toUpperCase() + pageState.slice(1)} User </div>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row mt-3 mb-3'>
                                            <div className='col-md-9 d-flex flex-column align-items-center'>
                                                <div className='mb-4' >
                                                    <img src="../../dist/img/avatar5.png" alt='A' className='img-circle elevation-2' style={{ width: 160, height: 160 }} />
                                                </div>
                                                <div className='mb-3'>
                                                    <button type='button' className='btn btn-outline-dark' onClick={onSelectImage}>
                                                        <i className='fa fa-image' /> Select Image
                                                    </button>
                                                    <input id="user-image" type="file" className='d-none' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row mb-4'>
                                            <div className='col-md-9'>
                                                <div className="dropdown-divider" />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='form-group'>
                                                    <label htmlFor='fullname'>Full Name</label>
                                                    <input id="fullname" className='form-control' />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor='email'>Email</label>
                                                    <input id="email" className='form-control' type="email" />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor='phone'>Phone</label>
                                                    <input id="phone" className='form-control' />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor='role'>Role</label>
                                                    <select id="role" className='form-control' >
                                                        <option>Select Role</option>
                                                        <option>Administrator</option>
                                                        <option>Teknisi</option>
                                                        <option>User</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='col-md-1' />
                                            <div className='col-md-4'>
                                                <div className='form-group'>
                                                    <label htmlFor='username'>User Name</label>
                                                    <input id="username" className='form-control' />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor='password'>Password</label>
                                                    <input id="password" className='form-control' type="password" />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor='retype-password'>Retype Password</label>
                                                    <input id="retype-password" className='form-control' type="password" />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor='active'>Active</label>
                                                    <div>
                                                        <InputSwitch checked={true} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='card-footer'>
                                        <div className='row'>
                                            <div className='col-md-9'>
                                                <div className='d-flex' style={{ justifyContent: 'flex-end' }}>
                                                    <button type='button' className='btn btn-outline-dark mr-3' style={{ width: 100 }} onClick={onBack}><i className='fa fa-reply' /> Back</button>
                                                    <button type='button' className='btn btn-dark' style={{ width: 100 }}><i className='fa fa-save' /> Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


export default UserDetailScreen;