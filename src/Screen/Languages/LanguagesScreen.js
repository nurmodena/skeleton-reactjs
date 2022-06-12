import React, {Component, useEffect, useState} from 'react';
import {InputSwitch} from 'primereact/inputswitch';
import {RadioButton} from 'primereact/radiobutton';
import MTable from '../../Components/MTable/MTable';
import {getAll} from '../../Service/LanguageService';

const LanguagesScreen = () => {
  useEffect (() => {}, []);

  const loadData = payload => {
    getAll (
      payload,
      res => {
        const {data, total} = res.data;
        setPropsTable ({...propsTable, data, totalRows: total});
      },
      err => {}
    );
  };

  const onRemove = item => () => {
    console.log ('You click remove', item);
  };

  const columns = [
    {id: 1, title: 'ID', field: 'id', sortable: true},
    {id: 2, title: 'Language', field: 'name', sortable: true},
    {id: 3, title: 'Language Code', field: 'code', sortable: true},
    {
      id: 4,
      title: 'Active',
      field: 'is_active',
      sortable: true,
      render: item => {
        return <InputSwitch checked={item.is_active} />;
      },
    },
    {
      id: 5,
      title: 'Is Default',
      field: 'is_default',
      sortable: true,
      render: item => {
        return <RadioButton checked={item.is_default} />;
      },
    },
    {
      id: 6,
      title: 'Action',
      render: item => {
        return (
          <a
            onClick={onRemove (item)}
            style={{
              cursor: 'pointer',
              color: 'maroon',
              display: 'inline-block',
            }}
          >
            <i className="fas fa-trash" />
            <span style={{marginLeft: 10}}>Delete</span>
          </a>
        );
      },
    },
  ];
  const [propsTable, setPropsTable] = useState ({data: [], columns, loadData});

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
                  <MTable {...propsTable} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LanguagesScreen;
