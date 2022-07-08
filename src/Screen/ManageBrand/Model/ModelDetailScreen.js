import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getModelByCode, getModelById, createModel, updateModel } from '../../../Service/ModelService';
import { getCategoryById } from '../../../Service/CategoriesService';
import { getSubCategoryAll, getSubCategoryById } from '../../../Service/SubCategoryService';
import { getBrandAll, getSubcategoriesByBrandId } from '../../../Service/BrandService';
import axios, { Axios } from 'axios';
import { InputSwitch } from 'primereact/inputswitch';
import Overlay from '../../../Components/Overlay/Overlay';
import { getLanguageAll } from '../../../Service/LanguageService';
import CountryFlag from '../../../Components/CountryFlag/CountryFlag';

const wrapStyle = { width: 200, height: 160, borderRadius: 4, marginRight: 16, marginBottom: 16, position: 'relative', border: 'solid 1px #ccc', borderRadius: 6 };
let processingId = -1;

export default function ModelDetailScreen() {

  const { pageState, modelid } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    model: { is_active: true },
    languages: [],
    language: {},
    selectedLang: {},
    brands: [],
    subctg: {},
    subCategories: [],
    files: [],
    isViewOnly: false,
    deletedContents: [],
    processing: false,
    languageList: []
  });

  const { register, handleSubmit, reset, formState: { errors }, control, clearErrors } = useForm({});

  useEffect(() => {
    const isViewOnly = pageState == 'view';
    const reqLang = getLanguageAll({ perpage: 1000 }).then(res => res.data.data);
    const reqBrands = getBrandAll({ perpage: 1000 }).then(res => res.data.data);
    switch (pageState) {
      case 'add':
        Promise.all([reqBrands, reqLang]).then(results => {
          const [brands, languageList] = results;
          setState({ ...state, brands, languageList });
          reset(model);
        });
        break;
      case 'edit':
      case 'view':
        const reqModel = getModelById(modelid).then(res => res.data);
        const reqSubCtg = reqModel.then(res => getSubCategoryById(res.category_sub_id).then(res => res.data));
        const reqSubCtgs = reqSubCtg.then(res => getSubcategoriesByBrandId(res.brand_id).then(res => res.data));
        Promise.all([reqBrands, reqModel, reqSubCtg, reqSubCtgs, reqLang]).then(results => {
          console.log('results', results);
          const [_brands, _model, _subctg, _sucategories, languageList] = results;
          _model.length = _model.length == "null" ? null : _model.length;
          _model.width = _model.width == "null" ? null : _model.width;
          _model.height = _model.height == "null" ? null : _model.height;
          const _languages = (_model.descriptions || []).map(e => ({
            code: e.language_code,
            description: e.description,
            name: (languageList.find(l => l.code == e.language_code) || {}).name,
          }));
          console.log('_languages', _languages);
          setState({
            ...state,
            brands: _brands,
            subctg: _subctg,
            subCategories: _sucategories,
            languageList,
            languages: _languages,
            language: _languages.length > 0 ? _languages[0] : language,
            model: _model,
            isViewOnly
          });
          reset(_model);
        }).catch(({ response: { data } }) => {
          Swal.fire({
            icone: 'error',
            title: 'Error when geting data model!',
            text: data.message
          }).then(() => { navigate(-1) });
        });
        break;
      default:
        break;
    }

  }, []);

  const onBack = () => { navigate(-1); }

  const startProcessing = () => {
    processingId = setTimeout(() => {
      setState({ ...state, processing: true });
    }, 150);
  }

  const stopProcessing = () => {
    clearTimeout(processingId);
    setState({ ...state, processing: false });
  }

  const onRemoveContent = (item, i) => () => {
    model.content.splice(i, 1);
    const _deletedContents = [...deletedContents, item.id];
    setState({ ...state, model, deletedContents: _deletedContents });
  }

  const onRemoveFile = i => () => {
    files.splice(i, 1);
    setState({ ...state, files });
  }

  const onBrandChange = e => {
    const { value } = e.target;
    console.log(('value', value));
    const _subctg = { ...subctg };
    _subctg.brand_id = value;
    getSubcategoriesByBrandId(value).then(res => {
      setState({ ...state, subCategories: res.data, subctg: _subctg });
    }).catch(err => { setState({ ...state, subCategories: [] }); })
  }

  const onSubmit = data => {
    data.status = data.status ? 1 : 0;
    console.log('data', data);
    const { id } = data;
    const formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    for (let i in files) {
      formData.append(`images[${i}]`, files[i]);
    }
    for (let i in deletedContents) {
      formData.append(`deletedContents[${i}]`, deletedContents[i]);
    }
    let i = 0;
    for (let lang of languages) {
      formData.append(`descriptions[${i}][language_code]`, lang.code);
      formData.append(`descriptions[${i}][description]`, lang.description);
      i++;
    }
    const submit = pageState == 'add' ? createModel(formData) : updateModel(id, formData);
    startProcessing();
    submit.then(res => {
      if (res.status == 200 || res.status == 201) {
        Swal.fire({
          icon: 'success',
          title: 'Save data success',
          text: 'Data has been saved!'
        }).then(r => { onBack(); })
      }
    }).catch(({ response: { data } }) => {
      Swal.fire({
        icon: 'error',
        title: 'Save data error!',
        text: data.message
      });
    }).finally(_ => stopProcessing());
  }

  const onFileChange = e => {
    const [file] = e.target.files;
    const _files = [...files, ...e.target.files];
    setState({ ...state, files: _files });
  }

  const onLanguageClick = lang => () => {
    console.log('onLanguageClick', lang);
    setState({ ...state, language: lang });
  }

  const onSelectedLangChange = e => {
    clearErrors('languages');
    const code = e.target.value.toLowerCase();
    if (code) {
      const lang = languageList.find(i => i.code.toLowerCase() == code);
      setState({ ...state, selectedLang: { code, name: lang.name } });
    }
  }

  const onAddLangClick = () => {
    const { code, name } = selectedLang;
    if (code) {
      const _languages = [...languages, { code, name, description: '' }];
      console.log('_languages', _languages);
      setState({ ...state, languages: _languages, selectedLang: { code: '' } });
    }
  }

  const onRemovelangClick = item => () => {
    const _languages = languages.filter(e => e.code.toLowerCase() != item.code.toLowerCase());
    const _state = { ...state, languages: _languages };
    if (item.code == language.code) {
      _state.language = { code: '', name: '', description: '' };
    }
    setState(_state);
  }

  const onLangValChange = ({ target: { name, value } }) => {
    language[name] = value;
    setState({ ...state, language });
  }

  const {
    model,
    subctg,
    brands,
    subCategories,
    files, isViewOnly,
    deletedContents,
    processing,
    languageList,
    languages,
    language,
    selectedLang
  } = state;

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Manage Model </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Manage Modeal</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card">
              <Overlay display={processing} />
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-globe mr-1" />
                  {pageState && pageState.charAt(0).toUpperCase() + pageState.slice(1)} Model
                </h3>
              </div>
              <div className="card-body">
                <div className='row'>
                  <div className='col-md-12 col-lg-7'> <div className='form-group'>
                    <label>Model Code</label>
                    <input {...register("code", { required: "Code is required!" })} className='form-control' placeholder='Code' readOnly={isViewOnly} />
                    {errors.code && (<span className='text-danger'>{errors.code.message}</span>)}
                  </div>
                    <div className='form-group'>
                      <label>Model Name</label>
                      <input {...register("name", { required: "Name is required!" })} className='form-control' placeholder='Model name' readOnly={isViewOnly} />
                      {errors.name && (<span className='text-danger'>{errors.name.message}</span>)}
                    </div>
                    <div className='form-group'>
                      <label htmlFor="file-image" className='mr-3'>Upload Image</label>
                      <input id="file-image" className='d-none' type="file" accept="image/png, image/jpg, image/jpeg" onChange={onFileChange} />
                      <button type='button' disabled={isViewOnly} className='btn btn-outline-warning' style={{ width: 120 }} onClick={() => { window.$("#file-image").click() }}><i className='fa fa-image' /> Chose </button>
                      <div className='d-flex' style={{ margin: '16px 0', flexFlow: 'wrap', padding: 10 }}>
                        {
                          (model.content || []).map((item, i) => (
                            <div style={wrapStyle} key={`image-${i}`}>
                              <div style={{ position: 'absolute', right: -10, top: -10 }}>
                                {!isViewOnly && <Button type='button' className='p-button-rounded p-button-danger' icon="pi pi-times" style={{ width: 30, height: 30 }} onClick={onRemoveContent(item, i)} />}
                              </div>
                              <img src={item.image_name} style={{ objectFit: 'contain', width: '100%', height: '100%', borderRadius: 4 }} />
                            </div>
                          ))
                        }
                        {
                          files.map((file, i) => (
                            <div style={wrapStyle} key={'key_file_' + i}>
                              <div style={{ position: 'absolute', right: -10, top: -10 }}>
                                <Button type='button' className='p-button-rounded p-button-danger' icon="pi pi-times" style={{ width: 30, height: 30 }} onClick={onRemoveFile(i)} />
                              </div>
                              <img src={URL.createObjectURL(file)} style={{ objectFit: 'contain', width: '100%', height: '100%', borderRadius: 4, marginBottom: 20 }} />
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='select-language'>Language</label>
                      <div className='d-flex justify-content-between'>
                        <select id="select-language" name="select-language"
                          {...register('languages', { validate: val => languages.length > 0 || 'Content is required!' })}
                          value={selectedLang.code} className='form-control flex-1 mr-2' onChange={onSelectedLangChange} disabled={isViewOnly}>
                          <option value=''>Select language</option>
                          {
                            languageList.filter(e => { return languages.map(l => l.code.toLowerCase()).indexOf(e.code.toLowerCase()) < 0 }).map((item, i) => (
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
                      <label className='mr-3'>Description</label>
                      <textarea name="description" value={language.description} onChange={onLangValChange} className='form-control' rows={4} disabled={isViewOnly || !language.code}></textarea>
                    </div>
                    <div className='form-group'>
                      <label className='mr-3'>Dimension</label>
                      <br />
                      <span>Enter product size to calculate volume weight</span>
                      <div className='d-flex mt-3'>
                        <div className='flex-1'>
                          <div className='input-group'>
                            <input {...register("length")} className='form-control' placeholder='Length' readOnly={isViewOnly} />
                            <div className='input-group-append'>
                              <span className='input-group-text'>cm</span>
                            </div>
                          </div>
                        </div>
                        <div className='input-group' style={{ flex: 1, margin: '0 20px' }}>
                          <input {...register("width")} className='form-control' placeholder='Width' readOnly={isViewOnly} />
                          <div className='input-group-append'>
                            <span className='input-group-text'>cm</span>
                          </div>
                        </div>
                        <div className='input-group' style={{ flex: 1 }}>
                          <input {...register("height")} className='form-control' placeholder='Height' readOnly={isViewOnly} />
                          <div className='input-group-append'>
                            <span className='input-group-text'>cm</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='form-group'>
                      <label htmlFor="brand-name">Active</label>
                      <div>
                        <Controller name="is_active" control={control} render={({ field }) => { return (<InputSwitch {...field} checked={field.value} disabled={isViewOnly} />) }} />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label htmlFor="brand-name">Publish</label>
                      <div>
                        <Controller name="status" control={control} render={({ field }) => { return (<InputSwitch {...field} checked={field.value} disabled={isViewOnly} />) }} />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-12 col-lg-5'>
                    <div className='form-group'>
                      <label>Brand</label>
                      <select value={subctg.brand_id} className='form-control' onChange={onBrandChange} disabled={isViewOnly}>
                        <option value="">Select Brand</option>
                        {(brands || []).map((e, i) => <option key={'key_model_' + i} value={e.id}>{e.name}</option>)}
                      </select>
                    </div>
                    <div className='form-group'>
                      <label>Sub Category</label>
                      <select className='form-control' {...register("category_sub_id", { required: 'Sub Category is required!' })} disabled={isViewOnly}>
                        <option value="">Select Sub Category</option>
                        {(subCategories || []).map((e, i) => <option key={'key_sub_' + i} value={e.id}>{e.name}</option>)}
                      </select>
                      {errors.category_sub_id && (<span className='text-danger'>{errors.category_sub_id.message}</span>)}
                    </div>
                    <div style={{ height: 1, background: '#ccc' }} className="mt-5" />
                    <div className='form-group d-flex justify-content-end'>
                      <div style={{ marginTop: 40 }}>
                        <button type='button' className='btn btn-outline-dark' style={{ width: 120, marginRight: 16 }} onClick={onBack}><i className='fa fa-reply'></i> Back</button>
                        <button type='submit' className='btn btn-dark' style={{ width: 120 }} disabled={isViewOnly}><i className='fa fa-save'></i> Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

        </div>
      </section>
    </div>
  )
}
