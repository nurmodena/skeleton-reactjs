import React from 'react'

const TableData = ({ showIndex, columns, data, paginator, startRow, onSort }) => {
    return (
        <div className="row">
            <div className="col-lg-12 col-md-12 col-12 mtable-container">
                <table className="table" style={{ marginTop: 16 }}>
                    <thead>
                        <tr>
                            {showIndex && (<th style={{ width: 60 }}>No</th>)}
                            {columns.map((item, i) => {
                                return item.sortable
                                    ? <th key={'key-' + i} style={item.style || {}}>
                                        <div
                                            className="d-flex"
                                            style={{
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                            }}
                                            onClick={onSort(item.field)} >
                                            <span className="d-block mr-2 flex-1">{item.title}</span>
                                            {paginator.order == item.field &&
                                                <i
                                                    className={
                                                        paginator.direction == 'asc'
                                                            ? 'fa fa-arrow-down'
                                                            : 'fa fa-arrow-up'
                                                    }
                                                />}
                                        </div>
                                    </th>
                                    : <th key={'key-' + i} style={item.style || {}}>{item.title}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr key={'key-' + i}>
                                {showIndex && (<td>{i + startRow}</td>)}
                                {columns.map((col, j) => {
                                    return (
                                        <td key={'key_col' + j} style={col.style ? col.style : {}}>
                                            {col.render ? col.render(item) : item[col.field]}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableData