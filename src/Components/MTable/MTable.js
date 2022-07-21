import React, { Component, useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import Overlay from '../Overlay/Overlay'
import NavPagination from './NavPagination';
import PagingInfo from './PagingInfo';
import Search from './Search';
import Filter from './Filter';
import TableData from './TableData';
import AddButton from './AddButton';

const $ = window.$;
let timeoutId = 0;

const MTable = forwardRef(({ columns, onAddData, showIndex, showAddButton, order, getData, hideFilter, id }, ref) => {
  const [state, setCurrentState] = useState({
    data: [],
    total: 0,
    filters: [],
    filter: { field: '', value: '', title: '' },
    search: '',
    processing: false,
    mTableId: id || `mTableId_${parseInt(Math.random() * 10000000)}`
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
      let loadTimeout = setTimeout(() => {
        setState({ processing: true });
      }, 150);
      const _paginatpr = { ...paginator };
      if (!_paginatpr.filterAnd) {
        delete _paginatpr.filterAnd;
      }
      delete _paginatpr.refresh;
      getData && getData(_paginatpr).then(res => {
        clearTimeout(loadTimeout);
        const { data: { data, total } } = res;
        setState({ data, total, processing: false });
      }).catch(err => {
        clearTimeout(loadTimeout);
        setState({ processing: false, data: [], total: 0 });
      });

      attachDocumentCLick(mTableId);
    },
    [paginator]
  );

  useImperativeHandle(ref, () => ({
    refresh: () => {
      setPaginator({ ...paginator, refresh: !paginator.refresh });
    }
  }));

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
    $(`#${mTableId}_filter`).animate(
      {
        height: 400,
        opacity: 1,
      },
      150
    );
  };

  const closeFilter = () => {
    $(`#${mTableId}_filter`).animate(
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

  const attachDocumentCLick = (id) => {
    const onCLick = e => {
      const filterButton = document.getElementById('buttonFilter_' + id);
      const filterContainer = document.getElementById(`${id}_filter`);
      if ((filterButton && filterButton.contains(e.target)) || (filterContainer && filterContainer.contains(e.target))) { } else {
        if ($(`#${id}_filter`).css('opacity') == '1') {
          $(`#${id}_filter`).animate({ height: 0, opacity: 0, }, 100);
        }
      }
    }
    const root = document.getElementById('root');
    root.removeEventListener('click', onCLick);
    root.addEventListener('click', onCLick);
  }

  const { data, total, filters, filter, search, processing, mTableId } = state;
  const totalPage = Math.ceil(total / paginator.perpage);
  const lastPage = totalPage >= 15 ? 15 : totalPage;
  const startRow = (paginator.page - 1) * paginator.perpage + 1;
  const _endRow = paginator.page * paginator.perpage;
  const endRow = _endRow >= total ? total : _endRow;

  const tableProps = { showIndex, columns, data, paginator, startRow, onSort };
  const filterProps = {
    mTableId, filter, filters, hideFilter, columns,
    openFilter, closeFilter, onAddFilter, onFilterFieldChange,
    onFilterValueChange, onRemoveFilter, onResetFilter, onValueEnter
  };
  const navPaginationProps = { paginator, lastPage, totalPage, onPrev, onNext, onFirst, onLast };

  return (
    <div className="" id={mTableId}>
      <Overlay display={processing} />
      <div className="row">
        <Search search={search} onClear={onClear} onSearchChange={onSearchChange} />
        <Filter {...filterProps} />
        <div className="col-md-5" />
        {showAddButton && (
          <AddButton onAddDataClick={onAddDataClick} />
        )}
      </div>
      {/**Table data component, display data  */}
      <TableData {...tableProps} />
      <div className="mb-3 mt-3" style={{ height: 1, background: '#ccc' }} />
      <div className="row">
        <div className="col-lg-2 col-md-3 col-sm-12" >
          <div className='mt-2' style={{ minWidth: 180 }}>{`Showing ${startRow} - ${endRow} of ${total}`}</div>
        </div>
        <div className="col-lg-10 col-md-9 col-sm-12">
          <div className="row justify-content-end" >
            {/**Paging info, display paging info and do the onchange page */}
            <PagingInfo paginator={paginator} onPerPageChange={onPerPageChange} totalPage={totalPage} />
            {/**Paging navigation compoennt, render paging navigation button */}
            <NavPagination {...navPaginationProps} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default MTable;