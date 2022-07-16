import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage } from '../../Service/InstallationService';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { setInstallation, setInstallationContent } from '../../Redux/Action/InstallationAction';
import CountryFlag from '../../Components/CountryFlag/CountryFlag';
import { no_image } from '../../Images';
import Overlay from '../../Components/Overlay/Overlay';

const { $, setupDigitInput } = window;
let processingId = -1;

const InstallationContentScreen = () => {
    const navigate = useNavigate();
    const { contentState, contentid } = useParams();
    const { register, handleSubmit, formState: { errors }, control, reset, setValue } = useForm();
    const [state, setStates] = useState({
        content: {
            id: undefined,
            descriptions: [],
            image_name: no_image,
            name: '',
            step_order: 1
        },
        description: {
            language_code: '',
            language_name: '',
            title: '',
            descriptions: '',
        },
        file: undefined,
        processing: false,
    });
    const setState = value => {
        setStates({ ...state, ...value });
    }

    const { installation, installation_header, installation_content } = useSelector(({ installation }) => installation);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('installation', installation);
        const _data = {};
        switch (contentState) {
            case 'add':
                const _content = {
                    id: undefined,
                    descriptions: [],
                    image_name: no_image,
                    name: '',
                    step_order: (installation_content || []).length + 1,
                };
                _content.descriptions = installation_header.map(e => ({
                    id: undefined,
                    language_code: e.language_code,
                    language_name: e.name,
                    title: '',
                    descriptions: ''
                }));
                _data.content = { ..._content };
                break;
            case 'edit':
            case 'view':
                const c = installation_content.find(c => c.id == contentid);
                const _viewContent = { ...c };
                _viewContent.descriptions = c.descriptions.map(e => ({ ...e }));
                _data.content = _viewContent;
                break;
            default:
                break;
        }
        if ((_data.content.descriptions || []).length > 0) {
            const [desc] = _data.content.descriptions;
            _data.description = { ...desc };
        }

        reset(_data.content);
        setState(_data);
        setupDigitInput();
    }, []);

    const onSubmit = data => {
        data.descriptions = content.descriptions;
        console.log('state', state);
        console.log('data', data);
        const _contents = installation_content.map(e => ({ ...e }));
        if (contentState == 'edit') {
            const i = _contents.findIndex(e => e.id == content.id);
            _contents.splice(i, 1, data);
        } else {
            data.id = '_' + parseInt(Math.random() * 1000000000); //get random id
            _contents.push(data);
        }
        dispatch(setInstallationContent(_contents));
        onGoback();
    }

    const onGoback = () => {
        navigate(-1);
    }

    const onFileChange = e => {
        const [image] = e.target.files;
        const onProgress = e => {
            if (e.total == 0) {
                console.log('start processing');
            }
        };
        uploadImage({ image }, onProgress).then(({ data: { image_name } }) => {
            const _content = { ...content, image_name };
            setState({ content: _content, processing: false });
            setValue('image_name', image_name);
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Upload Image Error',
                text: 'Please check the image you uploaded!'
            });
        }).finally(_ => {

        });

    }

    const onBrowseImage = () => { $("#image_name").click() }

    const onLanguageClick = lang => () => {
        let _description = content.descriptions.find(e => e.language_code == lang.language_code);
        if (_description) {
            setState({ content, description: _description });
        }
    }

    const onLangValChange = ({ target: { name, value } }) => {
        const _description = { ...description, [name]: value };
        setState({ description: _description });
    }

    const onLangBlur = () => {
        const i = content.descriptions.findIndex(e => e.language_code == description.language_code);
        content.descriptions.splice(i, 1, description);
    }

    const { content, descriptions, description } = state;

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Manage Installation</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Installation Content</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Overlay display={state.processing} />
                        <div className='card'>
                            <div className='card-header'>
                                <div className='card-title'><i className='fa fa-tools' /> {contentState && contentState.charAt(0).toUpperCase() + contentState.slice(1)} Installation Content</div>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label htmlFor='content-name'>Content Name</label>
                                            <input id="content-name" {...register('name', { required: 'Content name is required!' })} className='form-control' placeholder='Content Name' />
                                            {errors.name && (<span className='text-danger'>{errors.name.message}</span>)}
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='step-order'>Step Order</label>
                                            <input id="step-order" {...register('step_order', { required: 'Step order is required', min: { value: 1, message: 'Step order has greater than 0' } })} className='form-control digit' placeholder='Step Order' style={{ maxWidth: 150, textAlign: 'end' }} />
                                            {errors.step_order && (<span className='text-danger'>{errors.step_order.message}</span>)}
                                        </div>
                                        <div style={{ height: 1, background: '#ccc', margin: '20px 0' }} />
                                        <div className='form-group'>
                                            <label>Image</label>
                                            <input id="image_name" type="file" name="image_name" className='d-none' onChange={onFileChange} accept="image/png, image/jpg, image/jpeg" />
                                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                                                <div style={{ minHeight: 200, maxWidth: 500, borderRadius: 6, overflow: 'hidden' }}>
                                                    <img src={content.image_name} style={{ objectFit: 'cover', width: '100%' }} alt="select image" />
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                                                <button type='button' className='btn btn-outline-dark' style={{ width: 100 }} onClick={onBrowseImage}><i className='fa fa-image'></i> Browse</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-1'></div>
                                    <div className='col-md-5'>
                                        <div className='form-group d-flex align-items-center'>
                                            <label>Multi Language</label>
                                            <div style={{ height: 1, background: '#ccc', flex: 1, marginLeft: 10 }} />
                                        </div>
                                        <div className='form-group'>
                                            <div className='d-flex flex-wrap'>
                                                {
                                                    installation_header.map((item, i) => (
                                                        <div key={`item-${i}`} className={`btn btn${item.language_code == description.language_code ? '-' : '-outline-'}warning btn-sm d-flex mr-2 mb-2`}>
                                                            <a onClick={onLanguageClick(item)}
                                                                type='button'
                                                                style={{ minWidth: 100 }}>
                                                                <CountryFlag code={item.language_code} />{item.name}
                                                            </a>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='title'>Title</label>
                                            <input name="title" value={description.title} className='form-control' onChange={onLangValChange} onBlur={onLangBlur} />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='description'>Description</label>
                                            <textarea name='descriptions' value={description.descriptions} className='form-control' rows={2} onChange={onLangValChange} onBlur={onLangBlur}></textarea>
                                        </div>
                                        <div style={{ margin: '30px 0', background: '#ccc', height: 1 }} />
                                        <div className='form-group '>
                                            <div className='d-flex justify-content-end'>
                                                <button type='button' className='btn btn-outline-dark' style={{ width: 100, marginRight: 20 }} onClick={onGoback}><i className='fa fa-reply' /> Back</button>
                                                <button type='submit' className='btn btn-dark' style={{ width: 100 }}><i className='fa fa-save' /> Save</button>
                                            </div>
                                        </div>
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

export default InstallationContentScreen;