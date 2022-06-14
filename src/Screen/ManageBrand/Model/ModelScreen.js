import React, { Component, useEffect, useState } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { RadioButton } from 'primereact/radiobutton';
import MTable from '../../../Components/MTable/MTable';
import { getModelAll } from '../../../Service/ModelService';
import { useNavigate } from 'react-router-dom';

const ModelScreen = () => {
  let navigate = useNavigate();

  useEffect(() => { }, []);

  const loadData = payload => {
    getModelAll(
      payload,
      res => {
        console.log('res', res);
        const { data, total } = res.data;
        setPropsTable({ ...propsTable, data, totalRows: total });
      },
      err => { }
    );
  };

  const onView = item => () => {
    navigate("view/" + item.id);
  };

  const onEdit = item => () => {
    navigate("edit/" + item.id);
  };

  const onRemove = item => () => {
    console.log('You click remove', item);
  };

  const columns = [
    { id: 1, title: 'Modela Name', field: 'name', sortable: true },
    { id: 2, title: 'Description', field: 'description', sortable: true },
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

  const [propsTable, setPropsTable] = useState({ data: [], columns, loadData });

  const onAddData = () => {
    navigate("add/new");
  }

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
                    <i className="fas fa-globe mr-1" />
                    List Model
                  </h3>
                </div>
                <div className="card-body">
                  <MTable {...propsTable} showIndex={true} showAddButton={true} onAddData={onAddData} />
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
