import React from "react";
import FormComponent from "../common/formComponent";
import Form from "react-bootstrap/Form";
class Search extends FormComponent {
  state = {};
  render() {
    const { placeholder, onChange, value } = this.props;
    return (
      <Form.Control
        type="text"
        placeholder={placeholder}
        onChange={e => onChange(e.currentTarget.value)}
        value={value}
      />
    );
  }
}

export default Search;
