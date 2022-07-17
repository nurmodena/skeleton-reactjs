import React from 'react'

const AddButton = ({ onAddDataClick }) => {
    return (
        <div className="col-md-2">
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: 150 }}>
                    <button
                        type="button"
                        className="btn btn-block btn-outline-warning"
                        onClick={onAddDataClick} >
                        <i className="fa fa-plus" /> Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddButton