import React from "react";
import FormComponent from "../common/formComponent";
import Joi from "joi-browser";
import Form from "react-bootstrap/Form";

class RegisterForm extends FormComponent {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = () => {
    console.log("Registered");
  };
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderInput("username", "Username", true)}
        {this.renderInput("password", "Password", false, "password")}
        {this.renderInput("name", "Name", false)}
        {this.renderButton("Register")}
      </Form>
    );
  }
}

export default RegisterForm;
