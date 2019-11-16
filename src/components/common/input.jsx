import React from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        //value={value}
        //onChange={onChange}
        //autoFocus={autoFocus}
        //type={type}
        //placeholder={placeholder}
        {...rest} // added via rest operator
        name={name}
      />
      {error && <Alert variant="danger">{error}</Alert>}
    </Form.Group>
  );
};

export default Input;
