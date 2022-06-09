import React, { Component } from 'react'

export default class Preloader extends Component {
    componentDidMount = () => {
        // window.preloader();
        // const trees = window.$('[data-widget="treeview"]');
        // trees.Treeview('init');
    }
    
    render() {
        
        return (
            <div className="preloader flex-column justify-content-center align-items-center">
                <img className="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height={60} width={60} />
            </div>

        )
    }
}
