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
import _ from "lodash";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class Movie extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: "title", order: "asc" }
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

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      movies: allMovies,
      selectedGenre,
      sortColumn,
      currentPage,
      pageSize
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    let movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;

    const { totalCount, data } = this.getPageData();
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
            <Button variant="primary" to="movies/new" as={Link}>
              New Movie
            </Button>
            <p>There are {totalCount} of movies in db.</p>
            <MoviesTable
              movies={data}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              itemsCount={totalCount}
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
