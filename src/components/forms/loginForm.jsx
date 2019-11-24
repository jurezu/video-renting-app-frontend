import React from "react";

import FormComponent from "../common/formComponent";
import { Form } from "react-bootstrap";
import Joi from "joi-browser";
import auth from "../../services/authService";
import { Redirect } from "react-router-dom";

class LoginForm extends FormComponent {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password")
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;
    try {
      await auth.login(email, password);
      console.log("Login successfull");
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/"; //to get full reload, so user is rendered
    } catch (ex) {
      if (ex.response && ex.response.status) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
        console.log("Wrong email and password combination.");
      }
    }
  };

  render() {
    if (auth.getCurrentUser) return <Redirect to="/" />;
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderInput("email", "Email", true)}
        {this.renderInput("password", "Password", false, "password")}
        {this.renderButton("Login")}
      </Form>
    );
  }
}

export default LoginForm;
