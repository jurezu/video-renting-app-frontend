import React, { Component } from "react";
import Navigation from "./components/navigation";
import { Switch, Route, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import Movie from "./components/movie";
import NotFound from "./components/notFound";
import LoginForm from "./components/forms/loginForm";
import RegisterForm from "./components/forms/registerForm";
import MovieForm from "./components/forms/movieForm";
import "./App.css";

//todo toastify

import Logout from "./components/logOut";
import auth from "./services/authService";
import ProtectedRoute from "./components/ProtectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <Navigation user={user} />
        <main role="main" className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={props => <Movie {...props} user={user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect from="/" to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
