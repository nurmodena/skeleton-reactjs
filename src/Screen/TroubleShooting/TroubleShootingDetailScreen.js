import React, { Component, useEffect, useState, useRef } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import Swal from 'sweetalert2';
import MTable from '../../Components/MTable/MTable';
import Select2Checkbox from '../../Components/Select2Checkbox/Select2Checkbox';
import { InputSwitch } from 'primereact/inputswitch';
import { useNavigate, useParams } from 'react-router-dom';
import { getLanguageAll } from '../../Service/LanguageService';
import { getModelAll } from '../../Service/ModelService';
import { createTraoubleshoot, getTraoubleshootById, updateTraoubleshoot } from '../../Service/TroubleshootService';
import { setDeletedTroubleshootContent, setDeletedTroubleshootHeader, setTroubleshoot, setTroubleshootContent, setTroubleshootHeader } from '../../Redux/Action/TroubleshotAction';
import CountryFlag from '../../Components/CountryFlag/CountryFlag';
import { useDispatch, useSelector } from 'react-redux';
import Overlay from '../../Components/Overlay/Overlay';

const { $ } = window;
const localState = { models: [] };

let processingId = -1;

const TroubleShootingDetailScreen = () => {
    const mTable = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pageState, dataid } = useParams();
    const { register, handleSubmit, formState: { errors }, control, clearErrors, reset, getValues, trigger } = useForm();
    const [state, setCommonState] = useState({
        dataLanguages: [],
        language: { language_code: '', name: '', title: '', video_url: '' },
        selectedLang: {},
        models: [],
        isViewOnly: false,
        processing: false,
    });
    const {
        troubleshoot,
        troubleshoot_content,
        troubleshoot_header,
        isDraft,
        deleted_header,
        deleted_content } = useSelector(({ troubleshoot }) => troubleshoot);
    const setState = data => { setCommonState({ ...state, ...data }) };

    useEffect(() => {
        $('.select2').select2({
            placeholder: 'Select models',
            templateResult: Select2Checkbox
        }).on('change', e => {
            clearErrors('models');
            localState.models = $('.select2').val();
        })
        console.log('useEffect invoked');
        localState.models = [];
        const _isViewOnly = pageState.toLowerCase() == 'view';
        const reqLang = getLanguageAll({ perpage: 1000, filter: 'is_active:1' }).then(res => res.data.data);
        const reqModels = getModelAll({ perpage: 1000, filter: 'is_active:1' }).then(res => res.data.data);
        switch (pageState) {
            case 'add':
                Promise.all([reqLang, reqModels]).then(results => {
                    const [langs, _models] = results;
                    const [_language] = troubleshoot_header.length > 0 ? troubleshoot_header : [language];
                    setState({ dataLanguages: langs, models: _models, isViewOnly: _isViewOnly, language: _language });
                    if (isDraft) {
                        reset(troubleshoot);
                        localState.models = troubleshoot.models || [];
                        setTimeout(() => {
                            $('.select2').val(localState.models);
                            $('.select2').trigger('change');
                        }, 10);
                    }
                });

                break;
            case 'edit':
            case 'view':
                const reqTroubleshoot = getTraoubleshootById(dataid).then(res => res.data);
                Promise.all([reqLang, reqModels, reqTroubleshoot]).then(results => {
                    const [langs, _models, _troubleshoot] = results;
                    const _troubleshoot_header = _troubleshoot.headers.map(lang => ({
                        id: lang.id,
                        language_code: lang.language_code,
                        name: lang.language_name,
                        title: lang.title,
                        video_url: lang.video_url
                    }));
                    if (!isDraft) {
                        console.log('_troubleshoot', _troubleshoot);
                        localState.models = _troubleshoot.models.map(m => m.id);
                        _troubleshoot.models = localState.models;
                        dispatch(setTroubleshoot(_troubleshoot));
                        dispatch(setTroubleshootHeader(_troubleshoot_header));
                        dispatch(setTroubleshootContent(_troubleshoot.contents));
                        reset(_troubleshoot);
                    } else {
                        reset(troubleshoot);
                        localState.models = troubleshoot.models || [];
                    }
                    const [_language] = _troubleshoot_header;
                    setState({
                        dataLanguages: langs,
                        language: _language || { language_code: '', name: '', title: '', video_url: '' },
                        models: _models,
                        isViewOnly: _isViewOnly
                    });
                    setTimeout(() => {
                        $('.select2').val(localState.models);
                        $('.select2').trigger('change');
                    }, 10);
                    mTable.current.refresh();
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
        const _list = troubleshoot_content.filter(e => e.name.indexOf(search) > -1)
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
        const { name, is_active } = troubleshoot;
        const _contents = troubleshoot_content.map(e => ({ ...e })).map(e => {
            if ((e.id + '').indexOf('_') != -1) {
                delete e.id;
            }
            e.image_name = e.image_name.replace('https://scstaging.modena.com', 'http://192.168.0.41:8070');
            return e;
        })
        const payload = {
            troubleshoot: { name, models: localState.models, is_active },
            troubleshoot_header,
            troubleshoot_content: _contents,
            deleted_content,
            deleted_header
        };
        // console.log('payload', payload);
        // return;
        const submit = pageState == 'add' ? createTraoubleshoot(payload) : updateTraoubleshoot(dataid, payload);
        startProcessing();
        submit.then(res => {
            if (res.status == 200 || res.status == 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Save data success',
                    text: 'Data has been saved!'
                }).then(r => { onGoback(); })
            }
        }).catch(({ response: { data } }) => {
            Swal.fire({
                icon: 'error',
                title: 'Save data error!',
                text: data.message
            });
        }).finally(() => {
            stopProcessing();
        });
    }

    const onEdit = item => () => {
        //set models to installation
        const _troubleshoot = { ...troubleshoot };
        _troubleshoot.models = localState.models;
        dispatch(setTroubleshoot(_troubleshoot));
        navigate("content/edit/" + item.id);
    };

    const onRemove = item => () => {
        console.log('item', item);
        window.payload = { item };
        if ((item.id + '').indexOf('_') == -1) {
            const _deleted_content = [...deleted_content, item.id];
            dispatch(setDeletedTroubleshootContent(_deleted_content));
        }
        mTable.current.refresh();
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
                        {!isViewOnly && (<a onClick={onEdit(item)} style={{
                            cursor: 'pointer',
                            color: 'green',
                            display: 'inline-block',
                            marginRight: 20
                        }} >
                            <i className="fas fa-edit" />
                            <span style={{ marginLeft: 10 }}>Edit</span>
                        </a>)}
                        {!isViewOnly && (<a onClick={onRemove(item)}
                            style={{
                                cursor: 'pointer',
                                color: 'maroon',
                                display: 'inline-block',
                                marginRight: 20
                            }} >
                            <i className="fas fa-trash" />
                            <span style={{ marginLeft: 10 }}>Delete</span>
                        </a>)}
                    </div>
                );
            },
        },
    ];

    const onAddData = () => {
        trigger('languages').then(status => {
            console.log('res languages', status);
            if (status) {
                navigate("content/add/new");
                //set models to installation
                const _troubleshoot = { ...troubleshoot };
                _troubleshoot.models = localState.models;
                dispatch(setTroubleshoot(_troubleshoot));
            }
        });

    }

    const propsTable = { columns, getData, showIndex: true, showAddButton: (!state.isViewOnly), onAddData, hideFilter: true };

    const onGoback = () => {
        navigate(-1);
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
            const _troubleshoot_header = [...troubleshoot_header, { language_code: code, name, title: '', video_url: '' }];
            dispatch(setTroubleshootHeader(_troubleshoot_header));
            const _troubleshoot_content = troubleshoot_content.map(x => ({ ...x }));
            _troubleshoot_content.forEach(e => {
                e.descriptions = [...e.descriptions, {
                    language_code: code,
                    language_name: name,
                    title: '', descriptions: ''
                }];
            });
            console.log('_troubleshoot_content', _troubleshoot_content);
            dispatch(setTroubleshootContent(_troubleshoot_content));
            setState({ selectedLang: { code: '' } });
        }
    }

    const onRemovelangClick = item => () => {
        setState({ language: { language_code: '', name: '', title: '', video_url: '' } });
        if (item.id) {
            const _deleteds = [...deleted_header, item.id];
            dispatch(setDeletedTroubleshootHeader(_deleteds))
        } else {
            const _troubleshoot_header = troubleshoot_header.filter(e => e.language_code != item.language_code);
            dispatch(setTroubleshootHeader(_troubleshoot_header));
        }
    }

    const onLanguageClick = lang => () => {
        setState({ language: lang });
    }

    const onLangValChange = ({ target: { name, value } }) => {
        if (language.language_code) {
            const _language = { ...language };
            _language[name] = value;
            setState({ language: _language });
        }
    }

    const onLangBlur = ({ target: { name, value } }) => {
        if (language.language_code) {
            const _header = { ...language };
            _header[name] = value;
            const _troubleshoot_header = troubleshoot_header.map(e => ({ ...e }));
            const i = _troubleshoot_header.findIndex(e => e.language_code == _header.language_code);
            _troubleshoot_header.splice(i, 1, _header);
            dispatch(setTroubleshootHeader(_troubleshoot_header));
        }
    }

    const onNameBlur = _ => {
        const _troubleshoot = { ...troubleshoot, name: getValues('name') };
        dispatch(setTroubleshoot(_troubleshoot));
    }

    const { models, language, isViewOnly, dataLanguages, selectedLang, processing } = state;

    return (
        <div className="content-wrapper">
            <Overlay display={processing} />
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Manage Troublueshooting</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Troublueshooting</li>
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
                                <div className='card-title'><i className='fa fa-tools' /> {pageState && pageState.charAt(0).toUpperCase() + pageState.slice(1)} Troublueshooting</div>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-7'>
                                        <div className='form-group'>
                                            <label htmlFor='troublueshooting-name'>Troublueshooting Name</label>
                                            <input id="troublueshooting-name" {...register('name', { required: 'Troublueshooting Name is required!', onBlur: onNameBlur })} className='form-control'
                                                placeholder='Troublueshooting Name' disabled={isViewOnly} />
                                            {errors.name && <span className='text-danger'>{errors.name.message}</span>}
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='error-code'>Error Code</label>
                                            <input id="error-code" {...register('error_code', { required: 'Error code is required!', onBlur: onNameBlur })} className='form-control'
                                                placeholder='Error code' disabled={isViewOnly} />
                                            {errors.error_code && <span className='text-danger'>{errors.error_code.message}</span>}
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='select-language'>Language</label>
                                            <div className='d-flex justify-content-between'>
                                                <select id="select-language" name="select-language"
                                                    {...register('languages', { validate: val => troubleshoot_header.length > 0 || 'Languages is required!' })}
                                                    value={selectedLang.code} className='form-control flex-1 mr-2' onChange={onSelectedLangChange} disabled={isViewOnly}>
                                                    <option value=''>Select language</option>
                                                    {
                                                        dataLanguages.filter(e => { return troubleshoot_header.map(l => l.language_code.toLowerCase()).indexOf(e.code.toLowerCase()) < 0 }).map((item, i) => (
                                                            <option key={`key-item-${i}`} value={item.code.toLowerCase()}> {item.name}</option>
                                                        ))
                                                    }
                                                </select>
                                                <button type='button' className='btn btn-sm btn-warning' onClick={onAddLangClick} disabled={isViewOnly}><i className='fa fa-plus' /> Add</button>
                                            </div>
                                            {errors.languages && <span className='text-danger'>{errors.languages.message}</span>}
                                        </div>
                                        <div className='form-group'>
                                            <div className='d-flex flex-wrap'>
                                                {
                                                    troubleshoot_header.map((item, i) => (
                                                        <div key={`item-${i}`} className={`btn btn${item.language_code == language.language_code ? '-' : '-outline-'}warning btn-sm d-flex mr-2 mb-2`}>
                                                            <a onClick={onLanguageClick(item)}
                                                                type='button'
                                                                style={{ minWidth: 100 }}>
                                                                <CountryFlag code={item.language_code} />{item.name}
                                                            </a>
                                                            {!isViewOnly && <span className='text-danger' onClick={onRemovelangClick(item)} style={{ cursor: 'pointer' }}><i className='fa fa-times ml-2' /></span>}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="header-title">Title</label>
                                            <input value={language.title} id="header-title" name="title" className="form-control" disabled={isViewOnly} onChange={onLangValChange} onBlur={onLangBlur} placeholder='Title' />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="header-video">Video URL</label>
                                            <input value={language.video_url} id="header-video" name="video_url" disabled={isViewOnly} className="form-control" onChange={onLangValChange} onBlur={onLangBlur} placeholder='Video URL' />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='is-active'>Active</label>
                                            <div>
                                                <Controller name="is_active" control={control} render={({ field }) => { return (<InputSwitch {...field} checked={field.value} disabled={isViewOnly} />) }} />
                                            </div>
                                        </div>
                                        <div style={{ height: 1, background: '#ccc', margin: '20px 0' }} />
                                        <div className='form-group'>
                                            <label htmlFor='is-active'>List Troubleshooting Content</label>
                                            <div>
                                                <MTable ref={mTable}  {...propsTable} />
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
                                                <button type='submit' className='btn btn-dark' style={{ width: 100 }} disabled={isViewOnly}><i className='fa fa-save' /> Save</button>
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


export default TroubleShootingDetailScreen;