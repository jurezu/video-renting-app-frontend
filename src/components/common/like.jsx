import React, { Component } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
class Like extends Component {
  render() {
    const { liked } = this.props;
    return liked ? (
      <FaHeart
        style={{ cursor: "pointer" }}
        onClick={this.props.onLike}
      ></FaHeart>
    ) : (
      <FaRegHeart
        style={{ cursor: "pointer" }}
        onClick={this.props.onLike}
      ></FaRegHeart>
    );
  }
}

export default Like;
