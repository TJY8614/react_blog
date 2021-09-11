import React, { Component } from "react";
import "./index.css";
export default class GoTop extends Component {
  scrollTop = () => {
    window.scrollTo(0, 0);
  };
  render() {
    return (
      <div className="goTop">
        <div className="onTop" onClick={this.scrollTop}>
          <span className="iconfont">&#xe634;</span>
        </div>
      </div>
    );
  }
}
