import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/navigation";
import { Switch, Route, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import Movie from "./components/movie";

function App() {
  return (
    <BrowserRouter>
      <main role="main" className="container">
        <Navigation />
        <Switch>
          <Route path="/movies" component={Movie}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Redirect from="/" to="/movies"></Redirect>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
