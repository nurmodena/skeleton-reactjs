import React, { Component, useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import Overlay from '../Overlay/Overlay'

const $ = window.$;
const MTableId = `id_mtable_${parseInt(Math.random() * 10000)}`;
let timeoutId = 0;
let loadTimeout = 0;

const MTable = forwardRef((props, ref) => {
  const { columns, onAddData, showIndex, showAddButton, order, getData, hideFilter } = props;
  const [state, setCurrentState] = useState({
    data: [],
    total: 0,
    filters: [],
    filter: { field: '', value: '', title: '' },
    search: '',
    processing: false
  });
  const [paginator, setPaginator] = useState({
    page: 1,
    perpage: 10,
    search: '',
    filterAnd: '',
    order: order ? order : 'id',
    direction: 'asc',
    refresh: false
  });

  const setState = value => {
    setCurrentState({ ...state, ...value });
  }

  useEffect(
    () => {
      loadTimeout = setTimeout(() => {
        setState({ processing: true });
      }, 150);
      getData && getData(paginator).then(res => {
        clearTimeout(loadTimeout);
        const { data: { data, total } } = res;
        setState({ data, total, processing: false });
      }).catch(err => {
        clearTimeout(loadTimeout);
        setState({ processing: false, data: [], total: 0 });
      });
    },
    [paginator]
  );

  useImperativeHandle(ref, () => ({
    refresh: () => {
      setPaginator({ ...paginator, refresh: !paginator.refresh });
    }
  }));

  const { data, total, filters, filter, search, processing } = state;
  const totalPage = Math.ceil(total / paginator.perpage);
  const lastPage = totalPage >= 15 ? 15 : totalPage;
  const startRow = (paginator.page - 1) * paginator.perpage + 1;
  const _endRow = paginator.page * paginator.perpage;
  const endRow = _endRow >= total ? total : _endRow;

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
    setState({ search: value });
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setPaginator({ ...paginator, search: value, page: 1 });
    }, 200);
  };

  const onClear = () => {
    setState({ search: '' });
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
    setPaginator({ ...paginator, filterAnd: _filter });
  };

  const onAddFilter = () => {
    if (filter.field && filter.value) {
      filter.value = filter.value.trim();
      const _filters = [...filters, filter];
      setState({ filters: _filters, filter: { field: '', value: '', title: '' } });
      //do filtered request
      const _filter = _filters.map(e => `${e.field}:${e.value}`).join();
      setPaginator({ ...paginator, page: 1, filterAnd: _filter });
    }
  };

  const onValueEnter = e => {
    if (e.key == "Enter") {
      onAddFilter();
    }
  }

  const onRemoveFilter = item => () => {
    const _filters = filters.filter(e => e.field != item.field);
    setState({ filters: _filters });
    //do filtered request
    const _filter = _filters.map(e => `${e.field}:${e.value}`).join();
    setPaginator({ ...paginator, filterAnd: _filter });
  };

  const onFilterFieldChange = e => {
    const select = e.target;
    const title = select.options[select.selectedIndex].text;
    const _filter = { ...filter, field: select.value, title };
    setState({ filter: _filter });
  };

  const onFilterValueChange = e => {
    const _filter = { ...filter, value: e.target.value };
    setState({ filter: _filter });
  };

  const onResetFilter = () => {
    setState({ filters: [] });
    setPaginator({ ...paginator, filterAnd: '' });
    closeFilter();
  };

  const onAddDataClick = () => {
    if (onAddData) {
      onAddData();
    }
  }

  return (
    <div className="" id={MTableId}>
      <Overlay display={processing} />
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
                      : 'btn btn-outline-dark btn-search'
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
                  style={{ fontSize: 16 }}
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
                  style={{ justifyContent: 'space-between' }} >
                  <div style={{ flex: 1 }}>
                    <select
                      className="form-control rounded-0"
                      name="filter_field"
                      value={filter.field}
                      onChange={onFilterFieldChange} >
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
                      onKeyDown={onValueEnter}
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
          {
            !hideFilter && (
              <div style={{ width: 120 }}>
                <button
                  type="button"
                  className="btn btn-block btn-outline-dark"
                  onClick={openFilter}
                >
                  <i className="fa fa-filter" />
                  {` Filter `}
                  {filters.length > 0 &&
                    <span className="badge badge-danger">{filters.length}</span>}
                </button>
              </div>
            )
          }

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
                        onClick={onSort(item.field)}
                      >
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
      <div className="mb-3 mt-3" style={{ height: 1, background: '#ccc' }} />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ flex: 1, lineHeight: 3 }}>
          {`Showing ${startRow} - ${endRow} of ${total}`}
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

        <button type='button' className='btn btn-sm' onClick={onFirst} style={{ minWidth: 60 }}>
          <i className='fa fa-chevron-left' style={{ fontSize: 20 }} />
          <i className='fa fa-chevron-left' style={{ fontSize: 20 }} />
        </button>
        <button type='button' className='btn btn-sm ml-2 mr-2' onClick={onPrev} disabled={paginator.page == 1}>
          <i className='fa fa-chevron-left' style={{ fontSize: 20 }} />
        </button>
        <button type='button' className='btn btn-sm mr-2 ml-2' onClick={onNext} disabled={paginator.page == lastPage}>
          <i className='fa fa-chevron-right' style={{ fontSize: 20 }} />
        </button>
        <button type='button' className='btn btn-sm' onClick={onLast} style={{ minWidth: 60 }}>
          <i className='fa fa-chevron-right' style={{ fontSize: 20 }} />
          <i className='fa fa-chevron-right' style={{ fontSize: 20 }} />
        </button>
      </div>
    </div>
  );
});

export default MTable;
