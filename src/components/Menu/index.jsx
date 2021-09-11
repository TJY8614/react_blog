import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import cookie from "react-cookies";
import "../../asset/iconfont/iconfont.css";
import Toast from "../Toast";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuModal: "",
      login: false,
    };
  }
  componentDidMount() {
    let name = cookie.load("userinfo");
    if (name === "tjy") {
      this.setState({
        login: true,
      });
    }
  }
  render() {
    const { menuModal, login } = this.state;
    return (
      <div>
        <div className="menu" onClick={this.openMenu}>
          <span class="iconfont">&#xe670;</span>
        </div>
        <div className={menuModal}>
          <div
            className="menuMain"
            style={{ display: menuModal ? "block" : "none" }}
          >
            <ul>
              <li>
                <Link to="/home">
                  <span class="iconfont">&#xe633;首页</span>
                </Link>
              </li>
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
              {login ? (
                <li>
                  <Link to="/admin">
                    <span class="iconfont">&#xe636;后台管理</span>
                  </Link>
                </li>
              ) : null}
              <li>
                {login ? (
                  <span class="iconfont" onClick={this.logout}>
                    &#xe62e;退出登录
                  </span>
                ) : (
                  <Link to="/login">
                    <span class="iconfont">&#xe62e;登录</span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  openMenu = () => {
    if (!this.state.menuModal || this.state.menuModal === "menuModal") {
      this.setState({
        menuModal: "menuModalActive",
      });
    } else {
      this.setState({
        menuModal: "menuModal",
      });
    }
  };
  logout = () => {
    cookie.remove("userinfo");
    this.setState({
      login: false,
    });
    Toast.success("退出成功");
  };
}
