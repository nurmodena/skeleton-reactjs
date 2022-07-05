import React, { Component, useEffect } from 'react';

const Footer = () => {

    useEffect(() => {
        window.loadTree();
    }, []);

    return (
        <footer className="main-footer">
            <strong>Copyright © 2022 IT-Modena </strong>  All rights reserved.
            <div className="float-right d-none d-sm-inline-block">
                <b>Version</b> 1.0.0
            </div>
        </footer>


    )

}

export default Footer;