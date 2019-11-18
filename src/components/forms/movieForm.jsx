import React from "react";
import FormComponent from "../common/formComponent";
import Joi from "joi-browser";
import Form from "react-bootstrap/Form";
import { getGenres } from "../../services/genreService";
import { saveMovie, getMovie } from "../../services/movieService";

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

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      const data = this.mapMovieToDataView(movie);
      this.setState({ data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

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
      .min(5)
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

  doSubmit = async () => {
    await saveMovie(this.state.data);
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
