import React, { Component } from "react";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import ListGroupSelect from "./common/listGroupSelect";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MoviesTable from "./moviesTable";

class Movie extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: []
  };
  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleItemSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handlePageChange = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = m => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(m);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleSort = path => {
    console.log(path);
  };
  render() {
    const { length: count } = this.state.movies;
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      genres,
      selectedGenre
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;
    let movies = paginate(filtered, currentPage, pageSize);
    return count ? (
      <Container>
        <Row>
          <Col xs={2}>
            <ListGroupSelect
              items={genres}
              onItemSelect={this.handleItemSelect}
              selectedItem={selectedGenre}
            />
          </Col>
          <Col>
            <p>There are {filtered.length} of movies in db.</p>
            <MoviesTable
              movies={movies}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={filtered.length}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </Col>
        </Row>
      </Container>
    ) : (
      <h1>No Movies in table.</h1>
    );
  }
}

export default Movie;
