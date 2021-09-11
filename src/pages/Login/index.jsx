import React, { Component } from "react";
import "./index.css";
import Menu from "../../components/Menu/index";
import axios from "axios";
import cookie from "react-cookies";
import Toast from "../../components/Toast";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      regiPassword: "",
      repassword: "",
    };
  }

  changeLogin = () => {
    const container = document.querySelector(".container");
    container.classList.remove("right-panel-active");
  };

  changeRegis = () => {
    const container = document.querySelector(".container");
    container.classList.add("right-panel-active");
  };

  register = () => {
    const { name, regiPassword, repassword } = this.state;
    if (name && regiPassword && repassword) {
      const that = this;
      axios
        .get("http://localhost:3001/api/admin/getUser/" + name)
        .then((response) => {
          if (response.data.name === name) {
            Toast.info("该用户名已存在");
          } else {
            let obj = {
              name: this.state.name,
              password: this.state.regiPassword,
            };
            axios
              .post("http://localhost:3001/api/admin/signup", {
                userInfo: obj,
              })
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  Toast.success("注册成功,请登录");
                }
              });
          }
        });
    } else {
      Toast.error("请输入完整信息");
    }
  };

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
            Toast.success("登录成功");
            this.props.history.push("/home");
          } else {
            Toast.error("用户名或密码错误！");
          }
        });
    } else {
      Toast.error("用户名或密码不能为空");
    }
  };
  render() {
    return (
      <div>
        <Menu></Menu>
        <div className="login">
          <div className="container right-panel-active">
            <div className="container__form container--signup">
              <form action="#" className="form" id="form1">
                <h2 className="form__title">注册</h2>
                <input
                  type="text"
                  placeholder="用户名"
                  className="input"
                  onChange={(e) => {
                    this.setState({
                      name: e.target.value,
                    });
                  }}
                />
                <input
                  type="password"
                  placeholder="密码"
                  className="input"
                  onChange={(e) => {
                    this.setState({
                      regiPassword: e.target.value,
                    });
                  }}
                />
                <input
                  type="password"
                  placeholder="确认密码"
                  className="input"
                  onChange={(e) => {
                    this.setState({
                      repassword: e.target.value,
                    });
                  }}
                />
                <button className="btn" onClick={this.register}>
                  注册
                </button>
              </form>
            </div>

            <div className="container__form container--signin">
              <form action="#" className="form" id="form2">
                <h2 className="form__title">登录</h2>
                <input
                  type="text"
                  placeholder="用户名"
                  className="input"
                  onChange={(e) => {
                    this.setState({
                      name: e.target.value,
                    });
                  }}
                />
                <input
                  type="password"
                  placeholder="密码"
                  className="input"
                  onChange={(e) => {
                    this.setState({
                      password: e.target.value,
                    });
                  }}
                />
                <button className="btn" onClick={this.login}>
                  登录
                </button>
              </form>
            </div>

            <div className="container__overlay">
              <div className="overlay">
                <div className="overlay__panel overlay--left">
                  <button
                    className="btn"
                    id="signIn"
                    onClick={this.changeLogin}
                  >
                    登录
                  </button>
                </div>
                <div className="overlay__panel overlay--right">
                  <button
                    className="btn"
                    id="signUp"
                    onClick={this.changeRegis}
                  >
                    注册
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
