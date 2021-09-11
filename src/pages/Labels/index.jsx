import React, { Component } from "react";
import Header from "../../components/Header";
import "./index.css";
import axios from "axios";
import bg from "../../asset/Labels/bg.png";
export default class Classify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
    };
    this.getLabel();
  }

  goBack = () => {
    this.props.history.goBack();
  };

  getLabel = () => {
    axios
      .get("http://localhost:3001/api/blogLabels")
      .then((res) => {
        this.setState({
          labels: res.data.split(","),
        });
      })
      .then(() => {
        setTimeout(() => {
          window.scrollBy(0, 725);
        });
      });
  };
  //数组去重
  unique(arr) {
    return Array.from(new Set(arr));
  }

  render() {
    const { labels } = this.state;
    let lablesList = this.unique(labels);
    return (
      <div className="labels">
        <Header />
        <main>
          <div className="bg">
            <img src={bg} alt="" />
          </div>
          <span className="iconfont gobackIco" onClick={this.goBack}>
            &#xe617;
          </span>
          <div className="title">标 签</div>
          <div className="content">
            <ul>
              {lablesList.map((item) => {
                let num = 0;
                labels.map((e) => {
                  if (e === item) {
                    num++;
                  }
                });
                return <li style={{ fontSize: 20 + num + "px" }}>{item}</li>;
              })}
            </ul>
          </div>
        </main>
      </div>
    );
  }
}
