import React, { Component } from "react";
import "./index.css";
import Menu from "../../components/Menu/index";
import { Link } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
    };
  }
  render() {
    return (
      <div className="login">
        <Menu></Menu>
        <div className="loginBox">
          <div className="title">登录</div>
          <div className="inputBox">
            <input
              type="text"
              placeholder="用户名"
              onChange={(e) => {
                this.setState({
                  name: e.target.value,
                });
              }}
            />
          </div>
          <div className="inputBox">
            <input
              type="password"
              placeholder="密码"
              onChange={(e) => {
                this.setState({
                  password: e.target.value,
                });
              }}
            />
          </div>
          <div className="buttonBox">
            <input type="button" value="登录" onClick={this.login} />
          </div>
          <div className="text">
            没有账号?
            <Link to="/register">
              <span>注册</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  login = async () => {
    const { name, password } = this.state;
    let obj = {
      name: this.state.name,
      password: this.state.password,
    };
    if (name && password) {
      axios
        .post("http://localhost:3001/api/admin/signin", {
          userInfo: obj,
        })
        .then((res) => {
          console.log(res);
          if (res.data === "success") {
            //失效时间
            let inFifteenMinutes = new Date(
              new Date().getTime() + 24 * 3600 * 1000
            ); //一天
            cookie.save("userinfo", name, {
              expires: inFifteenMinutes,
            });
            // message.success("登录成功");
            this.props.history.push("/home");
          } else {
            // message.error("用户名或密码错误！");
          }
        });
    } else {
      // message.error("用户名或密码不能为空");
    }
  };
}
