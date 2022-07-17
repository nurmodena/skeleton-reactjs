import React from 'react'

const Search = ({ search, onSearchChange, onClear }) => {
    return (
        <div className="col-md-3">
            <div className="form-group">
                <div className="input-group">
                    <input
                        id="search"
                        name="search"
                        placeholder="Search"
                        className="form-control searchField"
                        value={search}
                        onChange={onSearchChange}
                        style={{ borderRightWidth: 0 }}
                    />
                    <div className="input-group-append">
                        <button
                            className={
                                search
                                    ? 'btn btn-outline-danger btn-search'
                                    : 'btn btn-outline-dark btn-search'
                            }
                            type="button"
                            style={{
                                borderWidth: 0.5,
                                borderColor: '#ccc',
                                borderLeftWidth: 0,
                            }}
                            onClick={onClear} >
                            <i className={search ? 'fa fa-times' : 'fa fa-search'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search