import React, { Component } from "react";
import Like from "./common/like";
import TableComponent from "./common/table";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onLike={() => this.props.onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { sortColumn, onSort, movies, onDelete, onLike } = this.props;
    return (
      <TableComponent
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
        data={movies}
        onDelete={onDelete}
        onLike={onLike}
      />
    );
  }
}

export default MoviesTable;
