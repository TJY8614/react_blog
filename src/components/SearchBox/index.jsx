import axios from "axios";
import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import "./index.css";
class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      searchList: [],
    };
  }
  componentDidMount() {}

  closeBox = () => {
    this.props.getOpenValue(false);
  };

  searchKey = (e) => {
    let key = e.target.value;
    if (key) {
      axios
        .post("http://localhost:3001/api/keyFind", { findval: key })
        .then((res) =>
          this.setState({
            key: key,
            searchList: res.data,
          })
        );
    } else {
      this.setState({
        searchList: [],
      });
    }
  };

  // 匹配颜色高亮
  keywordscolorful(str, key) {
    var reg = new RegExp("(" + key + ")", "g");
    var newstr = str.replace(reg, "<font style='color:#5cc4b1;'>$1</font>");
    return newstr;
  }

  goDetail(e) {
    this.props.history.push(`/detail/${e}`);
  }

  render() {
    const { searchList, key } = this.state;
    return (
      <div className="searchBox" style={{}}>
        <div className="top">
          <span className="iconfont">&#xe66b;</span>
          <input type="text" placeholder="搜索..." onChange={this.searchKey} />
          <span className="iconfont" onClick={this.closeBox}>
            &#xe8e7;
          </span>
        </div>
        <div className="content">
          {searchList && searchList.length > 0 ? (
            <div className="contentBox">
              <ul>
                {searchList.map((item) => {
                  return (
                    <li onClick={this.goDetail.bind(this, item._id)}>
                      <div
                        className="title"
                        dangerouslySetInnerHTML={{
                          __html: item.content
                            ? this.keywordscolorful(item.title, key)
                            : "",
                        }}
                      ></div>
                      <div
                        className="text"
                        dangerouslySetInnerHTML={{
                          __html: item.content
                            ? this.keywordscolorful(
                                item.content.slice(
                                  item.content.indexOf(key) - 10,
                                  item.content.indexOf(key) + 50
                                ),
                                key
                              )
                            : "",
                        }}
                      ></div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <span className="iconfont ico">&#xe66b;</span>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(SearchBox);
