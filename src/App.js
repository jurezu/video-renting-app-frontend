import React from "react";
import "./App.css";

import Navigation from "./components/navigation";
import { Switch, Route, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import Movie from "./components/movie";
import MovieDetails from "./components/moveiDetails";
import NotFound from "./components/notFound";
import LoginForm from "./components/forms/loginForm";

function App() {
  return (
    <React.Fragment>
      <Navigation />
      <main role="main" className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={MovieDetails} />
          <Route path="/movies" component={Movie} />
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

export default App;
