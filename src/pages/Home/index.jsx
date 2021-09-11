import React, { Component } from "react";
import "./index.css";
import axios from "axios";
import Header from "../../components/Header";
import GoTop from "../../components/GoTop";
import Paging from "../../components/Paging";
import RightBar from "../../components/RightBar";
import SearchBox from "../../components/SearchBox";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import MusicBox from "../../components/MusicBox";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogData: [],
      onTop: false,
      dataLength: "",
      pageNum: 1,
      pageSize: 6,
      searchBox: false,
      showItem: false,
      currentItem: "",
      musicBox: false,
    };
    this.getData(0, 6);
  }
  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll);
  };

  getData = (start, end) => {
    axios.get("http://localhost:3001/api/blogList").then((response) =>
      this.setState({
        blogData: response.data.slice(start, end),
        dataLength: response.data.length,
      })
    );
  };

  handleScroll = () => {
    if (window.scrollY > 470) {
      this.setState({
        onTop: true,
      });
    } else {
      this.setState({
        onTop: false,
      });
    }
  };

  goDetail(e) {
    this.props.history.push(`/detail/${e}`);
  }

  getPageNum = (val) => {
    this.setState({
      pageNum: val,
    });
    if (val === 1) {
      this.getData(0, this.state.pageSize);
    } else {
      let start = (val - 1) * this.state.pageSize;
      this.getData(start, start + this.state.pageSize);
    }
  };

  openSearch = (e) => {
    this.setState({
      searchBox: e,
    });
  };

  showDesc = (e) => {
    this.setState({
      currentItem: e,
      showItem: true,
    });
  };

  hideDesc = (e) => {
    this.setState({
      currentItem: e,
      showItem: false,
    });
  };

  openMusic = (e) => {
    this.setState({
      musicBox: e,
    });
  };
  render() {
    const {
      blogData,
      onTop,
      dataLength,
      pageSize,
      pageNum,
      searchBox,
      showItem,
      currentItem,
      musicBox,
    } = this.state;
    return (
      <div className="Home">
        {/* <Prompt /> */}
        <Header></Header>
        <main>
          <div className="blog">
            <div className="topTitle">
              <span style={{ fontWeight: "bold" }}>博客</span>
              <span>共计 {dataLength} 篇</span>
            </div>
            <div className="content">
              <div class="container">
                {blogData.length > 0 ? (
                  blogData.map((item) => {
                    return (
                      <div
                        class="column"
                        onClick={this.goDetail.bind(this, item._id)}
                      >
                        <div
                          class="post-module"
                          onMouseOver={this.showDesc.bind(this, item._id)}
                          onMouseOut={this.hideDesc.bind(this, item._id)}
                        >
                          <div class="thumbnail">
                            <img src={item.imgUrl} />
                          </div>
                          <div class="post-content">
                            <div className="labels">
                              {item.labels.map((item) => (
                                <div class="category">{item}</div>
                              ))}
                            </div>

                            <h1 class="title">{item.title}</h1>
                            <p
                              class="description"
                              style={{
                                display:
                                  showItem && currentItem === item._id
                                    ? "block"
                                    : "none",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: item.content ? item.content : null,
                              }}
                            ></p>
                            <div class="post-meta">
                              <span class="timestamp">{item.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <Loading />
                )}
              </div>

              {blogData.length > 0 ? (
                // <Paging
                //   pageSize={pageSize}
                //   pageNum={pageNum}
                //   dataLength={dataLength}
                //   getValue={this.getPageNum}
                // />
                <Pagination
                  pageSize={pageSize}
                  pageNum={pageNum}
                  dataLength={dataLength}
                  getValue={this.getPageNum}
                />
              ) : null}
            </div>
          </div>
          <RightBar
            getOpenValue={this.openSearch}
            getOpenMusic={this.openMusic}
          />
          {searchBox ? <SearchBox getOpenValue={this.openSearch} /> : null}
          <div style={{ visibility: musicBox ? "visible" : "hidden" }}>
            <MusicBox getOpenValue={this.openMusic} />
          </div>
          {onTop ? <GoTop /> : null}
          {}
        </main>
      </div>
    );
  }
}
