import React from "react";
import FormComponent from "../common/formComponent";
import Joi from "joi-browser";
import Form from "react-bootstrap/Form";
import { registerUser } from "../../services/userService";
import auth from "../../services/authService";

class RegisterForm extends FormComponent {
  state = {
    data: {
      email: "",
      password: "",
      name: ""
    },
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
      .label("Password"),
    name: Joi.string()
      .min(5)
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    try {
      const { headers } = await registerUser(this.state.data);
      auth.loginWithJwt(headers["x-auth-token"]);
      console.log("Registered");
      window.location = "/"; //to get full reload, so user is rendered
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
        console.log("Already registered");
      }
    }
  };
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderInput("email", "Email", true)}
        {this.renderInput("password", "Password", false, "password")}
        {this.renderInput("name", "Name", false)}
        {this.renderButton("Register")}
      </Form>
    );
  }
}

export default RegisterForm;
