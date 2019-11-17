import React from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const Select = ({ name, label, error, options, ...rest }) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        //value={value}
        //onChange={onChange}
        //autoFocus={autoFocus}
        //type={type}
        //placeholder={placeholder}
        {...rest} // added via rest operator
        name={name}
      >
        <option></option>
        {options.map(o => (
          <option key={o._id} value={o._id}>
            {o.name}
          </option>
        ))}
      </Form.Control>
      {error && <Alert variant="danger">{error}</Alert>}
    </Form.Group>
  );
};

export default Select;
