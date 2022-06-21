import { Button } from 'primereact/button';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const images = [
  "https://images.bisnis-cdn.com/photos/2019/09/20/138906/modena.jpg",
  'https://mix.co.id/wp-content/uploads/2019/09/1-6.jpg',
  'https://img.beritasatu.com/cache/beritasatu/910x580-2/1578137514.jpeg',
  'https://static.republika.co.id/uploads/images/inpicture_slide/product-marketing-manager-pt-modena-indonesia-hendrik-senjaya-vice-_190626210801-936.jpg',
  'https://sinarharapan.id/wp-content/uploads/2019/08/220819-Modena-Kulkas-SHid.jpg',
  'https://images.bisnis-cdn.com/posts/2019/12/10/1179872/img20191210134340-1-min.jpg'
];

export default function ModelDetailScreen() {

  const { pageState, modelid } = useParams();

  const navigate = useNavigate()

  const wrapStyle = { width: 150, height: 100, borderRadius: 4, marginRight: 16, marginBottom: 16, position: 'relative' };

  const onBack = () => { navigate(-1); }

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
                <li className="breadcrumb-item active">Manage Modeal</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-globe mr-1" />
                {pageState && pageState.charAt(0).toUpperCase() + pageState.slice(1)} Model
              </h3>
            </div>
            <div className="card-body">
              <div className='row'>
                <div className='col-md-7'>
                  <div className='form-group'>
                    <label>Model Name</label>
                    <input className='form-control' placeholder='Model name' />
                  </div>
                  <div className='form-group'>
                    <label htmlFor="file-image" className='mr-3'>Upload Image</label>
                    <input id="file-image" className='d-none' type="file" accept="image/png, image/jpg, image/jpeg" />
                    <button type='button' className='btn btn-outline-warning' style={{ width: 120 }} onClick={() => { window.$("#file-image").click() }}><i className='fa fa-image' /> Chose </button>
                    <div className='d-flex' style={{ margin: '16px 0', flexFlow: 'wrap', padding: 10 }}>
                      {
                        images.map((item, i) => (
                          <div style={wrapStyle} key={`image-${i}`}>
                            <div style={{ position: 'absolute', right: -10, top: -10 }}>
                              <Button className='p-button-rounded p-button-danger' icon="pi pi-times" style={{ width: 30, height: 30 }} />
                            </div>
                            <img src={item} style={{ objectFit: 'cover', width: '100%', borderRadius: 4 }} />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='mr-3'>Description</label>
                    <textarea className='form-control' rows={4}></textarea>
                  </div>
                  <div className='form-group'>
                    <label className='mr-3'>Dimension</label>
                    <br />
                    <span>Enter product size to calculate volume weight</span>
                    <div className='d-flex justify-content-beteween mt-3'>
                      <div className='input-group' style={{ flex: 1 }}>
                        <input className='form-control' />
                        <div className='input-group-append'>
                          <span className='input-group-text'>cm</span>
                        </div>
                      </div>
                      <div className='input-group' style={{ flex: 1, margin: '0 20px' }}>
                        <input className='form-control' />
                        <div className='input-group-append'>
                          <span className='input-group-text'>cm</span>
                        </div>
                      </div>
                      <div className='input-group' style={{ flex: 1 }}>
                        <input className='form-control' />
                        <div className='input-group-append'>
                          <span className='input-group-text'>cm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-5'>
                  <div className='form-group'>
                    <label>Select Series</label>
                    <select className='form-control'>
                      <option value="series-1">Series 1</option>
                      <option value="series-2">Series 2</option>
                      <option value="series-3">Series 3</option>
                    </select>
                  </div>
                  <div className='form-group d-flex justify-content-center'>
                    <div style={{ marginTop: 40 }}>
                      <button type='button' className='btn btn-outline-dark' style={{ width: 120, marginRight: 16 }} onClick={onBack}><i className='fa fa-reply'></i> Back</button>
                      <button type='button' className='btn btn-dark' style={{ width: 120 }}><i className='fa fa-save'></i> Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
