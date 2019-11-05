import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";

class ListGroupSelect extends Component {
  state = { genres: [] };
  render() {
    const {
      onItemSelect,
      items,
      textProperty,
      valuePropery,
      selectedItem
    } = this.props;
    return (
      <ListGroup>
        {items.map(g => (
          <ListGroup.Item
            active={selectedItem === g ? true : false}
            key={g[textProperty]}
            action
            onClick={() => onItemSelect(g)}
          >
            {g[textProperty]}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
}
ListGroupSelect.defaultProps = {
  textProperty: "name",
  valuePropery: "_id"
};
export default ListGroupSelect;
