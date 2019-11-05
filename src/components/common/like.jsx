import React, { Component } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
class Like extends Component {
  render() {
    const { liked, onLike } = this.props;
    return liked ? (
      <FaHeart style={{ cursor: "pointer" }} onClick={onLike}></FaHeart>
    ) : (
      <FaRegHeart style={{ cursor: "pointer" }} onClick={onLike}></FaRegHeart>
    );
  }
}

export default Like;
