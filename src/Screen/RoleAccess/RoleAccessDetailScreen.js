import React, { useState, useRef, useEffect } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { InputSwitch } from 'primereact/inputswitch';
import { getRoleAccessAll, getRoleAccessById, createRoleAccess, updateRoleAccess, getMenuAll } from '../../Service/RoleAccessService';
import { useParams, useNavigate } from 'react-router-dom';
import MTable from '../../Components/MTable/MTable';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';

const privileges = ['can_view', 'can_create', 'can_update', 'can_delete'];
let procesingId = -1;

const RoleAccessDetailScreen = () => {
    const navigate = useNavigate();
    const { pageState, roleid } = useParams();
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm({});
    const mTable = useRef();
    const [state, setState] = useState({ role: {} });

    useEffect(() => {
        switch (pageState) {
            case 'add':
                getMenuAll({ perpage: 100 }).then(({ data }) => {
                    const menus = (data.data || []).map(e => {
                        return {
                            menu_id: e.id,
                            can_view: false,
                            can_create: false,
                            can_update: false,
                            can_delete: false
                        }
                    });
                    setState({ ...state, role: { menus } });
                })
                break;
            case 'edit':
                getRoleAccessById(roleid).then(({ data }) => {
                    if (data.menus.length == 0) { }
                    setState({ ...state, role: data });
                    reset(data);
                })
                break;
            default:
                onGoBack();
        }

    }, []);

    const isEnable = (menu, privilege) => {
        const roleMenu = (role.menus || []).find(e => e.menu_id == menu.id) || undefined;
        if (roleMenu) {
            return roleMenu[`can_${privilege}`];
        }
        return false;
    }

    const onCheckChange = (menu, privilege) => ({ checked }) => {
        const menus = [...role.menus];
        const roleMenu = (menus || []).find(e => e.menu_id == menu.id) || {};
        roleMenu[`can_${privilege}`] = checked;
        const _role = { ...role, menus };
        setState({ ...state, role: _role });
    }

    const isEnableAll = (menu) => {
        const roleMenu = (role.menus || []).find(e => e.menu_id == menu.id) || {};
        return privileges.every(e => roleMenu[e]);
    }

    const onChangeAll = (menu) => ({ checked }) => {
        const menus = [...role.menus];
        const roleMenu = (menus || []).find(e => e.menu_id == menu.id) || {};
        privileges.forEach(e => roleMenu[e] = checked);
        const _role = { ...role, menus };
        setState({ ...state, role: _role });
    }

    const columns = [
        { id: 1, title: 'Menu', field: 'menu_name', sortable: true },
        { id: 2, title: 'Description', field: 'descriptions', sortable: true },
        {
            id: 3,
            title: 'All',
            render: data => {
                return <Checkbox checked={isEnableAll(data)} onChange={onChangeAll(data)} />;
            },
        },
        {
            id: 4,
            title: 'View',
            style: { textAlign: 'center' },
            render: data => {
                return <Checkbox checked={isEnable(data, 'view')} onChange={onCheckChange(data, 'view')} />;
            },
        },
        {
            id: 5,
            title: 'Create',
            style: { textAlign: 'center' },
            render: data => {
                return <Checkbox checked={isEnable(data, 'create')} onChange={onCheckChange(data, 'create')} />;
            },
        },
        {
            id: 6,
            title: 'Update',
            style: { textAlign: 'center' },
            render: data => {
                return <Checkbox checked={isEnable(data, 'update')} onChange={onCheckChange(data, 'update')} />;
            },
        },
        {
            id: 7,
            title: 'Delete',
            style: { textAlign: 'center' },
            render: data => {
                return <Checkbox checked={isEnable(data, 'delete')} onChange={onCheckChange(data, 'delete')} />;
            },
        },

    ];

    const propsTable = { columns, getData: getMenuAll, showIndex: true };

    const onGoBack = () => {
        navigate(-1);
    }

    const startProcessing = () => {
        procesingId = setTimeout(() => {
            setState({ ...state, processing: true });
        }, 150);
    }

    const stopProcessing = () => {
        clearInterval(procesingId);
        setState({ ...state, processing: false });
    }

    const onSubmit = data => {
        console.log('submit', data);
        const { roles_name, descriptions, is_active } = data;
        const payload = { roles_name, descriptions, is_active, menu_access: role.menus };
        const response = pageState == 'edit' ? updateRoleAccess(roleid, payload) : createRoleAccess(payload);
        startProcessing();
        response.then(res => {
            Swal.fire({
                icon: 'success',
                title: 'Save data success',
                text: 'Data has been saved!'
            }).then(r => { onGoBack(); })
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
        }).finally(_ => stopProcessing());
    }

    const { role } = state;

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
                                            <input id="role-name" {...register('roles_name', { required: 'Name is required' })} className='form-control' placeholder='Role name' />
                                            {errors.roles_name && (<span className='text-danger'>{errors.roles_name.message}</span>)}
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='description'>Description</label>
                                            <textarea id="description" {...register('descriptions', { required: 'Name is required' })} className='form-control' rows="3" placeholder='Description'>
                                            </textarea>
                                            {errors.descriptions && (<span className='text-danger'>{errors.descriptions.message}</span>)}
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='active'>Active</label>
                                            <div>
                                                <Controller name="is_active" control={control} render={({ field }) => { return (<InputSwitch {...field} checked={field.value} />) }} />
                                            </div>
                                        </div>
                                        <div style={{ height: 1, background: '#ccc', margin: '20px 0' }} />
                                        <div className='form-group'>
                                            <div className='d-flex justify-content-end'>
                                                <button type='button' onClick={onGoBack} className='btn btn-outline-dark' style={{ width: 100, marginRight: 20 }}><i className='fa fa-reply' /> Back</button>
                                                <button type='submit' className='btn btn-dark' style={{ width: 100 }}><i className='fa fa-save' /> Save</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-7'>
                                        <MTable ref={mTable} {...propsTable} />
                                    </div>
                                </div>
                            </div>
                            <div className='card-footer'>

                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}


export default RoleAccessDetailScreen;