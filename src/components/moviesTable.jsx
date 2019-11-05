import React, { Component } from "react";
import Like from "./common/like";

class MoviesTable extends Component {
  state = {};
  render() {
    const { movies, onDelete, onLike } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rental Rate</th>
            <th scope="col">Like</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map(m => (
            <tr key={m._id}>
              <td>{m.title}</td>
              <td>{m.genre.name}</td>
              <td>{m.numberInStock}</td>
              <td>{m.dailyRentalRate}</td>
              <td>
                <Like liked={m.liked} onLike={() => onLike(m)}></Like>
              </td>
              <td>
                <button
                  onClick={() => onDelete(m)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
