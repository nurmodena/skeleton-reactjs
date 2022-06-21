import React, { Component, useEffect, useState, useRef } from 'react';
import { createBrand, deleteBrand, getBrandAll, updateBrand } from '../../../Service/BrandService';
import { createCategory, deleteCategory, getCategoryAll, updateCategory } from '../../../Service/CategoriesService';
import { useForm, Controller, handleSubmit } from 'react-hook-form';
import Swal from 'sweetalert2';
import MTable from '../../../Components/MTable/MTable';
import { InputSwitch } from 'primereact/inputswitch';
import Overlay from '../../../Components/Overlay/Overlay';
const { $ } = window;
let processingId = -1;

const CategoryScreen = () => {
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
    const mTable = useRef();
    const [state, setState] = useState({category: {}, processing: false}); 

    const onActiveChange = item => e => { }

    const columns = [
        { id: 1, title: 'Category Name', field: 'name', sortable: true },
        { id: 2, title: 'Description', field: 'description', sortable: true },
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

    const propsTable = { columns, getData: getCategoryAll };

    const removeData = id => {
        deleteCategory(id, res => {
            if (res.status == 200 || res.status == 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Delete data success',
                    text: 'Data has been deleted!'
                }).then(res => { mTable.current.refresh(); });
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
        setState({...state, category: item});
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

    const startProcessing = () => {
        processingId = setTimeout(() => {
            setState({...state, processing: true});
        }, 150);
    }

    const stopProcessing = () => {
        clearTimeout(processingId);
        setState({...state, processing: false});
    }

    const onSubmit = (data) => {
        console.log('submit data', data);
        console.log('brand', category);
        data.image = category.file;
        const formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }
        startProcessing();
        const response = category.id ? updateCategory(formData) : createCategory(formData);
        response.then(res => {
            if (res.status == 200 || res.status == 201) {
                stopProcessing();
                Swal.fire({
                    icon: 'success',
                    title: 'Save data success',
                    text: 'Data has been saved!'
                }).then(r => { mTable.current.refresh(); onReset() })
            }
        }).catch(({respomnse: { data } }) => {
            stopProcessing();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Save data error!'
            });
        }); 
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
            description: '',
            is_active: true,
            image_name: '',
        });
        setState({...state, category: {}});
    }

    const onFileChange = (e) => {
        console.log('e file', e);
        const [file] = e.target.files;
        if (file) {
            const _category = { ...category, image_name: URL.createObjectURL(file), file };
            setState({ ...state, category: _category });
        }
    }

    const { category, processing } = state;

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
                                <li className="breadcrumb-item active">Category Page</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className='col-md-4'>
                            <Overlay display={processing} />
                            <form name="form-detail" onSubmit={handleSubmit(onSubmit)}>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h3 className="card-title">
                                            <i className="fas fa-tag mr-1" />
                                            {category.id ? 'Edit Category' : 'New Category'}
                                        </h3>
                                    </div>
                                    <div className='card-body'>
                                        <div className='form-group'>
                                            <label htmlFor="code">Category Code</label>
                                            <input id="code" {...register("code", { required: { value: true, message: 'Category code is required!' } })} placeholder='Category code' className='form-control' />
                                            {errors.code && (<span className='text-danger' style={{ fontSize: 14 }}>{errors.code.message}</span>)}
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="name">Category</label>
                                            <input id="name" {...register("name", { required: { value: true, message: 'Category name is required!' } })} placeholder='Category name' className='form-control' />
                                            {errors.name && (<span className='text-danger' style={{ fontSize: 14 }}>{errors.name.message}</span>)}
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="description">Description</label>
                                            <input id="description" {...register("description")} placeholder='Description' className='form-control' />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="brand-name">Active</label>
                                            <div>
                                                <Controller name="is_active" control={control} render={({ field }) => { return (<InputSwitch {...field} checked={field.value} />) }} />
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <label id="image-name" htmlFor="image_name">Image</label>
                                            <input id="image_name" type="file" name="image_name" className='d-none' onChange={onFileChange} accept="image/png, image/jpg, image/jpeg" />
                                            <div style={{ minHeight: 200 }}>
                                                {category.image_name && (<img src={category.image_name} style={{ objectFit: 'cover', width: '100%' }} alt="select image" />)}
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
                                        List Category
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <MTable ref={mTable} {...propsTable} onAddData={onAddData} showIndex={true} />
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