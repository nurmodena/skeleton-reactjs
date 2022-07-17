import { Dropdown } from 'primereact/dropdown'
import React from 'react'

const PagingInfo = ({ paginator, onPerPageChange, totalPage }) => {
    return (
        <div className="" >
            <div className="d-flex justify-content-end">
                <div style={{ lineHeight: 2.5, width: 150, textAlign: 'center' }}>
                    Rows per page
                </div>
                <div >
                    <Dropdown
                        options={[5, 10, 25, 50, 100]}
                        value={paginator.perpage}
                        onChange={onPerPageChange}
                    />
                </div>
                <div style={{ lineHeight: 2.5, width: 100, textAlign: 'center' }}>
                    {`Page ${paginator.page} of ${totalPage}`}
                </div>
            </div>
        </div>
    )
}

export default PagingInfo