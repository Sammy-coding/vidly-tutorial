import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import auth from "./services/authService";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import Customer from "./components/customer";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

class App extends Component {
 state = {

 };

 componentDidMount() {
    const user =auth.getCurrentUser();
    this.setState({user});
 }
 
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/movie/:id" component={MovieForm} />
            <Route path="/registerForm" component={RegisterForm} />
            <Route path="/loginForm" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/movies" component={Movies} />
            <Route path="/customer" component={Customer} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
