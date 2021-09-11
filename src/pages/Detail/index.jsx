import React, { Component } from "react";
import axios from "axios";
import Header from "../../components/Header";
import "./index.css";
import GoTop from "../../components/GoTop";
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      onTop: false,
    };
    this.getData();
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

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

  getData = () => {
    let id = this.props.match.params.id;
    axios
      .get("http://localhost:3001/api/blogDetail/" + id)
      .then((response) =>
        this.setState({
          article: response.data,
        })
      )
      .then(() => {
        setTimeout(() => {
          window.scrollBy(0, 725);
        });
      });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { article, onTop } = this.state;
    return (
      <div className="detail">
        <Header></Header>
        <div className="container" id="artical">
          <div className="img">
            <img src={article.imgUrl} alt="" />
          </div>
          <div className="content">
            <span className="iconfont ico" onClick={this.goBack}>
              &#xe617;
            </span>
            <div className="title">{article.title} </div>
            <p className="publish_date">发布于：{article.date}</p>
            <div className="itemLabel">
              标签：
              {article.labels ? (
                article.labels.map((item) => {
                  return <span>{item}</span>;
                })
              ) : (
                <span>未分类</span>
              )}
            </div>
            <div
              className="artical-content"
              dangerouslySetInnerHTML={{
                __html: article.content ? article.content : "",
              }}
            ></div>
          </div>
        </div>
        {onTop ? <GoTop /> : null}
      </div>
    );
  }
}
