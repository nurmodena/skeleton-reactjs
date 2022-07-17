import React from 'react';
import Overlay from '../../Components/Overlay/Overlay';
import { useForm, Controller } from 'react-hook-form';
import { InputSwitch } from 'primereact/inputswitch';

const LanguageDetail = ({ onSubmit, processing, register, errors, control }) => {

    const renderInputSwitch = ({ field }) => { return (<InputSwitch {...field} checked={field.value} />) }

    return (
        <form name="form-detail" onSubmit={onSubmit}>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <Overlay display={processing} />
                    <div className='modal-header'>
                        <h5 className="modal-title"><i className='fa fa-globe'></i> Add Language</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>

                    </div>
                    <div className='modal-body'>
                        <div className='form-group'>
                            <label>Language Code</label>
                            <input maxLength={2} {...register("code", { required: { value: true, message: 'Language code is required' }, maxLength: 2 })} className='form-control' placeholder='Language Code' />
                            <span className='text-danger' style={{ fontSize: 14 }}>{errors.code && errors.code.message}</span>
                        </div>
                        <div className='form-group'>
                            <label>Language</label>
                            <input {...register("name", { required: { value: true, message: 'Language is required!' } })} className='form-control' placeholder='Language' />
                            <span className='text-danger' style={{ fontSize: 14 }}>{errors.name && errors.name.message}</span>
                        </div>
                        <div className='form-group'>
                            <label>Flag Url</label>
                            <input {...register("image_name", { required: { value: true, message: 'Flag Url is required!' } })} className='form-control' placeholder='Flag Url' />
                            <span className='text-danger' style={{ fontSize: 14 }}>{errors.image_name && errors.image_name.message}</span>
                        </div>
                        <div className='form-group'>
                            <div className='d-flex flex-direction-row'>
                                <div className='flex-1'>
                                    <label>Active</label>
                                    <div>
                                        <Controller name="is_active" control={control} render={renderInputSwitch} />
                                    </div>
                                </div>
                                <div className='flex-2'>
                                    <label>Default</label>
                                    <div><Controller name="is_default" control={control} render={renderInputSwitch} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='modal-footer d-flex justify-content-center'>
                        <button type='button' className='btn btn-outline-dark' data-dismiss="modal"><i className='fa fa-times' ></i> Close</button>
                        <button type='submit' className='btn btn-dark' ><i className='fa fa-save' ></i> Save</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default LanguageDetail