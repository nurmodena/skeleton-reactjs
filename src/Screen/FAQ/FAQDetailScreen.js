import React, { Component, useEffect, useState } from 'react';
import { } from '../../Service/FAQService';
import { getLanguageAll } from '../../Service/LanguageService';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import MTable from '../../Components/MTable/MTable';
import { InputSwitch } from 'primereact/inputswitch';
import { useNavigate, useParams } from 'react-router-dom';
const { $, setupDigitInput } = window;
const localState = {};

const FAQDetailScreen = () => {
    const navigate = useNavigate();
    const { pageState, dataid } = useParams();
    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const [state, setState] = useState({
        dataLanguages: [],
        languages: [],
        language: {},
        selectedLang: {},
    });

    useEffect(() => {
        getLanguageAll({ perpage: 1000 }, res => {
            setState({ ...state, dataLanguages: res.data.data })
        });
        setupDigitInput();
        $('.select2').select2().on('change', e => {
            console.log('');
        });
    }, []);

    const onSubmit = data => {

    }

    const onGoback = () => {
        navigate(-1);
    }

    const onFileChange = e => { }

    const onBrowseImage = () => { $("#image_name").click() }

    const onLanguageClick = lang => () => {
        console.log('onLanguageClick', lang);
        setState({ ...state, language: lang });
    }

    const onSelectedLangChange = e => {
        const code = e.target.value.toLowerCase();
        if (code) {
            const lang = dataLanguages.find(i => i.code.toLowerCase() == code);
            setState({ ...state, selectedLang: { code, name: lang.name } });
        }
    }

    const onAddLangClick = () => {
        const { code, name } = selectedLang;
        if (code) {
            console.log('selectedLang', selectedLang);
            const _languages = [...languages, { code, name, title: '', description: '', question: '', solution: '' }];
            console.log('_languages', _languages);
            setState({ ...state, languages: _languages, selectedLang: { code: '' } });
        }
    }

    const onRemovelangClick = item => () => {
        const _languages = languages.filter(e => e.code.toLowerCase() != item.code.toLowerCase());
        const _state = { ...state, languages: _languages };
        if (item.code == language.code) {
            _state.language = { code: '', name: '', title: '', description: '', question: '', solution: '' };
        }
        setState(_state);
    }

    const onLangValChange = ({ target: { name, value } }) => {
        language[name] = value;
        console.log('language', { name, value });
        setState({ ...state, language });
    }

    const onSelectModelChange = e => {
        console.log('models', e);
    }

    const { languages, language, dataLanguages, selectedLang } = state;

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Manage FAQ</h1>
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='card'>
                            <div className='card-header'>
                                <div className='card-title'><i className='fa fa-tools' /> {pageState && pageState.charAt(0).toUpperCase() + pageState.slice(1)} FAQ</div>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label htmlFor='faq-name'>FAQ Name</label>
                                            <input id="faq-name" className='form-control' placeholder='FAQ Name' />
                                        </div>
                                        <div className='form-group'>
                                            <label>Image</label>
                                            <input id="image_name" type="file" name="image_name" className='d-none' onChange={onFileChange} accept="image/png, image/jpg, image/jpeg" />
                                            <div style={{ minHeight: 200, maxWidth: 500, borderRadius: 6, overflow: 'hidden' }}>
                                                {true && (<img src={'https://i.ytimg.com/vi/y2g9OtTHQis/maxresdefault.jpg'} style={{ objectFit: 'cover', width: '100%' }} alt="select image" />)}
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                                                <button type='button' className='btn btn-outline-dark' style={{ width: 100 }} onClick={onBrowseImage}><i className='fa fa-image'></i> Browse</button>
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='video-url'>Video Url</label>
                                            <input id="video-url" className='form-control' placeholder='Content Name' />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='is-active'>Active</label>
                                            <div>
                                                <InputSwitch checked={true} />
                                            </div>
                                        </div>
                                        <div style={{ height: 1, background: '#ccc', margin: '20px 0' }} />
                                    </div>
                                    <div className='col-md-1'></div>
                                    <div className='col-md-5'>
                                        <div className='form-group'>
                                            <label htmlFor='model-list'>Model List</label>
                                            <select id="select-models" className='select2' multiple="multiple" onChange={onSelectModelChange} data-paleceholder="Select models" style={{ width: '100%' }}>
                                                <option>Model - 1</option>
                                                <option>Model - 2</option>
                                                <option>Model - 3</option>
                                                <option>Model - 4</option>
                                                <option>Model - 5</option>
                                                <option>Model - 6</option>
                                                <option>Model - 7</option>
                                            </select>
                                        </div>
                                        <div className='form-group d-flex align-items-center'>
                                            <label>Multi Language</label>
                                            <div style={{ height: 1, background: '#ccc', flex: 1, marginLeft: 10 }} />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='select-language'>Language</label>
                                            <div className='d-flex justify-content-between'>
                                                <select id="select-language" name="select-language" value={selectedLang.code} className='form-control flex-1 mr-2' onChange={onSelectedLangChange}>
                                                    <option value=''>Select language</option>
                                                    {
                                                        dataLanguages.filter(e => { return languages.map(l => l.code.toLowerCase()).indexOf(e.code.toLowerCase()) < 0 }).map((item, i) => (
                                                            <option key={`key-item-${i}`} value={item.code.toLowerCase()} >{item.name}</option>
                                                        ))
                                                    }
                                                </select>
                                                <button type='button' className='btn btn-sm btn-warning' onClick={onAddLangClick}><i className='fa fa-plus' /> Add</button>
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <div className='d-flex flex-wrap'>
                                                {
                                                    languages.map((item, i) => (
                                                        <div key={`item-${i}`} className={`btn btn${item.code == language.code ? '-' : '-outline-'}warning btn-sm d-flex mr-2 mb-2`}>
                                                            <a onClick={onLanguageClick(item)}
                                                                type='button'
                                                                style={{ minWidth: 100 }}>
                                                                {item.name}
                                                            </a>
                                                            <span className='text-danger' onClick={onRemovelangClick(item)} style={{ cursor: 'pointer' }}><i className='fa fa-times ml-2' /></span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='title'>Title</label>
                                            <input name="title" value={language.title} className='form-control' onChange={onLangValChange} disabled={!language.code} />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='description'>Description</label>
                                            <textarea name='description' value={language.description} className='form-control' rows={2} onChange={onLangValChange} disabled={!language.code}></textarea>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='question'>Question</label>
                                            <textarea name='question' value={language.question} className='form-control' rows={2} onChange={onLangValChange} disabled={!language.code}></textarea>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='title'>Solution</label>
                                            <textarea value={language.solution} name='solution' className='form-control' rows={2} onChange={onLangValChange} disabled={!language.code}></textarea>
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
                            <div className='card-footer'></div>
                        </div>
                    </form>
                </div>

            </section>
        </div>
    );
}

export default FAQDetailScreen;