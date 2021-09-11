import React, { Component } from "react";
import "./index.css";
import avatarImg from "../../asset/Home/avatar.jpg";
import { Link } from "react-router-dom";
import ToiletRoll from "../Toilet-roll";

export default class RightBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  openSearch = () => {
    this.props.getOpenValue(true);
  };

  openMusic = () => {
    this.props.getOpenMusic(true);
  };
  render() {
    return (
      <div className="rightbar">
        <div className="nav">
          <div className="topIntro">
            <div className="navAvatar">
              <img src={avatarImg} alt="" />
            </div>
            <div className="navName">TJY</div>
            <div className="navText">Tjy的博客，记录生活，分享知识</div>
            <div className="option">
              <div>
                <span>4</span>
                <span>日志</span>
              </div>
              <div>
                <span>5</span>
                <span>分类</span>
              </div>
              <div>
                <span>6</span>
                <span>标签</span>
              </div>
            </div>
          </div>
          <div className="navigation">
            <ul>
              <li>
                <Link to="/archive">
                  <span class="iconfont">&#xe67e;归档</span>
                </Link>
              </li>
              <li>
                <Link to="/classify">
                  <span class="iconfont">&#xe7f9;分类</span>
                </Link>
              </li>
              <li>
                <Link to="/labels">
                  <span class="iconfont">&#xe601;标签</span>
                </Link>
              </li>
              <li>
                <Link to="/messageBoard">
                  <span class="iconfont">&#xe630;留言板</span>
                </Link>
              </li>
              <li onClick={this.openSearch}>
                <Link>
                  <span class="iconfont">&#xe66b;搜索</span>
                </Link>
              </li>
              <li onClick={this.openMusic}>
                <Link>
                  <span class="iconfont">&#xe6a0;音乐盒</span>
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <span class="iconfont">&#xe62e;关于</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="messageBox">
            <h3>留言</h3>
            <ToiletRoll />
          </div>
        </div>
      </div>
    );
  }
}
