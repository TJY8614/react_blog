import React, { Component } from "react";
import "./index.css";
var pageNum;
export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
  }
  setUp = () => {
    if (this.props.pageNum > 1) {
      this.props.getValue(this.props.pageNum - 1);
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  };

  setNext = () => {
    if (this.props.pageNum < this.props.dataLength / this.props.pageSize) {
      this.props.getValue(this.props.pageNum + 1);
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };

  changePage = (e) => {
    this.props.getValue(e);
    this.setState({
      currentPage: e,
    });
  };

  render() {
    const { dataLength, pageSize } = this.props;
    const { currentPage } = this.state;
    if (Number.isInteger(dataLength / pageSize)) {
      pageNum = dataLength / pageSize;
    } else pageNum = parseInt(dataLength / pageSize) + 1;
    const array = [];
    for (let i = 0; i < pageNum; i++) {
      array.push(i + 1);
    }
    return (
      <div className="pagination">
        <ul>
          <li className="page-prev">
            <span className="prev" onClick={this.setUp}>
              <svg
                t="1580195949197"
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4493"
                width="20"
                height="20"
              >
                <path
                  d="M906.78272 588.78976c-0.02048 8.4992-6.88128 15.36-15.38048 15.37024l-443.6992-0.01024 75.70432 191.68256c2.51904 6.42048 0.48128 13.76256-5.03808 17.90976-5.51936 4.16768-13.13792 4.1472-18.61632-0.09216l-376.5248-289.47456c-3.77856-2.89792-6.00064-7.41376-6.00064-12.16512 0-4.78208 2.22208-9.27744 6.00064-12.1856l376.5248-289.47456c2.7648-2.11968 6.06208-3.19488 9.37984-3.19488 3.23584 0 6.5024 1.03424 9.23648 3.10272 5.51936 4.1472 7.5776 11.48928 5.03808 17.90976L447.68256 419.84l443.71968-0.01024c8.4992 0.01024 15.36 6.88128 15.36 15.36L906.78272 588.78976z"
                  p-id="4494"
                  fill="#777777"
                ></path>
              </svg>
            </span>
          </li>
          {array.map((item) => {
            return (
              <li
                className={
                  currentPage === item ? " page-number active" : "page-number"
                }
                onClick={this.changePage.bind(this, item)}
              >
                <span>{item}</span>
              </li>
            );
          })}

          <li className="page-next">
            <span className="next" onClick={this.setNext}>
              <svg
                t="1580195920917"
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4995"
                width="20"
                height="20"
              >
                <path
                  d="M906.77248 512c0 4.77184-2.21184 9.2672-5.9904 12.17536l-376.5248 289.4848c-2.7648 2.11968-6.06208 3.18464-9.3696 3.18464-3.25632 0-6.5024-1.03424-9.24672-3.09248-5.50912-4.15744-7.5776-11.48928-5.03808-17.90976l75.71456-191.67232L132.58752 604.17024c-8.48896 0-15.36-6.88128-15.36-15.36l0-153.6c0-8.48896 6.87104-15.36 15.36-15.36l443.72992 0-75.71456-191.68256c-2.53952-6.42048-0.47104-13.75232 5.04832-17.90976 5.50912-4.15744 13.12768-4.13696 18.60608 0.09216l376.5248 289.4848C904.56064 502.7328 906.77248 507.22816 906.77248 512z"
                  p-id="4996"
                  fill="#777777"
                ></path>
              </svg>
            </span>
          </li>
        </ul>
      </div>
    );
  }
}
