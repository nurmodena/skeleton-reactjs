import React, { Component, useEffect, useState } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { RadioButton } from 'primereact/radiobutton';
import MTable from '../../Components/MTable/MTable';
import { createLanguage, deleteLanguage, getAll, updateLanguage } from '../../Service/LanguageService';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
const { $ } = window;

const LanguagesScreen = () => {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      code: '',
      is_default: false,
      is_active: true
    }
  });

  const loadData = payload => {
    getAll(
      payload,
      res => {
        const { data, total } = res.data;
        setPropsTable({ ...propsTable, data, totalRows: total });
      },
      err => {
        setPropsTable({ ...propsTable, data: [], totalRows: 0 });
        
      }
    );
  };

  const removeData = id => {
    deleteLanguage(id, res => {
      if (res.status == 200 || res.status == 201) {
        Swal.fire({ 
          icon: 'success',
          title: 'Delete data success',
          text: 'Data has been deleted!'
        }).then(res => {loadData()}); 
      }
    }, error => {
      Swal.fire({ 
        icon: 'error',
        title: 'Delete data fail',
        text: 'Data can not be deleetd!'
      });
    });
  }

  const onRemove = item => () => {
    console.log('You click remove', item);
    Swal.fire({ 
      icon: 'question',
      title: 'Are you sure?',
      text: 'Deleted data can not be restored!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
    }).then(({isConfirmed}) => {
      if (isConfirmed) {
        removeData(item.code);
      }
    });
  };
  
  const onActiveChange = item => (e) => {
    item.is_active = e.value;
    updateLanguage(item, res=>{loadData({})});
  } 

  const onDefaultChange = item => (e) => { 
    item.is_default = e.checked;
    updateLanguage(item, res=>{loadData({})});
  } 

  const columns = [
    { id: 1, title: 'ID', field: 'id', sortable: true },
    { id: 2, title: 'Language', field: 'name', sortable: true },
    { id: 3, title: 'Language Code', field: 'code', sortable: true },
    {
      id: 4,
      title: 'Active',
      field: 'is_active',
      sortable: true,
      render: item => {
        return <InputSwitch checked={item.is_active} onChange={onActiveChange(item)}/>;
      },
    },
    {
      id: 5,
      title: 'Is Default',
      field: 'is_default',
      sortable: true,
      render: item => {
        return <RadioButton checked={item.is_default} onChange={onDefaultChange(item)}/>;
      },
    },
    {
      id: 6,
      title: 'Action',
      render: item => {
        return (
          <a
            onClick={onRemove(item)}
            style={{
              cursor: 'pointer',
              color: 'maroon',
              display: 'inline-block',
            }}
          >
            <i className="fas fa-trash" />
            <span style={{ marginLeft: 10 }}>Delete</span>
          </a>
        );
      },
    },
  ];
  const [propsTable, setPropsTable] = useState({ data: [], columns, loadData });

  const onAddData = () => {
    reset({
      name: '',
      code: '',
      is_default: false,
      is_active: true
    });
    $("#modal-detail").modal();
  }

  const onCloseModal = () => {
    $("#modal-detail").modal('hide');
  }
  const onSUbmitData = (data) => {
    console.log('form data', data); 
    createLanguage(data, ({data, status}) => {
      if(status == 200 || status == 201) {
        //show Info success Create Language
        Swal.fire({ 
          icon: 'success',
          title: 'Save data success',
          text: 'Data has been saved!'
        }).then(val => {
          onCloseModal();
        }); 
      }
    },
    err => {
      //show Info fail Create Language
      Swal.fire({ 
        icon: 'error',
        title: 'Error',
        text: 'Save data error!'
      }); 
      console.log('Error: ', err);
    })
  }

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Manage Languages </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Manage Languages</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-globe mr-1" />
                    List Languages
                  </h3>
                </div>
                <div className="card-body">
                  <MTable {...propsTable} onAddData={onAddData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/**Modal Detal */}
      <div id="modal-detail" className='modal fade'>
        <form name="form-detail" onSubmit={handleSubmit(onSUbmitData)}>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className="modal-title"><i className='fa fa-globe'></i> Add Language</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>

              </div>
              <div className='modal-body'>
                <div className='form-group'>
                  <label>Language</label>
                  <input {...register("name", { required: { value: true, message: 'Language is required!' } })} className='form-control' placeholder='Language' />
                  <span className='text-danger' style={{ fontSize: 14 }}>{errors.name && errors.name.message}</span>
                </div>
                <div className='form-group'>
                  <label>Language Code</label>
                  <input maxLength={2} {...register("code", { required: { value: true, message: 'Language code is required' }, maxLength: 2 })} className='form-control' placeholder='Language Code' />
                  <span className='text-danger' style={{ fontSize: 14 }}>{errors.code && errors.code.message}</span>
                </div>
                <div className='form-group'>
                  <div className='d-flex flex-direction-row'>
                    <div className='flex-1'>
                      <label>Active</label>
                      <div>
                        <Controller name="is_active" control={control} render={({field})=>{ return (<InputSwitch {...field} checked={field.value} />)}}/>
                      </div>
                    </div>
                    <div className='flex-2'>
                      <label>Default</label>
                      <div><Controller name="is_default" control={control} render={({field})=>{ return (<InputSwitch {...field} checked={field.value} />)}}/></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-footer d-flex justify-content-center'>
                <button type='button' className='btn btn-outline-dark' data-dismiss="modal"><i className='fa fa-times' ></i> Close</button>
                <button type='submit' className='btn btn-primary' ><i className='fa fa-save' ></i> Save</button>
              </div>
            </div>
          </div>
        </form>
      </div> {/**EndModal Detal */}

    </div>
  );
};

export default LanguagesScreen;
