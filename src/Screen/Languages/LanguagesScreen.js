import React, { Component, useEffect, useState, useRef } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { RadioButton } from 'primereact/radiobutton';
import MTable from '../../Components/MTable/MTable';
import { createLanguage, deleteLanguage, getLanguageAll, updateLanguage } from '../../Service/LanguageService';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import Overlay from '../../Components/Overlay/Overlay';
import LanguageDetail from './LanguageDetail';

const { $ } = window;
let processTimeout = 0;

const LanguagesScreen = () => {
  const mTable = useRef();
  const [state, setState] = useState({ processing: false });
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      code: '',
      image_name: '',
      is_default: false,
      is_active: true
    }
  });

  const removeData = id => {
    deleteLanguage(id, res => {
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

  const onRemove = item => () => {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      text: 'Deleted data can not be restored!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        removeData(item.code);
      }
    });
  };

  const onActiveChange = item => (e) => {
    item.is_active = e.value;
    updateLanguage(item, res => { mTable.current.refresh(); });
  }

  const onDefaultChange = item => (e) => {
    item.is_default = e.checked;
    updateLanguage(item, res => { mTable.current.refresh(); });
  }

  const onAddData = () => {
    reset({
      name: '',
      code: '',
      image_name: '',
      is_default: false,
      is_active: true
    });
    $("#modal-detail").modal();
  }

  const onCloseModal = () => {
    $("#modal-detail").modal('hide');
  }

  const onSubmitData = (data) => {
    processTimeout = setTimeout(() => {
      console.log('1. start processing');
      setState({ ...state, processing: true });
    }, 150);
    createLanguage(data, ({ data, status }) => {
      console.log('2. success set processing: false');
      setState({ ...state, processing: false });
      if (status == 200 || status == 201) {
        //show Info success Create Language
        Swal.fire({
          icon: 'success',
          title: 'Save data success',
          text: 'Data has been saved!'
        }).then(val => {
          onCloseModal();
          mTable.current.refresh();
        });
      }
    },
      ({ response: { data: { errors } } }) => {
        //show Info fail Create Language
        const [key] = Object.keys(errors || {});
        const message = errors[key];
        console.log('3. Error set processing: false', data);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        });
        setState({ ...state, processing: false });
      }).finally(_ => {

        console.log('4. finally set processing: false');
        clearTimeout(processTimeout);
        setState({ ...state, processing: false });
      })

  }

  const columns = [
    { id: 2, title: 'Language', field: 'name', sortable: true },
    { id: 3, title: 'Language Code', field: 'code', sortable: true },
    {
      id: 4,
      title: 'Active',
      field: 'is_active',
      sortable: true,
      render: item => {
        return <InputSwitch checked={item.is_active} onChange={onActiveChange(item)} />;
      },
    },
    {
      id: 5,
      title: 'Is Default',
      field: 'is_default',
      sortable: true,
      render: item => {
        return <RadioButton checked={item.is_default} onChange={onDefaultChange(item)} />;
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
  const { processing } = state;
  const propsTable = { columns, getData: getLanguageAll, showIndex: true };
  const propsDetail = { processing, errors, control, register, onSubmit: handleSubmit(onSubmitData), };

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
                  <MTable ref={mTable} {...propsTable} onAddData={onAddData} showAddButton={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/**Modal Detal */}
      <div id="modal-detail" className='modal fade'>
        <LanguageDetail {...propsDetail} />
      </div> {/**EndModal Detal */}

    </div>
  );
};

export default LanguagesScreen;
