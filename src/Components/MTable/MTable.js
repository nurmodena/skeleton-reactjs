import React, { Component, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const $ = window.$;
const MTableId = `id_mtable_${parseInt(Math.random() * 10000)}`;
let timeoutId = 0;

const MTable = props => {
  const { data, columns, totalRows, loadData, onAddData, showIndex, showAddButton } = props;
  const [filters, setFilters] = useState([]);
  const [filter, setFilter] = useState({ field: '', value: '', title: '' });
  const [paginator, setPaginator] = useState({
    page: 1,
    perpage: 10,
    search: '',
    filter: '',
    order: 'id',
    direction: 'asc',
  });

  const [search, setSearch] = useState('');

  useEffect(
    () => {
      loadData(paginator);
    },
    [paginator]
  );

  const totalPage = Math.ceil(totalRows / paginator.perpage);
  const lastPage = totalPage >= 15 ? 15 : totalPage;
  const startRow = (paginator.page - 1) * paginator.perpage + 1;
  const _endRow = paginator.page * paginator.perpage;
  const endRow = _endRow >= totalRows ? totalRows : _endRow;

  const onPerPageChange = e => {
    setPaginator({ ...paginator, perpage: e.value, page: 1 });
  };

  const onFirst = () => {
    setPaginator({ ...paginator, page: 1 });
  };

  const onLast = () => {
    setPaginator({ ...paginator, page: lastPage });
  };

  const onNext = () => {
    setPaginator({ ...paginator, page: paginator.page + 1 });
  };

  const onPrev = () => {
    setPaginator({ ...paginator, page: paginator.page - 1 });
  };

  const onSort = field => () => {
    const direction = paginator.direction == 'asc' ? 'desc' : 'asc';
    setPaginator({ ...paginator, order: field, direction });
  };

  const onSearchChange = e => {
    const value = e.target.value;
    setSearch(value);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setPaginator({ ...paginator, search: value, page: 1 });
    }, 200);
  };

  const onClear = () => {
    setSearch('');
    setPaginator({ ...paginator, search: '' });
  };

  const openFilter = () => {
    $(`#${MTableId}_filter`).animate(
      {
        height: 400,
        opacity: 1,
      },
      150
    );
  };

  const closeFilter = () => {
    $(`#${MTableId}_filter`).animate(
      {
        height: 0,
        opacity: 0,
      },
      150
    );
  };

  const onApplyFilter = () => {
    const _filter = filters.map(e => `${e.field}:${e.value}`).join();
    setPaginator({ ...paginator, filter: _filter });
  };

  const onAddFilter = () => {
    if (filter.field && filter.value) {
      const _filters = [...filters, filter];
      setFilters(_filters);
      setFilter({ field: '', value: '', title: '' });
      //do filtered request
      const _filter = _filters.map(e => `${e.field}:${e.value}`).join();
      setPaginator({ ...paginator, filter: _filter });
    }
  };

  const onRemoveFilter = item => () => {
    const _filters = filters.filter(e => e.field != item.field);
    setFilters(_filters);
    //do filtered request
    const _filter = _filters.map(e => `${e.field}:${e.value}`).join();
    setPaginator({ ...paginator, filter: _filter });
  };

  const onFilterFieldChange = e => {
    const select = e.target;
    const title = select.options[select.selectedIndex].text;
    setFilter({ ...filter, field: select.value, title });
  };

  const onFilterValueChange = e => {
    setFilter({ ...filter, value: e.target.value });
  };

  const onResetFilter = () => {
    setFilters([]);
    setPaginator({ ...paginator, filter: '' });
    closeFilter();
  };

  const onAddDataClick = () => {
    if (onAddData) {
      onAddData();
    }
  }

  return (
    <div className="" id={MTableId}>
      <div className="row">
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
                      : 'btn btn-outline-warning btn-search'
                  }
                  type="button"
                  style={{
                    borderWidth: 0.5,
                    borderColor: '#ccc',
                    borderLeftWidth: 0,
                  }}
                  onClick={onClear}
                >
                  <i className={search ? 'fa fa-times' : 'fa fa-search'} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div id={`${MTableId}_filter`} className="filterContainer">
            <div className="card" style={{ height: '100%' }}>
              <div className="card-header" style={{ height: 40, paddingTop: 7 }}>
                <div
                  className="card-title"
                  style={{ color: '#ffc107', fontSize: 16 }}
                >
                  <i className="fa fa-filter" /> Filter
                </div>
                <div className="card-tools" style={{ marginTop: -7 }}>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={closeFilter}
                  >
                    <i className="fa fa-times" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div
                  className="d-flex"
                  style={{ justifyContent: 'space-between' }}
                >
                  <div style={{ flex: 1 }}>
                    <select
                      className="form-control rounded-0"
                      name="filter_field"
                      value={filter.field}
                      onChange={onFilterFieldChange}
                    >
                      <option value={''}>Select field</option>
                      {columns
                        .filter(item => item.field)
                        .filter(
                          e =>
                            filters
                              .map(d => d.field)
                              .join()
                              .indexOf(e.field) == -1
                        )
                        .map((col, i) => (
                          <option key={`key-option-${i}`} value={col.field}>
                            {col.title}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div style={{ width: 10 }} />
                  <div style={{ flex: 1 }}>
                    <input
                      name="filter_value"
                      className="form-control"
                      placeholder="Filter value"
                      value={filter.value}
                      onChange={onFilterValueChange}
                    />
                  </div>
                  <div style={{ width: 10 }} />
                  <div>
                    <button
                      type="button"
                      className="btn  btn-outline-warning"
                      onClick={onAddFilter}
                    >
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                <div
                  style={{ height: 1, background: '#ccc', margin: '10px 0' }}
                />
                <div
                  className="hideScrollbar"
                  style={{
                    height: 220,
                    overflowY: 'scroll',
                    border: 'solid 0px #ccc',
                  }}
                >
                  <div className="d-flex" style={{ flexDirection: 'column' }}>

                    <div>
                      {filters.map((item, i) => (
                        <div
                          key={`item_filter_${i}`}
                          className="d-flex"
                          style={{ flexDirection: 'column' }}
                        >
                          <div
                            key={`key-item-filter-${i}`}
                            className="d-flex"
                            style={{
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <div style={{ flex: 1 }}>{item.title}</div>
                            <div style={{ margin: '0 10px', color: 'orangered' }}>
                              contains
                            </div>
                            <div
                              style={{
                                flex: 1,
                                color: 'darkblue',
                                fontStyle: 'italic',
                              }}
                            >
                              {item.value}
                            </div>
                            <div>
                              <button
                                type="button"
                                className="btn btn-outline"
                                onClick={onRemoveFilter(item)}
                              >
                                <i
                                  className="fa fa-times"
                                  style={{ color: 'red' }}
                                />
                              </button>
                            </div>
                          </div>
                          <div
                            style={{
                              height: 1,
                              background: '#ccc',
                              margin: '6px 0',
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="d-flex mt-3" style={{ justifyContent: 'center' }}>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={onResetFilter}
                    style={{ width: 100 }}
                  >
                    <i className="fa fa-times" /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: 120 }}>
            <button
              type="button"
              className="btn btn-block btn-outline-warning"
              onClick={openFilter}
            >
              <i className="fa fa-filter" />
              {` Filter `}
              {filters.length > 0 &&
                <span className="badge badge-danger">{filters.length}</span>}
            </button>
          </div>

        </div>
        <div className="col-md-5" />
        {showAddButton && (
          <div className="col-md-2">
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: 150 }}>
                <button
                  type="button"
                  className="btn btn-block btn-outline-warning"
                  onClick={onAddDataClick}
                >
                  <i className="fa fa-plus" /> Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
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
                    onClick={onSort(item.field)}
                  >
                    <span className="d-block mr-2">{item.title}</span>
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
                : <th key={'key-' + i}>{item.title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={'key-' + item.id}>
              {showIndex && (<td>{i + 1}</td>)}
              {columns.map((col, j) => {
                return (
                  <td key={'key_col' + col.id}>
                    {col.render ? col.render(item) : item[col.field]}
                  </td>
                );
              })}
            </tr>
          ))}

        </tbody>
      </table>
      <div className="mb-3 mt-3" style={{ height: 1, background: '#ccc' }} />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ flex: 1, lineHeight: 3 }}>
          {`Showing ${startRow} - ${endRow} of ${totalRows}`}
        </div>
        <div style={{ lineHeight: 3, width: 150, textAlign: 'center' }}>
          Rows per page
        </div>
        <div >
        <Dropdown
            options={[5, 10, 25, 50, 100]}
            value={paginator.perpage}
            onChange={onPerPageChange}
          />
        </div>
        <div style={{ lineHeight: 3, width: 100, textAlign: 'center' }}>
          {`${paginator.page} of ${totalPage}`}
        </div>
        <Button
          className="p-button-text"
          icon="pi pi-angle-double-left"
          style={{ marginLeft: 10 }}
          onClick={onFirst}
        />
        <Button
          className="p-button-text"
          icon="pi pi-angle-left"
          style={{ marginLeft: 10 }}
          onClick={onPrev}
          disabled={paginator.page == 1}
        />
        <Button
          className="p-button-text"
          icon="pi pi-angle-right"
          style={{ marginLeft: 10 }}
          onClick={onNext}
          disabled={paginator.page == lastPage}
        />
        <Button
          className="p-button-text"
          icon="pi pi-angle-double-right"
          style={{ marginLeft: 10 }}
          onClick={onLast}
        />
      </div>
    </div>
  );
};

export default MTable;
