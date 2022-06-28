import React, { Component, useEffect, useState, useRef } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { RadioButton } from 'primereact/radiobutton';
import MTable from '../../../Components/MTable/MTable';
import { getModelAll, deleteModel } from '../../../Service/ModelService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ModelScreen = () => {
  const navigate = useNavigate();
  const mTable = useRef();

  const onView = item => () => {
    navigate("view/" + item.code);
  };

  const onEdit = item => () => {
    navigate("edit/" + item.code);
  };

  const onRemove = item => () => {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      text: 'Deleted data can not be restored!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        removeData(item.id);
      }
    });
  };

  const removeData = id => {
    deleteModel(id, res => {
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

  const columns = [
    { id: 1, title: 'Modela Name', field: 'name', sortable: true },
    {
      id: 2, title: 'Description', field: 'description', sortable: true, style: { width: '40%' }, render: data => {
        return (<div style={{ maxHeight: 50, overflow: 'hidden', textOverflow: 'ellipsis' }}>{data.description}</div>)
      }
    },
    { id: 4, title: 'Series', field: 'code', sortable: true },
    { id: 5, title: 'Status', field: 'status', sortable: true },
    {
      id: 6,
      title: 'Active',
      field: 'is_active',
      sortable: true,
      render: data => {
        return <InputSwitch checked={data.is_active} />;
      },
    },
    {
      id: 7,
      title: 'Action',
      render: item => {
        return (
          <div>
            <a
              onClick={onView(item)}
              style={{
                cursor: 'pointer',
                color: 'orange',
                display: 'inline-block',
                marginRight: 20
              }}
            >
              <i className="fas fa-eye" />
              <span style={{ marginLeft: 10 }}>View</span>
            </a>
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
    navigate("add/new");
  }

  const propsTable = { columns, getData: getModelAll, showIndex: true, showAddButton: true, onAddData };


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
                <li className="breadcrumb-item active">Manage Model</li>
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
                    <i className="fas fa-tag mr-1" />
                    List Model
                  </h3>
                </div>
                <div className="card-body">
                  <MTable ref={mTable} {...propsTable} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModelScreen;
