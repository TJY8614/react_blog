import React, { Component } from "react";
import Header from "../../components/Header";
import "./index.css";
import axios from "axios";
import BraftEditor from "braft-editor";
import bg from "../../asset/MessageBoard/bg.png";
import avatar from "../../asset/Home/avatar.jpg";
export default class Classify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: BraftEditor.createEditorState(null),
      replyEditorState: BraftEditor.createEditorState(null),
      onReply: false,
      messageList: [],
      clickKey: "",
      replyList: [],
    };
    this.getData();
  }

  getData = () => {
    axios.post("http://localhost:3001/api/messageList").then((res) => {
      this.setState({
        messageList: res.data,
      });
    });
    axios
      .post("http://localhost:3001/api/replyList")
      .then((res) => {
        this.setState({
          replyList: res.data,
        });
      })
      .then(() => {
        setTimeout(() => {
          window.scrollBy(0, 725);
        });
      });
  };
  goBack = () => {
    this.props.history.goBack();
  };
  handleEditorChange = (editorState) => {
    this.setState({ editorState });
  };
  replyChange = (replyEditorState) => {
    this.setState({ replyEditorState });
  };
  onReply = (e) => {
    this.setState({
      onReply: !this.state.onReply,
      clickKey: e,
    });
  };

  // 获取发表时间
  getDate = () => {
    let mydate, y, m, d, hh, mm, ss;
    mydate = new Date();
    y = mydate.getFullYear();
    m = mydate.getMonth() + 1;
    d = mydate.getDate();
    hh = mydate.getHours();
    mm = mydate.getMinutes();
    ss = mydate.getSeconds();
    if (m < 10) m = "0" + m;
    if (d < 10) d = "0" + d;
    if (hh < 10) hh = "0" + hh;
    if (mm < 10) mm = "0" + mm;
    if (ss < 10) ss = "0" + ss;
    let date = y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
    return date;
  };

  submitMessage = () => {
    const htmlContent = this.state.editorState.toHTML();
    let date = this.getDate();
    let obj = {
      name: "匿名",
      content: htmlContent,
      date: date,
    };
    axios
      .post("http://localhost:3001/api/message", {
        message: obj,
      })
      .then((response) => {
        alert("提交留言成功");
        this.getData();
      });
  };

  submitReply = (e) => {
    const htmlContent = this.state.replyEditorState.toHTML();
    let date = this.getDate();
    let obj = {
      id: e,
      replyName: "博主",
      reply: htmlContent,
      replyTime: date,
    };
    axios
      .post("http://localhost:3001/api/messageReply", {
        reply: obj,
      })
      .then((response) => {
        alert("提交回复成功");
        this.getData();
      });
  };

  render() {
    const { onReply, messageList, clickKey, replyList } = this.state;
    const controls = ["emoji", "text-align"];
    return (
      <div className="messageBoard">
        <Header />
        <main>
          <div className="bg">
            <img src={bg} alt="" />
          </div>
          <span className="iconfont gobackIco" onClick={this.goBack}>
            &#xe617;
          </span>
          <div className="title">留 言 板</div>
          <div className="content">
            <div className="intro">
              欢迎在这里留言！任何问题都可以在这里留言
            </div>
            <BraftEditor
              controls={controls}
              contentStyle={{
                height: 210,
                boxShadow: "inset 0 1px 3px 1px rgba(0,0,0,.1)",
              }}
              onChange={this.handleEditorChange}
            />
            <div className="submitButton" onClick={this.submitMessage}>
              提交留言
            </div>

            <div className="message">
              {messageList
                ? messageList.map((item) => {
                    console.log(item._id);
                    return (
                      <div className="item">
                        <div className="avatar">
                          <span className="iconfont">&#xe62d;</span>
                        </div>
                        <div className="name">{item.name}</div>
                        <div className="time">{item.date}</div>
                        <div
                          className="text"
                          dangerouslySetInnerHTML={{
                            __html: item.content ? item.content : "",
                          }}
                        ></div>
                        <div className="reply">
                          <span
                            onClick={this.onReply.bind(this, item._id)}
                            className="replyText"
                          >
                            {onReply && clickKey === item._id ? "收起" : "回复"}
                          </span>
                          {replyList
                            ? replyList.map((reply) => {
                                console.log(reply.id);

                                if (reply.id === item._id) {
                                  return (
                                    <div className="replyListBox">
                                      <div className="replyAvatar">
                                        <img src={avatar} alt="" />
                                      </div>
                                      <div className="replyName">
                                        {reply.replyName}
                                      </div>
                                      <div className="replyTime">
                                        {reply.replyTime}
                                      </div>
                                      <div
                                        className="replyContent"
                                        dangerouslySetInnerHTML={{
                                          __html: reply.reply
                                            ? reply.reply
                                            : "",
                                        }}
                                      ></div>
                                      <span
                                        onClick={this.onReply.bind(
                                          this,
                                          reply._id
                                        )}
                                      >
                                        {onReply && clickKey === reply._id
                                          ? "收起"
                                          : "回复"}
                                      </span>
                                    </div>
                                  );
                                }
                              })
                            : null}

                          {onReply && clickKey === item._id ? (
                            <div className="replyBox">
                              <BraftEditor
                                style={{ width: "80%", float: "right" }}
                                controls={controls}
                                contentStyle={{
                                  height: 100,
                                  boxShadow:
                                    "inset 0 1px 3px 1px rgba(0,0,0,.1)",
                                }}
                                onChange={this.replyChange}
                              />
                              <div className="btn">
                                <button
                                  onClick={this.submitReply.bind(
                                    this,
                                    item._id
                                  )}
                                >
                                  提交
                                </button>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </main>
      </div>
    );
  }
}
