import React, { Component, useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const MTable = (props) => {

    const { data, columns } = props;

    const [paginator, setPaginator] = useState({ page: 1, rowsPerPage: 10, totalPage: 10, totalROws: 100 });

    const onPerPageChange = (e) => {
        setPaginator({ ...paginator, rowsPerPage: e.value });
    } 

    const onFirst = () => {
        
    }

    return (
        <div className="">
            <div className='row'>
                <div className='col-md-3'>
                    <div className='form-group'>
                        <div className='input-group' >
                            <input id="search" name="search" placeholder='Search' className='form-control' />
                            <div className='input-group-append'>
                                <span className='input-group-text'>
                                    <i className='fa fa-search'></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-2'>
                    <div style={{ width: 100 }}> <button type='button' className='btn btn-block btn-outline-warning' ><i className='fa fa-filter'></i> Filter</button></div>
                </div>
                <div className='col-md-5'></div>
                <div className='col-md-2'>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ width: 150 }}> <button type='button' className='btn btn-block btn-outline-warning' ><i className='fa fa-plus'></i> Add</button></div>
                    </div>
                </div>
            </div>
            <table className="table" style={{ marginTop: 16 }}>
                <thead>
                    <tr>
                        {
                            columns.map((item, i) => (
                                <th key={'key-' + item.id}>{item.title}</th>
                            ))
                        } 
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, i) => (
                            <tr key={'key-' + item.id}>
                                {
                                    columns.map((col, j) => {
                                        return (<td key={'key_col' + col.id}>{col.render ? col.render(item) : item[col.field]}</td>)
                                    })
                                } 
                            </tr>
                        ))
                    }

                </tbody>
            </table>
            <div className='mb-3 mt-3' style={{ height: 1, background: '#ccc' }}></div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ flex: 1, lineHeight: 3 }}>Showing 1 - 10 of 100</div>
                <div style={{ lineHeight: 3, width: 150, textAlign: 'center' }}> Rows per page </div>
                <Dropdown options={[10, 25, 50, 100]} value={paginator.rowsPerPage} onChange={onPerPageChange} />
                <div style={{ lineHeight: 3, width: 100, textAlign: 'center' }}> 1 of 10</div>
                <Button className='p-button-text' icon="pi pi-angle-double-left" style={{ marginLeft: 10 }} onClick={onFirst}/>
                <Button className='p-button-text' icon="pi pi-angle-left" style={{ marginLeft: 10 }} />
                <Button className='p-button-text' icon="pi pi-angle-right" style={{ marginLeft: 10 }} />
                <Button className='p-button-text' icon="pi pi-angle-double-right" style={{ marginLeft: 10 }} />
            </div>
        </div>
    );
}


export default MTable;