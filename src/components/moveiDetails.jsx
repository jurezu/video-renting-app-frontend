import React, { Component } from "react";
import { Button } from "react-bootstrap";
class MovieDetails extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Movie {this.props.match.params.id}</h1>
        <Button onClick={() => this.props.history.push("/movies")}>Save</Button>
      </div>
    );
  }
}

export default MovieDetails;
