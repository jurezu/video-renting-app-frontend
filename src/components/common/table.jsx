import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

class TableComponent extends Component {
  state = {};
  render() {
    const { onSort, sortColumn, columns, data, onDelete, onLike } = this.props;
    return (
      <table className="table">
        <TableHeader
          onSort={onSort}
          sortColumn={sortColumn}
          columns={columns}
        />
        <TableBody
          data={data}
          onDelete={onDelete}
          onLike={onLike}
          columns={columns}
        />
      </table>
    );
  }
}

export default TableComponent;
