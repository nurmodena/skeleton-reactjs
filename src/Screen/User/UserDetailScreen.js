import { InputSwitch } from 'primereact/inputswitch';
import React, { useState, useRef, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getRoleAccessAll } from '../../Service/RoleAccessService';
import { createUser, getUserById, updateUser } from '../../Service/UserService';

const { $ } = window;
const randomPassword = parseInt(Math.random() * 1000000);
const localState = { isNew: true };
let procesingId = -1;

const UserDetailScreen = () => {
    const { pageState, username } = useParams();
    const [state, setState] = useState({
        user: { roles_id: -1 },
        roles: [],
        processing: false
    });

    const { register, handleSubmit, watch, control, formState: { errors }, reset } = useForm({ defaultValues: { roles_id: -1 } });
    const password = useRef({});
    password.current = watch("password", "");

    useEffect(() => {
        const requests = [
            getRoleAccessAll({ perpage: 100 }),
            getUserById(username).catch(({ response: { data: { message } } }) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error when getting user',
                    text: message
                }).then(() => { navigate(-1) });
            })
        ];

        Promise.all(requests).then(responses => {
            const [res1, res2] = responses;
            const _roles = res1.data.data;
            const _user = res2.data;
            _user.image = _user.image_name;
            _user.password = randomPassword;
            _user.retypePassword = randomPassword;
            setState({ ...state, roles: _roles, user: _user });
            reset(_user);
            localState.isNew = false;
        });

    }, []);

    const navigate = useNavigate();

    const onBack = () => { navigate(-1); }

    const onSelectImage = () => {
        $('#user-image').click();
    }

    const onuserImageChange = e => {
        const [file] = e.target.files;
        if (file) {
            const _user = { ...user, image: URL.createObjectURL(file), file };
            setState({ ...state, user: _user });
        }
    }

    const startProcessing = () => {
        procesingId = setTimeout(() => {
            setState({ ...state, processing: true });
        }, 150);
    }

    const stopProcessing = () => {
        setState({ ...state, processing: false });
    }

    const onSubmit = (data) => {
        data.image = user.file;
        const formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }
        formData.delete("retypePassword");
        if (localState.isNew == false && data.password == randomPassword) {
            formData.delete("password");
        }
        startProcessing();
        const response = localState.isNew ? createUser(formData) : updateUser(formData);
        response.then(res => {
            if (res.status == 200 || res.status == 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Save data success',
                    text: 'Data has been saved!'
                }).then(r => { onBack(); })
            }
        }).catch(({ response: { data } }) => {
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
    }

    const { user, roles } = state;

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
                                <li className="breadcrumb-item active">User</li>
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
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='card-header'>
                                        <div className='card-title'><i className='fa fa-user-tag' /> {pageState && pageState.charAt(0).toUpperCase() + pageState.slice(1)} User </div>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row mt-3 mb-3'>
                                            <div className='col-md-9 d-flex flex-column align-items-center'>
                                                <div className='mb-4' >
                                                    <img src={user.image || "../../images/pp_default.jpg"} alt='A' className='img-circle elevation-2' style={{ width: 160, height: 160 }} />
                                                </div>
                                                <div className='mb-3'>
                                                    <button type='button' className='btn btn-outline-dark' onClick={onSelectImage}>
                                                        <i className='fa fa-image' /> Select Image
                                                    </button>
                                                    <input id="user-image" type="file" accept="image/png, image/jpg, image/jpeg"
                                                        {...register("image", { required: { value: pageState.toLowerCase() == 'add', message: 'Image is required' } })} className='d-none' onChange={onuserImageChange} />
                                                    {errors.image && <span className='text-danger d-block'>{errors.image.message}</span>}
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
                                                    <label htmlFor='nik'>NIK</label>
                                                    <input id="nik" {...register("nik", { required: 'NIK is required!' })} className='form-control' />
                                                    {errors.nik && <span className='text-danger'>{errors.nik.message}</span>}
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor='fullname'>Full Name</label>
                                                    <input id="fullname" {...register("full_name", { required: 'Fullname is required!' })} className='form-control' />
                                                    {errors.full_name && <span className='text-danger'>{errors.full_name.message}</span>}
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor='email'>Email</label>
                                                    <input id="email"  {...register("email", { email: { value: true, message: 'Invalid email!' }, required: 'Email is required!' })} className='form-control' type="email" />
                                                    {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor='phone'>Phone</label>
                                                    <input id="phone" {...register("phone")} className='form-control' />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor='role'>Role</label>
                                                    <select id="role" className='form-control' {...register("roles_id", { required: 'Role is required!', validate: val => val >= 1 || 'Role is required!' })}>
                                                        <option value="-1" >Select Role</option>
                                                        {roles.map((item, i) => <option key={`item-role-${i}`} value={item.id}>{item.roles_name}</option>)}
                                                    </select>
                                                    {errors.roles_id && <span className='text-danger'>{errors.roles_id.message}</span>}
                                                </div>
                                            </div>
                                            <div className='col-md-1' />
                                            <div className='col-md-4'>
                                                <div className='form-group'>
                                                    <label htmlFor='username'>User Name</label>
                                                    <input id="username" {...register("username", { required: 'Username is required!' })} className='form-control' />
                                                    {errors.username && <span className='text-danger'>{errors.username.message}</span>}
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor='password'>Password</label>
                                                    <input id="password" {...register("password", { required: 'Password is required' })} className='form-control' type="password" />
                                                    {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor='retype-password'>Retype Password</label>
                                                    <input id="retype-password" {...register("retypePassword", { required: 'Retype Passowrd is required', validate: val => val == password.current || 'Password do not match' })} className='form-control' type="password" />
                                                    {errors.retypePassword && <span className='text-danger'>{errors.retypePassword.message}</span>}
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor='active'>Active</label>
                                                    <div>
                                                        <Controller name="is_active" control={control} render={({ field }) => { return (<InputSwitch {...field} checked={field.value} />) }} />
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
                                                    <button type='submit' className='btn btn-dark' style={{ width: 100 }}><i className='fa fa-save' /> Save</button>
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