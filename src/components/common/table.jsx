import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = ({ column, sortColumn, onSort, data }) => {
    return (
      <table className="table">
        <TableHeader
          column={column}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={data} column={column} />
      </table>
    );
}
 
export default Table;