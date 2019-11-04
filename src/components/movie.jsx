import React, { Component } from "react";

import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
class Movie extends Component {
  state = { movies: getMovies(), pageSize: 3, currentPage: 1 };

  handlePageChange = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = m => {
    console.log(m.title);
    const movies = [...this.state.movies];
    const index = movies.indexOf(m);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, movies: allMovies } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);
    return count ? (
      <React.Fragment>
        <p>There are {count} of movies in db.</p>
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
                  <Like
                    liked={m.liked}
                    onLike={() => this.handleLike(m)}
                  ></Like>
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(m)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </React.Fragment>
    ) : (
      <h1>No Movies in table.</h1>
    );
  }
}

export default Movie;
