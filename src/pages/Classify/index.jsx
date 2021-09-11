import React, { Component } from "react";
import Header from "../../components/Header";
import "./index.css";
import axios from "axios";
import bg from "../../asset/Classify/bg.png";
export default class Classify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      labels: [],
      clickKey: "",
    };
    this.getLabel();
  }

  goBack = () => {
    this.props.history.goBack();
  };

  //数组去重
  unique(arr) {
    return Array.from(new Set(arr));
  }

  openDiv = (e) => {
    this.setState({
      open: !this.state.open,
      clickKey: e,
    });
    axios.get("http://localhost:3001/api/blogList").then((res) => {
      let array = [];
      res.data.map((item) => {
        if (item.labels.indexOf(e) > -1) {
          array.push({
            title: item.title,
            id: item._id,
          });
        }
      });
      this.setState({
        currentList: array,
      });
    });
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

  goDetail(e) {
    this.props.history.push(`/detail/${e}`);
  }
  render() {
    const { open, labels, clickKey, currentList } = this.state;
    let lablesList = this.unique(labels);
    return (
      <div className="classify">
        <Header />
        <main>
          <div className="bg">
            <img src={bg} alt="" />
          </div>
          <span className="iconfont gobackIco" onClick={this.goBack}>
            &#xe617;
          </span>
          <div className="title">分 类</div>
          <div className="content">
            <ul>
              {lablesList.map((item) => {
                let num = 0;
                labels.map((e) => {
                  if (e === item) {
                    num++;
                  }
                });
                return (
                  <div>
                    <li onClick={this.openDiv.bind(this, item)}>
                      <span>
                        {item} &nbsp;
                        {open && item === clickKey ? (
                          <span className="iconfont">&#xe7fa;</span>
                        ) : (
                          <span className="iconfont">&#xe61f;</span>
                        )}
                      </span>
                      <span className="iconfont">&#xe673;{num}</span>
                    </li>
                    <div
                      className="list"
                      style={{
                        height:
                          open && item === clickKey
                            ? currentList
                              ? currentList.length * 50 + "px"
                              : 0
                            : 0,
                      }}
                    >
                      <ul>
                        {currentList
                          ? currentList.map((item) => (
                              <li onClick={this.goDetail.bind(this, item.id)}>
                                {item.title}
                              </li>
                            ))
                          : null}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
        </main>
      </div>
    );
  }
}
