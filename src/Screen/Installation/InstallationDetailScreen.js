import React, { Component, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import MTable from '../../Components/MTable/MTable';
import Select2Checkbox from '../../Components/Select2Checkbox/Select2Checkbox';
import { InputSwitch } from 'primereact/inputswitch';
import { useNavigate, useParams } from 'react-router-dom';
import { getLanguageAll } from '../../Service/LanguageService';
import { getModelAll } from '../../Service/ModelService';
import { getInstallationById } from '../../Service/InstallationService';
import { setInstallation, setLanguages } from '../../Redux/Action/InstallationAction';
import CountryFlag from '../../Components/CountryFlag/CountryFlag';
import { useDispatch, useSelector } from 'react-redux';

const { $ } = window;
const localState = { models: [] };

let processingId = -1;

const list = [
    { id: 31, name: 'Installation-1', step_order: 1 },
    { id: 32, name: 'Installation-2', step_order: 2 },
    { id: 33, name: 'Installation-3', step_order: 3 },
    { id: 34, name: 'Installation-4', step_order: 4 },
    { id: 35, name: 'Installation-5', step_order: 5 },
    { id: 36, name: 'Installation-6', step_order: 6 },
    { id: 37, name: 'Installation-7', step_order: 7 },
];

const InstallationDetailScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pageState, dataid } = useParams();
    const { register, handleSubmit, formState: { errors }, control, clearErrors, reset } = useForm();
    const [state, setCommonState] = useState({
        installation: { is_active: true, processing: false },
        dataLanguages: [],
        language: {},
        selectedLang: {},
        models: [],
        isViewOnly: false,
    });
    const languages = useSelector(({ installation: { languages } }) => languages)
    const setState = data => setCommonState({ ...state, ...data });


    useEffect(() => {
        $('.select2').select2({
            placeholder: 'Select models',
            templateResult: Select2Checkbox
        }).on('change', e => {
            clearErrors('models');
            localState.models = $('.select2').val();
        });;
        localState.models = [];
        const _isViewOnly = pageState.toLowerCase() == 'view';
        const reqLang = getLanguageAll({ perpage: 1000 }).then(res => res.data.data);
        const reqModels = getModelAll({ perpage: 1000 }).then(res => res.data.data);
        switch (pageState) {
            case 'add':
                Promise.all([reqLang, reqModels]).then(results => {
                    const [langs, _models] = results;
                    dispatch(setInstallation({}));
                    setState({ dataLanguages: langs, models: _models, isViewOnly: _isViewOnly });
                })
                break;
            case 'edit':
            case 'view':
                const reqInstallation = getInstallationById(dataid).then(res => res.data);
                Promise.all([reqLang, reqModels, reqInstallation]).then(results => {
                    const [langs, _models, _installation] = results;
                    const _languages = _installation.headers.map(lang => ({
                        code: lang.language_code,
                        name: lang.language_name,
                        title: lang.title,
                        video_url: lang.video_url
                    }));
                    dispatch(setLanguages(_languages));
                    dispatch(setInstallation(_installation));
                    const _language = _languages.length ? _languages[0] : {};
                    setState({
                        installation: _installation,
                        dataLanguages: langs,
                        language: _language,
                        models: _models,
                        isViewOnly: _isViewOnly
                    });
                    reset(_installation);
                    localState.models = _installation.models.map(m => m.id);
                    setTimeout(() => {
                        $('.select2').val(localState.models);
                        $('.select2').trigger('change');
                    }, 10)
                })
                break;
            default:
                break;
        }
    }, []);

    const startProcessing = () => {
        processingId = setTimeout(() => {
            setState({ processing: true });
        }, 150);
    }

    const stopProcessing = () => {
        clearTimeout(processingId);
        setState({ processing: false });
    }

    const getData = payload => {
        const { page, perpage, search } = payload;
        const _list = list.filter(e => e.name.indexOf(search) > -1)
        const start = page * perpage - perpage;
        const end = start + perpage;
        const data = _list.slice(start, end);
        var promise = new Promise((resolve, reject) => {
            const result = {
                data: {
                    data,
                    total: _list.length
                }
            };
            resolve(result);
        });
        return promise;
    };

    const onSubmit = data => {

    }

    const onEdit = item => () => {
        navigate("content/edit/" + item.id);
    };

    const onRemove = item => () => {
        console.log('You click remove', item);
    };

    const columns = [
        { id: 1, title: 'Name', field: 'name' },
        { id: 2, title: 'Step Order', field: 'step_order', style: { textAlign: 'center' } },
        {
            id: 3,
            title: 'Action',
            render: item => {
                return (
                    <div>
                        <a
                            onClick={onEdit(item)}
                            style={{
                                cursor: 'pointer',
                                color: 'green',
                                display: 'inline-block',
                                marginRight: 20
                            }}
                        >
                            <i className="fas fa-edit" />
                            <span style={{ marginLeft: 10 }}>Edit</span>
                        </a>
                        <a
                            onClick={onRemove(item)}
                            style={{
                                cursor: 'pointer',
                                color: 'maroon',
                                display: 'inline-block',
                                marginRight: 20
                            }}
                        >
                            <i className="fas fa-trash" />
                            <span style={{ marginLeft: 10 }}>Delete</span>
                        </a>
                    </div>
                );
            },
        },
    ];

    const onAddData = () => {
        navigate("content/add/new");
    }

    const propsTable = { data: list, columns, getData, showIndex: true, showAddButton: true, onAddData, hideFilter: true };

    const onGoback = () => {
        navigate(-1);
    }

    const onLanguageClick = lang => () => {
        setState({ language: lang });
    }

    const onSelectedLangChange = e => {
        clearErrors('languages');
        const code = e.target.value.toLowerCase();
        if (code) {
            const lang = dataLanguages.find(i => i.code.toLowerCase() == code);
            setState({ selectedLang: { code, name: lang.name } });
        }
    }

    const onAddLangClick = () => {
        const { code, name } = selectedLang;
        if (code) {
            const _languages = [...languages, { code, name, title: '', video_url: '' }];
            console.log('_languages', _languages);
            setState({ selectedLang: { code: '' } });
            dispatch(setLanguages(_languages));
        }
    }

    const onRemovelangClick = item => () => {
        const _languages = languages.filter(e => e.code.toLowerCase() != item.code.toLowerCase());
        setState({ language: { code: '', name: '', title: '', video_url: '' } });
        dispatch(setLanguages(_languages))
    }

    const onLangValChange = ({ target: { name, value } }) => {
        language[name] = value;
        setState({ language });
    }

    const { models, language, isViewOnly, dataLanguages, installation, selectedLang } = state;

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
                                <li className="breadcrumb-item active">Installation</li>
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
                                <div className='card-title'><i className='fa fa-tools' /> {pageState && pageState.charAt(0).toUpperCase() + pageState.slice(1)} installation</div>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-7'>
                                        <div className='form-group'>
                                            <label htmlFor='installation-name'>Installation Name</label>
                                            <input id="installation-name" {...register('name', { required: 'Installation Name is required!' })} className='form-control'
                                                placeholder='Installation Name' disabled={isViewOnly} />
                                            {errors.name && <span className='text-danger'>{errors.name.message}</span>}
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='select-language'>Language</label>
                                            <div className='d-flex justify-content-between'>
                                                <select id="select-language" name="select-language"
                                                    {...register('languages', { validate: val => languages.length > 0 || 'Content is required!' })}
                                                    value={selectedLang.code} className='form-control flex-1 mr-2' onChange={onSelectedLangChange} disabled={isViewOnly}>
                                                    <option value=''>Select language</option>
                                                    {
                                                        dataLanguages.filter(e => { return languages.map(l => l.code.toLowerCase()).indexOf(e.code.toLowerCase()) < 0 }).map((item, i) => (
                                                            <option key={`key-item-${i}`} value={item.code.toLowerCase()}> {item.name}</option>
                                                        ))
                                                    }
                                                </select>
                                                <button type='button' className='btn btn-sm btn-warning' onClick={onAddLangClick}><i className='fa fa-plus' /> Add</button>
                                            </div>
                                            {errors.languages && <span className='text-danger'>{errors.languages.message}</span>}
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
                                                            <span className='text-danger' onClick={onRemovelangClick(item)} style={{ cursor: 'pointer' }}><i className='fa fa-times ml-2' /></span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="header-title">Title</label>
                                            <input value={language.title} id="header-title" name="title" className="form-control" onChange={onLangValChange} placeholder='Title' />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="header-video">Video URL</label>
                                            <input value={language.video_url} id="header-video" name="video_url" className="form-control" onChange={onLangValChange} placeholder='Video URL' />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='is-active'>Active</label>
                                            <div>
                                                <Controller name="is_active" control={control} render={({ field }) => { return (<InputSwitch {...field} checked={field.value} disabled={isViewOnly} />) }} />
                                            </div>
                                        </div>
                                        <div style={{ height: 1, background: '#ccc', margin: '20px 0' }} />
                                        <div className='form-group'>
                                            <label htmlFor='is-active'>List Installation Content</label>
                                            <div>
                                                <MTable {...propsTable} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-1'></div>
                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <label htmlFor='model-list'>Model List</label>
                                            <select id="select-models" {...register('models', { validate: val => (localState.models || []).length > 0 || 'Models is required' })}
                                                className='select2' multiple="multiple" disabled={isViewOnly} style={{ width: '100%' }} >
                                                {
                                                    models.map((m, i) => <option key={'model-' + i} value={m.id}>{m.name}</option>)
                                                }
                                            </select>
                                            {errors.models && <span className='text-danger'>{errors.models.message}</span>}
                                        </div>
                                        <div style={{ height: 1, background: '#ccc', margin: '20px 0' }} />
                                        <div className='form-group'>
                                            <div className='d-flex justify-content-right'>
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

export default InstallationDetailScreen;