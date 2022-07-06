import React, { Component, useEffect, useState } from 'react';
import { createFAQ, getFAQById, updateFAQ } from '../../Service/FAQService';
import { getLanguageAll } from '../../Service/LanguageService';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import MTable from '../../Components/MTable/MTable';
import Select2Checkbox from '../../Components/Select2Checkbox/Select2Checkbox';
import { InputSwitch } from 'primereact/inputswitch';
import { useNavigate, useParams } from 'react-router-dom';
import { getModelAll } from '../../Service/ModelService';
import { no_image } from '../../Images';
import Overlay from '../../Components/Overlay/Overlay';
import CountryFlag from '../../Components/CountryFlag/CountryFlag';

const { $, setupDigitInput } = window;

const localState = { models: [] };
let processingId = -1;

const FAQDetailScreen = () => {
    const navigate = useNavigate();
    const { pageState, dataid } = useParams();
    const { register, handleSubmit, formState: { errors }, control, clearErrors, reset } = useForm({ defaultValues: { is_active: true } });
    const [state, setState] = useState({
        faq: { is_active: true, image_name: no_image },
        dataLanguages: [],
        languages: [],
        language: {
            code: '',
            name: '',
            title: '',
            video_url: '',
            question: '',
            solution: ''
        },
        selectedLang: {},
        models: [],
        isViewOnly: false,
        processing: false,
    });

    useEffect(() => {
        localState.models = [];
        const reqLang = getLanguageAll({ perpage: 1000 }).then(res => res.data.data);
        const reqModels = getModelAll({ perpage: 1000 }).then(res => res.data.data);
        //setup select2
        $('.select2').select2({
            placeholder: 'Select models',
            templateResult: Select2Checkbox
        }).on('change', e => {
            clearErrors('models');
            localState.models = $('.select2').val();
        });

        switch (pageState) {
            case 'add':
                Promise.all([reqLang, reqModels]).then(results => {
                    const [langs, _models] = results;
                    setState({ ...state, dataLanguages: langs, models: _models, isViewOnly: pageState.toLowerCase() == 'view' });
                })
                break;
            case 'view':
            case 'edit':
                const reqFaq = getFAQById(dataid).then(res => res.data);
                Promise.all([reqLang, reqModels, reqFaq]).then(results => {
                    const [langs, _models, faq] = results;
                    const _languages = faq.descs.map(lang => ({
                        code: lang.language_code,
                        name: lang.language_name,
                        title: lang.title,
                        video_url: lang.video_url,
                        question: lang.question,
                        solution: lang.answer
                    }));
                    const _language = _languages.length ? _languages[0] : {};
                    setState({
                        ...state,
                        faq,
                        dataLanguages: langs,
                        models: _models,
                        languages: _languages,
                        language: _language,
                        isViewOnly: pageState.toLowerCase() == 'view'
                    });
                    reset(faq);
                    localState.models = faq.models.map(m => m.id);
                    setTimeout(() => {
                        $('.select2').val(localState.models);
                        $('.select2').trigger('change');
                    }, 10)
                })
                break;
            default:
                break;
        }

        setupDigitInput();
    }, []);

    const startProcessing = () => {
        processingId = setTimeout(() => {
            setState({ ...state, processing: true });
        }, 150);
    }

    const stopProcessing = () => {
        clearTimeout(processingId);
        setState({ ...state, processing: false });
    }

    const onSubmit = data => {
        data.status = 1;
        console.log('data', data);
        const { id } = data;
        const formData = new FormData();
        formData.append(`name`, data.name);
        formData.append(`is_active`, data.is_active);
        formData.append(`status`, data.status);

        //set image 
        formData.append(`image`, state.file);

        //set description
        let i = 0;
        for (let lang of languages) {
            console.log('lang', lang);
            formData.append(`descriptions[${i}][language_code]`, lang.code);
            formData.append(`descriptions[${i}][question]`, lang.question);
            formData.append(`descriptions[${i}][title]`, lang.title);
            formData.append(`descriptions[${i}][video_url]`, lang.video_url);
            formData.append(`descriptions[${i}][answer]`, lang.solution);
            i++;
        }

        //set models
        let j = 0;
        for (let model of localState.models) {
            formData.append(`models[${j}]`, model);
            j++;
        }
        const submit = pageState == 'add' ? createFAQ(formData) : updateFAQ(dataid, formData);
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
        }).finally(_ => stopProcessing());
    }

    const onGoback = () => {
        navigate(-1);
    }

    const onFileChange = e => {
        const [file] = e.target.files;
        faq.image_name = URL.createObjectURL(file);
        setState({ ...state, file });
    }

    const onBrowseImage = () => { $("#image_name").click() }

    const onLanguageClick = lang => () => {
        console.log('onLanguageClick', lang);
        setState({ ...state, language: lang });
    }

    const onSelectedLangChange = e => {
        clearErrors('languages');
        const code = e.target.value.toLowerCase();
        if (code) {
            const lang = dataLanguages.find(i => i.code.toLowerCase() == code);
            setState({ ...state, selectedLang: { code, name: lang.name } });
        }
    }

    const onAddLangClick = () => {
        const { code, name } = selectedLang;
        if (code) {
            const _languages = [...languages, { code, name, title: '', video_url: '', question: '', solution: '' }];
            console.log('_languages', _languages);
            setState({ ...state, languages: _languages, selectedLang: { code: '' } });
        }
    }

    const onRemovelangClick = item => () => {
        const _languages = languages.filter(e => e.code.toLowerCase() != item.code.toLowerCase());
        const _state = { ...state, languages: _languages };
        if (item.code == language.code) {
            _state.language = { code: '', name: '', title: '', video_url: '', question: '', solution: '' };
        }
        setState(_state);
    }

    const onLangValChange = ({ target: { name, value } }) => {
        language[name] = value;
        setState({ ...state, language });
    }

    const { faq, languages, language, dataLanguages, selectedLang, models, isViewOnly, processing } = state;

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
                            <Overlay display={processing} />
                            <div className='card-header'>
                                <div className='card-title'><i className='fa fa-tools' /> {pageState && pageState.charAt(0).toUpperCase() + pageState.slice(1)} FAQ</div>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label htmlFor='faq-name'>FAQ Name</label>
                                            <input {...register('name', { required: 'Name is required!' })} id="faq-name" className='form-control' placeholder='FAQ Name' disabled={isViewOnly} />
                                            {errors.name && <span className='text-danger'>{errors.name.message}</span>}
                                        </div>
                                        <div className='form-group'>
                                            <label>Image</label>
                                            <input id="image_name" type="file" name="image_name" className='d-none' onChange={onFileChange} accept="image/png, image/jpg, image/jpeg" disabled={isViewOnly} />
                                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                                                <div style={{ minHeight: 200, maxWidth: 500, borderRadius: 6, overflow: 'hidden' }}>
                                                    <img src={faq.image_name} style={{ objectFit: 'cover', width: '100%' }} alt="select image" />
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                                                <button type='button' className='btn btn-outline-dark' style={{ width: 100 }} onClick={onBrowseImage} disabled={isViewOnly}><i className='fa fa-image'></i> Browse</button>
                                            </div>
                                        </div>
                                        <div className='form-group d-none'>
                                            <label htmlFor='video-url'>Video Url</label>
                                            <input {...register('video_url')} id="video-url" className='form-control' placeholder='Video url' disabled={isViewOnly} />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='is-active'>Active</label>
                                            <div>
                                                <Controller name="is_active" control={control} render={({ field }) => { return (<InputSwitch {...field} checked={field.value} disabled={isViewOnly} />) }} />
                                            </div>
                                        </div>
                                        <div style={{ height: 1, background: '#ccc', margin: '20px 0' }} />
                                    </div>
                                    <div className='col-md-1'></div>
                                    <div className='col-md-5'>
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
                                        <div className='form-group d-flex align-items-center'>
                                            <label>Multi Language</label>
                                            <div style={{ height: 1, background: '#ccc', flex: 1, marginLeft: 10 }} />
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
                                                            <option key={`key-item-${i}`} value={item.code.toLowerCase()} >{item.name}</option>
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
                                        <div className='form-group'>
                                            <label htmlFor='title'>Title</label>
                                            <input name='title' value={language.title} className='form-control' rows={2} onChange={onLangValChange} disabled={!language.code || isViewOnly} />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='video_url'>Video Url</label>
                                            <input name='video_url' value={language.video_url} className='form-control' rows={2} onChange={onLangValChange} disabled={!language.code || isViewOnly} />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='question'>Question</label>
                                            <textarea name='question' value={language.question} className='form-control' rows={2} onChange={onLangValChange} disabled={!language.code || isViewOnly}></textarea>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='title'>Solution</label>
                                            <textarea value={language.solution} name='solution' className='form-control' rows={2} onChange={onLangValChange} disabled={!language.code || isViewOnly}></textarea>
                                        </div>
                                        <div style={{ margin: '30px 0', background: '#ccc', height: 1 }} />
                                        <div className='form-group '>
                                            <div className='d-flex justify-content-end'>
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

export default FAQDetailScreen;