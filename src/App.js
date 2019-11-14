import React from "react";
import "./App.css";

import Navigation from "./components/navigation";
import { Switch, Route, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import Movie from "./components/movie";
import MovieDetails from "./components/moveiDetails";
import NotFound from "./components/notFound";

function App() {
  return (
    <main role="main" className="container">
      <Navigation />
      <Switch>
        <Route path="/movies/:id" component={MovieDetails}></Route>
        <Route path="/movies" component={Movie}></Route>
        <Route path="/customers" component={Customers}></Route>
        <Route path="/rentals" component={Rentals}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Redirect from="/" exact to="/movies"></Redirect>
        <Redirect from="/" to="/not-found"></Redirect>
      </Switch>
    </main>
  );
}

export default App;
