import React from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const Input = ({
  name,
  label,
  value,
  onChange,
  type,
  placeholder,
  autoFocus,
  error
}) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      {error && <Alert variant="danger">{error}</Alert>}
    </Form.Group>
  );
};

export default Input;
