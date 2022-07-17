import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getDashboardInfo } from '../../Service/DashboardService';

const CountPanel = ({ title, count, mode, icon, link }) => {

    return (
        <div className="col-lg-3 col-md-6 col-6">
            <div className={`small-box bg-${mode}`}>
                <div className="inner">
                    <h3>{count}</h3>
                    <p>{title}</p>
                </div>
                <div className="icon">
                    <i className={`fa ${icon}`} />
                </div>
                <NavLink to={link} className="small-box-footer">More Info <i className="fas fa-arrow-circle-right"></i></NavLink>
            </div>
        </div>
    )
}

const NewPackage = ({ data, title, link, icon }) => {

    return (
        <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="card">
                <div className="card-header">
                    <h5><i className={`fa ${icon}`}></i> {title}</h5>
                </div>
                <div className="card-body">
                    <table className="table">
                        <tbody>
                            {
                                data.map((item, i) => (
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
                        <NavLink to={link} className="color: #aaa">More details <i className="fas fa-arrow-right"></i></NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

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
                            <h1 className="m-0">Dashboard</h1>
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
                        <CountPanel title="Total Model" mode="info" count={totalModels} link="/model" icon="fa-tags" />
                        <CountPanel title="Total FAQ" mode="success" count={totalFaqs} link="/faq" icon="fa-question-circle" />
                        <CountPanel title="Total Installation" mode="warning" count={totalInstallation} link="/installation" icon="fa-download" />
                        <CountPanel title="Total Troubleshooting" mode="danger" count={totalTroubleshoot} link="/troubleshoot" icon="fa-tools" />
                    </div>
                    <div className="row">
                        <NewPackage title="New Models" data={newModels} icon="fa-tags" link="/model" />
                        <NewPackage title="New FAQs" data={newFaqs} icon="fa-question-circle" link="/faq" />
                    </div>
                    <div className="row">
                        <NewPackage title="New Installations" data={newInstallations} icon="fa-download" link="/installation" />
                        <NewPackage title="New Troubleshoots" data={newTroubleshoots} icon="fa-tools" link="/troubleshoot" />
                    </div>
                </div>
            </section>
        </div>
    );

};

export default HomeScreen;