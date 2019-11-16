import React from "react";

import FormComponent from "../common/formComponent";
import { Form } from "react-bootstrap";
import Joi from "joi-browser";

class LoginForm extends FormComponent {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    // else call the server
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderInput("username", "Username", true)}
        {this.renderInput("password", "Password", false, "password")}
        {this.renderButton("Login")}
      </Form>
    );
  }
}

export default LoginForm;
