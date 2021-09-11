import React, { Component } from "react";
import "./index.css";
var pageNum;
export default class Paging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum,
    };
  }
  setUp = () => {
    if (this.props.pageNum > 1) {
      this.props.getValue(this.props.pageNum - 1);
    }
  };

  setNext = () => {
    if (this.props.pageNum < this.props.dataLength / this.props.pageSize) {
      this.props.getValue(this.props.pageNum + 1);
    }
  };

  changePage = (e) => {
    this.props.getValue(e);
  };

  render() {
    const { dataLength, pageSize } = this.props;
    if (Number.isInteger(dataLength / pageSize)) {
      pageNum = dataLength / pageSize;
    } else pageNum = parseInt(dataLength / pageSize) + 1;
    const array = [];
    for (let i = 0; i < pageNum; i++) {
      array.push(i + 1);
    }
    return (
      <div className="paging">
        <i className="leftArrow" onClick={this.setUp}></i>
        {array.map((item) => (
          <span onClick={this.changePage.bind(this, item)}>{item}</span>
        ))}
        <i className="rightArrow" onClick={this.setNext}></i>
      </div>
    );
  }
}
