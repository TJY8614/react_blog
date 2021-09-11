import React, { Component } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu/index";
import axios from "axios";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      repassword: "",
      confirm: false,
    };
  }
  render() {
    const { confirm, password } = this.state;
    return (
      <div className="register">
        <Menu></Menu>
        <div className="registerBox">
          <div className="title">注册</div>
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
          <div className="inputBox">
            <input
              type="password"
              placeholder="确认密码"
              onChange={(e) => {
                this.setState({
                  repassword: e.target.value,
                });
                if (password && e.target.value && password !== e.target.value) {
                  this.setState({
                    confirm: true,
                  });
                } else {
                  this.setState({
                    confirm: false,
                  });
                }
              }}
            />
          </div>
          <div
            style={{ display: confirm ? "block" : "none" }}
            className="confirmText"
          >
            两次输入的密码不一致
          </div>
          <div className="buttonBox">
            <input type="button" value="注册" onClick={this.register} />
          </div>
          <div className="text">
            已有账号?
            <Link to="/login">
              <span>登录</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  register = () => {
    const { name, password, repassword } = this.state;
    if (name && password && repassword) {
      const that = this;
      axios
        .get("http://localhost:3001/api/admin/getUser/" + name)
        .then((response) => {
          if (response.data.name === name) {
            // message.info("该用户名已存在");
          } else {
            let obj = {
              name: this.state.name,
              password: this.state.password,
            };
            axios
              .post("http://localhost:3001/api/admin/signup", {
                userInfo: obj,
              })
              .then((response) => {
                if (response.status === 200) {
                  // message.success("注册成功");
                  that.props.history.push("/login");
                }
              });
          }
        });
    }
  };
}
