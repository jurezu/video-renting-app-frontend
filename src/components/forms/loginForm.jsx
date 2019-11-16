import React, { Component } from "react";
import Input from "../common/input";
import { Form, Button } from "react-bootstrap";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
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

  validate = () => {
    let errors = {};
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;
    error.details.map(e => {
      errors[e.path[0]] = e.message;
    });
    return errors;
  };

  validateProperty = ({ name, value }) => {
    let errors = {};
    const options = { abortEarly: false };
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema, options);
    return error ? error.details[0].message : null;
  };

  handleSubmit = event => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    // else call the server
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { password, username } = this.state.account;
    const { errors } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          onChange={this.handleChange}
          name="username"
          value={username}
          type="text"
          label="Enter email"
          autoFocus={true}
          placeholder={"example@example.com"}
          error={errors.username}
        ></Input>

        <Input
          onChange={this.handleChange}
          name="password"
          value={password}
          type="password"
          label="Password"
          autoFocus={false}
          error={errors.password}
        ></Input>

        <Button variant="primary" disabled={this.validate()}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
