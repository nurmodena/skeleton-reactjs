import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getDashboardInfo } from '../../Service/DashboardService'

const HomeScreen = () => {

    const [dashboard, setDashboard] = useState({
        totalFaqs: 0,
        totalModels: 0,
        totalInstallation: 0,
        totalTroubleshoot: 0,
        newModels: [],
        newFaqs: [],
        newInstallations: [],
        newTroubleshoots: [],
    });

    useEffect(() => {
        getDashboardInfo().then(({ data }) => {
            console.log('data dashboard', data);
            setDashboard(data);
        })
    }, []);

    const { totalFaqs, totalModels, totalInstallation, totalTroubleshoot, newModels, newFaqs, newInstallations, newTroubleshoots } = dashboard;
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Home Page</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Home Page</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-6">
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>{totalModels}</h3>
                                    <p>Total Model</p>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-tags" />
                                </div>
                                <NavLink to={"/model"} className="small-box-footer">More Info <i className="fas fa-arrow-circle-right"></i></NavLink>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-6">
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>{totalFaqs}</h3>
                                    <p>Total FAQ</p>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-question-circle"></i>
                                </div>
                                <NavLink to={"/faq"} className="small-box-footer">More Info <i className="fas fa-arrow-circle-right"></i></NavLink>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6">
                            <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>{totalInstallation}</h3>
                                    <p>Total Installation</p>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-download"></i>
                                </div>
                                <NavLink to={"/installation"} className="small-box-footer">More Info <i className="fas fa-arrow-circle-right"></i></NavLink>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6">
                            <div className="small-box bg-danger">
                                <div className="inner">
                                    <h3>{totalTroubleshoot}</h3>
                                    <p>Total Troubleshooting</p>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-tools"></i>
                                </div>
                                <NavLink to={"/troubleshoot"} className="small-box-footer">List FAQ <i className="fas fa-arrow-circle-right"></i></NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5><i className="fa fa-tags"></i> New Models</h5>
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <tbody>
                                            {
                                                newModels.map((item, i) => (
                                                    <tr key={`yd-${i}`}>
                                                        <td>
                                                            <p style={{ fontSize: 20, fontWeight: 500 }}>{item.name}</p>
                                                            <div style={{ maxHeight: 50, overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.description}</div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer">
                                    <div className="d-flex justify-content-end">
                                        <NavLink to={"/model"} className="color: #aaa">More details <i className="fas fa-arrow-right"></i></NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h5><i className="fa fa-question-circle"></i> New FAQs</h5>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <tbody>
                                            {
                                                newFaqs.map((item, i) => (
                                                    <tr key={`yd-${i}`}>
                                                        <td>
                                                            <p style={{ fontSize: 20, fontWeight: 500 }}>{item.name}</p>
                                                            <div style={{ maxHeight: 50, overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.models}</div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer">
                                    <div className="d-flex justify-content-end">
                                        <NavLink to={"/faq"} className="color: #aaa">More details <i className="fas fa-arrow-right"></i></NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5><i className="fa fa-download"></i> New Installations</h5>
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <tbody>
                                            {
                                                newInstallations.map((item, i) => (
                                                    <tr key={`yd-${i}`}>
                                                        <td>
                                                            <p style={{ fontSize: 20, fontWeight: 500 }}>{item.name}</p>
                                                            <div style={{ maxHeight: 50, overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.models}</div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer">
                                    <div className="d-flex justify-content-end">
                                        <NavLink to={"/installation"} className="color: #aaa">More details <i className="fas fa-arrow-right"></i></NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h5><i className="fa fa-tools"></i> New Troubleshoots</h5>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <tbody>
                                            {
                                                newTroubleshoots.map((item, i) => (
                                                    <tr key={`yd-${i}`}>
                                                        <td>
                                                            <p style={{ fontSize: 20, fontWeight: 500 }}>{item.name}</p>
                                                            <div style={{ maxHeight: 50, overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.models}</div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer">
                                    <div className="d-flex justify-content-end">
                                        <NavLink to={"/troubleshoot"} className="color: #aaa">More details <i className="fas fa-arrow-right"></i></NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

};

export default HomeScreen;