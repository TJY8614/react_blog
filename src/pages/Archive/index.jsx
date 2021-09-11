import React, { Component } from "react";
import Header from "../../components/Header";
import "./index.css";
import axios from "axios";
import bg from "../../asset/Archive/archive.png";
import icon from "../../asset/Archive/icon.png";
import Paging from "../../components/Paging";
export default class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      timeList: [],
      pageSize: 2,
      pageNum: 1,
      currentData: [],
      currentPageData: [],
      currentTime: [],
    };
    // this.getCurrentData(0, 2);
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/blogList")
      .then((response) => {
        this.setState({
          data: response.data,
        });
        let array = [];
        response.data.map((item) => {
          array.push(item.date.split(" ")[0].slice(0, 7));
        });
        console.log(array);
        let timeArray = this.unique(array);
        this.setState({
          timeList: timeArray,
          currentTime: timeArray[0].slice(0, 7),
        });
        this.getCurrentData(timeArray[0]);
      })
      .then(() => {
        setTimeout(() => {
          window.scrollBy(0, 725);
        });
      });
  }

  getCurrentData = (time) => {
    let array = [];
    axios.get("http://localhost:3001/api/blogList").then((response) => {
      response.data.map((item) => {
        if (item.date.search(time) !== -1) {
          array.push(item);
        }
      });
      this.setState({
        currentTime: time.slice(0, 7),
        currentData: array,
        currentPageData: array.slice(0, 2),
      });
    });
  };

  getCurrentPage = (page) => {
    let array = this.state.currentData;
    let start = (page - 1) * this.state.pageSize;
    this.setState({
      currentPageData: array.slice(start, start + this.state.pageSize),
    });
  };

  //日期匹配文章数
  datePage = (e) => {
    let i = 0;
    this.state.data.map((item) => {
      if (item.date.search(e) !== -1) {
        i++;
      }
    });
    return i;
  };

  //数组去重
  unique(arr) {
    return Array.from(new Set(arr));
  }

  getPageNum = (val) => {
    this.setState({
      pageNum: val,
    });
    this.getCurrentPage(val);
  };

  goBack = () => {
    this.props.history.goBack();
  };

  goDetail(e) {
    this.props.history.push(`/detail/${e}`);
  }

  render() {
    const {
      timeList,
      pageSize,
      pageNum,
      currentData,
      currentPageData,
      currentTime,
    } = this.state;
    console.log(timeList);
    return (
      <div className="archive">
        <Header />
        <main>
          <div className="bg">
            <img src={bg} alt="" />
          </div>
          <span className="iconfont gobackIco" onClick={this.goBack}>
            &#xe617;
          </span>
          <div className="title">归 档</div>
          <div className="time">
            <ul>
              {timeList
                ? timeList.map((item) => {
                    let num = this.datePage(item.slice(0, 7));
                    return (
                      <li onClick={this.getCurrentData.bind(this, item)}>
                        {item.slice(0, 7)}
                        <span>({num})</span>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
          <div className="content">
            <div className="list">
              <div className="ico">
                <img src={icon} alt="" />
                <p>#目前共计7篇，继续努力</p>
              </div>
              <div className="currentTime">
                <div className="timePic">
                  <div className="point"></div>
                  <div className="line"></div>
                </div>
                <p>{currentTime}</p>
              </div>
              {currentPageData.map((item) => (
                <div
                  className="item"
                  onClick={this.goDetail.bind(this, item._id)}
                >
                  <div className="pic">
                    <div className="point"></div>
                    <div className="line"></div>
                  </div>
                  <div className="blogBox">
                    <div className="blogTitle">{item.title}</div>
                    <div className="footer">
                      <div className="blogTime">{item.date}</div>
                      <div className="labels">
                        {item.labels.map((item) => {
                          return <span>{item}</span>;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Paging
              pageSize={pageSize}
              pageNum={pageNum}
              dataLength={currentData.length}
              getValue={this.getPageNum}
            />
          </div>
        </main>
      </div>
    );
  }
}
