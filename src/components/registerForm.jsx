import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import {register} from '../services/userService';
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", person: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(3).max(30).label("Password"),
    person: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try{
      const response = await register(this.state.data);
      auth.LoginWith(response.headers['x-auth-token']);
      window.location = '/';
    } catch(ex) {
      if(ex.response && ex.response.status === 400) {
        const errors = {...this.state.errors};
        errors.username = ex.response.data;
        this.setState({errors}); 
      }
    }
  };

  render() {
    return (
      <div>
        <h1>REGISTER</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("person", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
