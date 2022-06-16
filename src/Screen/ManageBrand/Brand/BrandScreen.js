import React, { Component, useEffect, useState } from 'react';
import { createBrand, deleteBrand, getBrandAll, updateBrand } from '../../../Service/BrandService';
import { getCategoryAll } from '../../../Service/CategoriesService';
import { useForm, Controller, handleSubmit } from 'react-hook-form';
import Swal from 'sweetalert2';
import MTable from '../../../Components/MTable/MTable';
import { InputSwitch } from 'primereact/inputswitch';
const { $ } = window;
const localState = {};

const BrandScreen = () => {

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
    const [categories, setCategories] = useState([]);
    const [brand, setBrand] = useState({});
    useEffect(() => {
        console.log('UseEffect invoked');
        getCategoryAll({ perpage: 100 }, ({ data }) => {
            setCategories(data.data);
        })
    }, []);


    const loadData = payload => {
        localState.paginator = payload;
        getBrandAll(
            payload,
            res => {
                const { data, total } = res.data;
                setPropsTable({ ...propsTable, data, totalRows: total });
            },
            err => {
                setPropsTable({ ...propsTable, data: [], totalRows: 0 });

            }
        );
    }

    const onActiveChange = item => e => {

    }

    const columns = [
        { id: 1, title: 'Brand Code', field: 'code', sortable: true },
        { id: 2, title: 'Brand Name', field: 'name', sortable: true },
        {
            id: 3,
            title: 'Active',
            field: 'is_active',
            sortable: true,
            render: item => {
                return <InputSwitch checked={item.is_active} onChange={onActiveChange(item)} />;
            },
        },
        {
            id: 4,
            title: '',
            sortable: true,
            render: item => {
                return (
                    <div>
                        <a onClick={onEdit(item)} style={{ cursor: 'pointer', color: 'green', display: 'inline-block', marginRight: 15 }}>
                            <i className="fas fa-edit" />
                            <span style={{ marginLeft: 10 }}>Edit</span>
                        </a>
                        <a onClick={onRemove(item)} style={{ cursor: 'pointer', color: 'maroon', display: 'inline-block' }}>
                            <i className="fas fa-trash" />
                            <span style={{ marginLeft: 10 }}>Remove</span>
                        </a>
                    </div>);
            },
        },
    ];

    const [propsTable, setPropsTable] = useState({ data: [], columns, loadData });

    const removeData = id => {
        deleteBrand(id, res => {
            if (res.status == 200 || res.status == 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Delete data success',
                    text: 'Data has been deleted!'
                }).then(res => { loadData(localState.paginator) });
            }
        }, error => {
            Swal.fire({
                icon: 'error',
                title: 'Delete data fail',
                text: 'Data can not be deleetd!'
            });
        });
    }

    const onEdit = item => () => {
        reset(item);
        setBrand(item);
        console.log('selected ', item);
    }

    const onRemove = item => () => {
        Swal.fire({
            icon: 'question',
            title: 'Are you sure?',
            text: 'Deleted data can not be restored!',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                removeData(item.id);
            }
        });
    }

    const onAddData = () => {
        onReset();
    }

    const onSubmit = (data) => {
        console.log('submit data', data);
        console.log('brand', brand);
        data.image = brand.file;
        const formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }
        if (brand.id) {
            updateBrand(formData, res => {
                if (res.status == 200 || res.status == 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Save data success',
                        text: 'Data has been saved!'
                    }).then(r => { loadData(localState.paginator); onReset() })
                }
            }, err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Save data error!'
                });
            });
        } else {
            createBrand(formData, res => {
                if (res.status == 200 || res.status == 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Save data success',
                        text: 'Data has been saved!'
                    }).then(r => { loadData(localState.paginator); })
                }
            }, err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Save data error!'
                });
            });
        }
    }

    const onBrowseImage = () => {
        console.log('onBrowse invoked!');
        $("#image-name").click();

    }

    const onReset = () => {
        reset({
            category_id: 0,
            code: '',
            name: '',
            is_active: true,
            image_name: '',
        });
        setBrand({});
    }

    const onFileChange = (e) => {
        console.log('e file', e);
        const [file] = e.target.files;
        if (file) {
            setBrand({ ...brand, image_name: URL.createObjectURL(file), file })
        }
    }

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Manage Brand </h1>
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
                            <form name="form-detail" onSubmit={handleSubmit(onSubmit)}>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h3 className="card-title">
                                            <i className="fas fa-tag mr-1" />
                                            {brand.id ? 'Edit Brand' : 'New Brand'}
                                        </h3>
                                    </div>
                                    <div className='card-body'>
                                        <div className='form-group'>
                                            <label>Category</label>
                                            <select className='form-control' {...register("category_id", { required: { value: true, message: 'Category is required!' } })}>
                                                {
                                                    categories.map((ctg, i) => (<option key={`ctg-` + i} value={ctg.id}>{ctg.name}</option>))
                                                }
                                            </select>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="brand-code">Brand Code</label>
                                            <input name="brand-code" {...register("code", { required: { value: true, message: 'Brand code is required!' } })} placeholder='Brand code' className='form-control' />
                                            {errors.code && (<span className='text-danger' style={{ fontSize: 14 }}>{errors.code.message}</span>)}
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="brand-name">Brand Name</label>
                                            <input name="brand-name" {...register("name", { required: { value: true, message: 'Brand name is required!' } })} placeholder='Brand name' className='form-control' />
                                            {errors.name && (<span className='text-danger' style={{ fontSize: 14 }}>{errors.name.message}</span>)}
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="brand-name">Active</label>
                                            <div>
                                                <Controller name="is_active" control={control} render={({ field }) => { return (<InputSwitch {...field} checked={field.value} />) }} />
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <label id="image-name" htmlFor="image_name">Image</label>
                                            <input id="image_name" type="file" name="image_name" className='d-none' onChange={onFileChange} />
                                            <div style={{ minHeight: 200 }}>
                                                {brand.image_name && (<img src={brand.image_name} style={{ objectFit: 'cover', width: '100%' }} alt="select image" />)}
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                                                <button type='button' className='btn btn-outline-dark' style={{ width: 100 }} onClick={onBrowseImage}><i className='fa fa-image'></i> Browse</button>
                                            </div>
                                            <div style={{ height: 1, background: '#ccc', marginTop: 16 }}></div>
                                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                                                <div style={{ width: 150, marginRight: 10 }}><button type="button" className="btn btn-block btn-outline-danger" onClick={onReset}><i className='fa fa-times'></i>  Clear</button></div>
                                                <div style={{ width: 150 }}><button type="submit" className="btn btn-block btn-outline-dark"><i className='fa fa-save'></i> Save</button></div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <i className="fas fa-tags mr-1" />
                                        List Brand
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <MTable {...propsTable} onAddData={onAddData} showIndex={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BrandScreen;