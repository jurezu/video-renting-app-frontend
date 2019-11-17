import React, { Component } from "react";
import Joi from "joi-browser";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Input from "../common/input";
import Alert from "react-bootstrap/Alert";
import Select from "./select";

class FormComponent extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    let errors = {};
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    errors = error.details.map(e => {
      return (errors[e.path[0]] = e.message);
    });
    return errors;
  };

  validateProperty = ({ name, value }) => {
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
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton = label => {
    return (
      <Button
        variant="primary"
        disabled={this.validate()}
        onClick={this.handleSubmit}
      >
        {label}
      </Button>
    );
  };

  renderInput = (name, label, autoFocus, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        onChange={this.handleChange}
        name={name}
        value={data[name]}
        type={type}
        label={label}
        autoFocus={autoFocus}
        error={errors[name]}
      ></Input>
    );
  };
  renderSelect = (name, label, options, autoFocus = false) => {
    const { data, errors } = this.state;
    return (
      <Select
        onChange={this.handleChange}
        name={name}
        value={data[name]}
        label={label}
        autoFocus={autoFocus}
        error={errors[name]}
        options={options}
      />
    );
  };
}

export default FormComponent;
