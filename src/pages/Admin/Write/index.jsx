/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./index.css";
import axios from "axios";
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
export default class write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      tagInput: false,
      tags: [],
      tag: "",
      imgUrl: "",
      editorState: BraftEditor.createEditorState(null),
      article: {},
      id: "",
    };
  }

  componentDidMount = () => {
    let id = this.props.match.params.id;
    this.setState({
      id: id,
    });
    if (id) {
      axios
        .get("http://localhost:3001/api/blogDetail/" + id)
        .then((response) => {
          let data = response.data;
          this.setState({
            title: data.title,
            tags: data.labels,
            imgUrl: data.imgUrl,
            editorState: BraftEditor.createEditorState(data.content),
          });
        });
    }
  };

  newTags = () => {
    this.setState({
      tagInput: true,
    });
  };
  createNewTag = (e) => {
    if (e.which === 13) {
      let array = this.state.tags;
      array.push(this.state.tag);
      this.setState({
        tags: array,
      });
      this.setState({
        tagInput: false,
      });
    }
  };
  tagOnBlur = () => {
    this.setState({
      tagInput: false,
    });
  };
  removeItem = (e) => {
    let array = this.state.tags;
    array.splice(e, 1);
    this.setState({
      tags: array,
    });
  };
  addImg = (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      let subImg = new FormData();
      subImg.append("file", file);
      axios.post("http://localhost:3001/api/upload", subImg).then((res) => {
        this.setState({
          imgUrl: res.data.imageUrl,
        });
      });
    } else {
      alert("只能上传图片格式！");
    }
  };

  addShadow = () => {
    this.setState({
      shadow: true,
    });
  };

  removeShadow = () => {
    this.setState({
      shadow: false,
    });
  };

  handleEditorChange = (editorState) => {
    this.setState({ editorState });
  };

  submitContent = () => {
    const { title, imgUrl, id } = this.state;
    let tags = this.state.tags;
    let date = this.getDate();
    const htmlContent = this.state.editorState.toHTML();
    if (id) {
      // 更新文章
      if (tags.length === 0) {
        tags = "未分类";
      }
      let obj = {
        _id: id,
        title: title,
        imgUrl: imgUrl,
        content: htmlContent,
        labels: tags,
        date: date,
      };
      axios
        .post("http://localhost:3001/api/admin/updateBlog", {
          articleInformation: obj,
        })
        .then((response) => {
          alert("更新文章成功");
          // 更新完成后跳转至该文章的详情页
          this.props.history.push("/detail/" + this.props.match.params.id);
        });
    } else {
      // 新建文章
      let obj = {
        title: title,
        imgUrl: imgUrl,
        content: htmlContent,
        labels: tags,
        date: date,
      };
      const that = this;
      axios
        .post("http://localhost:3001/api/admin/saveBlog", {
          articleInformation: obj,
        })
        .then((response) => {
          console.log(response);
          alert("发表文章成功");
          // 保存成功后跳转至文章列表页
          that.props.history.push("/home");
        });
    }
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
  render() {
    const { tagInput, tags, imgUrl, title, editorState } = this.state;
    return (
      <div className="write">
        <div className="form">
          <div className="title">
            标题：
            <input
              type="text"
              placeholder="请输入标题"
              onChange={(e) => {
                this.setState({
                  title: e.target.value,
                });
              }}
              value={title}
            />
          </div>
          <div className="tags">
            标签：
            {tags
              ? tags.map((item, key) => {
                  return (
                    <div className="item">
                      {item}
                      <span onClick={this.removeItem.bind(this, key)}>x</span>
                    </div>
                  );
                })
              : null}
            {tagInput ? (
              <input
                type="text"
                onKeyPress={this.createNewTag}
                onBlur={this.tagOnBlur}
                ref={(input) => (this.input = input)}
                autofocus="autofocus"
                onChange={(e) => {
                  this.setState({
                    tag: e.target.value,
                  });
                }}
              />
            ) : (
              <button onClick={this.newTags}>+ New Tag</button>
            )}
          </div>
          <div className="cover">
            封面：
            {imgUrl ? (
              <div
                className="coverImg"
                onMouseOver={this.addShadow}
                onMouseOut={this.removeShadow}
              >
                <img src={imgUrl} alt="" />
              </div>
            ) : null}
            <a href="javascript:;" class="file">
              {imgUrl ? "重新选择" : "+ 选择封面"}
              <input
                type="file"
                name="file"
                accept="image/*"
                id="upload"
                onChange={this.addImg}
              />
            </a>
          </div>
          <div className="editor">
            <span>内容：</span>
            <BraftEditor
              value={editorState}
              onChange={this.handleEditorChange}
            />
          </div>
          <div className="submit" onClick={this.submitContent}>
            发布
          </div>
        </div>
      </div>
    );
  }
}
