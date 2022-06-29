import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { } from '../../Service/InstallationService';
import { getLanguageAll } from '../../Service/LanguageService';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import MTable from '../../Components/MTable/MTable';
import { InputSwitch } from 'primereact/inputswitch';
import { useNavigate, useParams } from 'react-router-dom';
import { setLanguages } from '../../Redux/Action/InstallationAction';
import CountryFlag from '../../Components/CountryFlag/CountryFlag';
const { $, setupDigitInput } = window;

const InstallationContentScreen = () => {
    const navigate = useNavigate();
    const { contentState, contentid } = useParams();
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();
    const [state, setStates] = useState({
        dataLanguages: [],
        language: {},
        selectedLang: {},
        content: {},
        description: {
            title: '',
            description: '',

        },
    });
    const setState = value => {
        setStates({ ...state, ...value });
    }


    const { languages, installation } = useSelector(({ installation }) => installation);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('installation', installation);
        const _language = languages.length > 0 ? languages[0] : {};
        const _data = { language: _language };
        switch (contentState) {
            case 'add':
                const _content = {
                    id: undefined,
                    descriptions: [],
                    image_name: '../../images/no-image.png',
                    name: '',
                    step_order: (installation.contents || []).length + 1,
                };
                _content.descriptions = languages.map(e => ({
                    id: undefined,
                    language_code: e.code,
                    language_name: e.name,
                    title: '',
                    description: ''
                }));
                _data.content = _content;
                break;
            case 'edit':
            case 'view':
                _data.content = installation.contents.find(c => c.id == contentid);
                break;
            default:
                break;

        }
        console.log('_data', _data);
        reset(_data.content);
        setState(_data);
        setupDigitInput();
    }, []);

    const onSubmit = data => {
        console.log('state', state);
    }

    const onGoback = () => {
        navigate(-1);
    }

    const onFileChange = e => { }

    const onBrowseImage = () => { $("#image_name").click() }

    const onLanguageClick = lang => () => {
        const _description = content.descriptions.find(e => e.language_code == lang.code) || { title: '', description: '' };
        console.log('onLanguageClick', _description);
        setState({ description: _description });
    }

    const onLangValChange = ({ target: { name, value } }) => {
        description[name] = value;
        console.log('description', { name, value });
        setState({ description });
    }

    const { language, content, selectedLang, descriptions, description } = state;

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
                        <div className='card'>
                            <div className='card-header'>
                                <div className='card-title'><i className='fa fa-tools' /> {contentState && contentState.charAt(0).toUpperCase() + contentState.slice(1)} Installation Content</div>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label htmlFor='content-name'>Content Name</label>
                                            <input id="content-name" className='form-control' placeholder='Content Name' />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='step-order'>Step Order</label>
                                            <input id="step-order" className='form-control digit' placeholder='Step Order' style={{ maxWidth: 150, textAlign: 'end' }} />
                                        </div>
                                        <div style={{ height: 1, background: '#ccc', margin: '20px 0' }} />
                                        <div className='form-group'>
                                            <label>Image</label>
                                            <input id="image_name" type="file" name="image_name" className='d-none' onChange={onFileChange} accept="image/png, image/jpg, image/jpeg" />
                                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                                                <div style={{ minHeight: 200, maxWidth: 500, borderRadius: 6, overflow: 'hidden' }}>
                                                    <img src={'https://i.ytimg.com/vi/y2g9OtTHQis/maxresdefault.jpg'} style={{ objectFit: 'cover', width: '100%' }} alt="select image" />
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
                                                    languages.map((item, i) => (
                                                        <div key={`item-${i}`} className={`btn btn${item.code == language.code ? '-' : '-outline-'}warning btn-sm d-flex mr-2 mb-2`}>
                                                            <a onClick={onLanguageClick(item)}
                                                                type='button'
                                                                style={{ minWidth: 100 }}>
                                                                <CountryFlag code={item.code} />{item.name}
                                                            </a>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='title'>Title</label>
                                            <input name="title" value={description.title} className='form-control' onChange={onLangValChange} disabled={!language.code} />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='description'>Description</label>
                                            <textarea name='description' value={description.description} className='form-control' rows={2} onChange={onLangValChange} disabled={!language.code}></textarea>
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