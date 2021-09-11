import React, { Component } from "react";
import Menu from "../Menu/index";
import avatarImg from "../../asset/Home/avatar.jpg";
import "../../asset/iconfont/iconfont.css";
import "./index.css";
export default class Header extends Component {
  componentDidMount() {
    this.showText();
  }

  enterBlog = () => {
    window.scrollBy(0, 725);
  };

  showText = () => {
    let landInTexts = document.querySelectorAll(".text");
    landInTexts.forEach((landInText) => {
      let letters = landInText.textContent.split("");
      landInText.textContent = "";
      letters.forEach((letter, i) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.style.animationDelay = `${i * 0.05}s`;
        landInText.append(span);
      });
    });
  };

  render() {
    return (
      <div className="header">
        <Menu></Menu>
        <div className="avatar">
          <img src={avatarImg} alt="" />
        </div>
        <div className="name">TJY</div>
        <div className="text">
          你今天的努力，是幸运的伏笔，把握当下，是明日的花开，风很大，所以要更加努力。
        </div>
        <div class="ico">
          <ul>
            <li>
              <span class="iconfont">&#xe629;</span>
            </li>
            <li>
              <span class="iconfont">&#xe66c;</span>
            </li>
            <li>
              <span class="iconfont">
                <a href="https://github.com/TJY8614" target="_blank">
                  &#xe7ab;
                </a>
              </span>
            </li>
            <li>
              <span class="iconfont">&#xe612;</span>
            </li>
          </ul>
        </div>
        <div className="headerButton">
          <div class="btn" onClick={this.enterBlog}>
            <span>进入博客</span>
            <div class="dot"></div>
          </div>
        </div>
      </div>
    );
  }
}
