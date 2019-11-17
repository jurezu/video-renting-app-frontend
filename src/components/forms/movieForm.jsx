import React from "react";
import FormComponent from "../common/formComponent";
import Joi from "joi-browser";
import Form from "react-bootstrap/Form";
import { getGenres } from "../../services/fakeGenreService";
import { saveMovie, getMovie } from "../../services/fakeMovieService";

class MovieForm extends FormComponent {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {},
    genres: []
  };

  componentDidMount = () => {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");
    const data = this.mapMovieToDataView(movie);
    this.setState({ data });
  };

  mapMovieToDataView = movie => {
    return {
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      _id: movie._id
    };
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .integer()
      .required()
      .label("NumberInStock"),
    dailyRentalRate: Joi.number()
      .min(1)
      .max(10)
      .required()
      .label("Rate")
  };

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderInput("title", "Title", true)}
        {this.renderSelect("genreId", "Genre", this.state.genres)}
        {this.renderInput("numberInStock", "NumberInStock", false, "number")}
        {this.renderInput("dailyRentalRate", "Rate", false, "number")}
        {this.renderButton("Save")}
      </Form>
    );
  }
}

export default MovieForm;
