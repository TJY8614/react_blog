import React, { Component } from "react";

class ToastBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notice: {},
    };
    // this.transitionTime = 300;
    // this.state = { notices: [1] };
    // this.removeNotice = this.removeNotice.bind(this);
  }

  componentDidMount() {
    var x = document.getElementById("toast");
    if (x) {
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 5000);
    }
  }

  addNotice(notice) {
    this.setState({
      notice: notice,
    });
  }

  render() {
    const { notice } = this.state;
    return (
      <div id="toast">
        <div id="img">
          {notice.type === "success" ? (
            <span
              className="iconfont"
              style={{ color: "#52c41a", fontSize: "25px" }}
            >
              &#xe615;
            </span>
          ) : notice.type === "info" ? (
            <span
              className="iconfont"
              style={{ color: "#f9d65d", fontSize: "30px" }}
            >
              &#xe652;
            </span>
          ) : (
            <span
              className="iconfont"
              style={{ color: "#e84335", fontSize: "25px" }}
            >
              &#xe64e;
            </span>
          )}
        </div>
        <div id="desc">{notice.content}</div>
      </div>
    );
  }
}

export default ToastBox;
