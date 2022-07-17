import React from 'react'

const NavPagination = ({ onFirst, onPrev, onNext, onLast, paginator, lastPage }) => {
    return (
        <div className="" >
            <div className="d-flex justify-content-end" style={{ minHeight: 50 }}>
                <button type='button' className='btn btn-sm' onClick={onFirst} style={{ minWidth: 60 }}>
                    <i className='material-icons' style={{ fontSize: 30 }} >first_page</i>
                </button>
                <button type='button' className='btn btn-sm' onClick={onPrev} disabled={paginator.page == 1}>
                    <i className='material-icons' style={{ fontSize: 30 }} >navigate_before</i>
                </button>
                <button type='button' className='btn btn-sm' onClick={onNext} disabled={paginator.page == lastPage}>
                    <i className='material-icons' style={{ fontSize: 30 }} >navigate_next</i>
                </button>
                <button type='button' className='btn btn-sm' onClick={onLast} style={{ minWidth: 60 }}>
                    <i className='material-icons' style={{ fontSize: 30 }} >last_page</i>
                </button>
            </div>
        </div>
    )
}

export default NavPagination