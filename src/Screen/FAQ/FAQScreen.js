import React, { Component, useEffect } from 'react'

const FAQScreen = () => {

    useEffect(()=>{
        window.setupDigitInput();
    }, []);

    return (
        <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">FAQ Screen</h1>
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
                        <div className="row">
                            <div className='col-12'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <div className='card-title'>FAQ List</div>
                                    </div>
                                    <div className='card-body'>
                                        <div className='form-group'>
                                            <label>Number</label>
                                            <input id='number-field' className='form-control digit' pattern='[0-9]*'/>
                                        </div>
                                    </div>
                                    <div className='card-footer'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
}

export default FAQScreen;