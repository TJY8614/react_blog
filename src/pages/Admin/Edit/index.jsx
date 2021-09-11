import axios from "axios";
import React, { Component } from "react";
import Paging from "../../../components/Paging";
import "./index.css";
export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLength: "",
      pageNum: 1,
      pageSize: 5,
    };
    this.getData(0, 5);
  }

  getData = (start, end) => {
    axios.get("http://localhost:3001/api/blogList").then((response) =>
      this.setState({
        data: response.data.slice(start, end),
        dataLength: response.data.length,
      })
    );
  };

  // 跳转至文章编辑页
  articleEdit = (id) => {
    this.props.history.push("/admin/write/" + id);
  };

  // 删除文章
  deleteArticle = (id) => {
    // let self = this
    // alter("此操作将永久删除该文章, 是否继续?", "提示", {
    //   confirmButtonText: "确定",
    //   cancelButtonText: "取消",
    //   type: "warning",
    // })
    //   .then(() => {
    axios
      .post("http://localhost:3001/api/admin/deleteBlog", {
        _id: id,
      })
      .then(
        (response) => {
          // this.$message({
          //   type: "success",
          //   message: "删除成功!",
          // });
          // this.fetchData();
          alert("删除成功");
          this.getData();
        },
        (response) => {
          console.log(response);
        }
      );
    // })
    // .catch(() => {
    //   this.$message({
    //     type: "info",
    //     message: "已取消删除",
    //   });
    // });
  };

  getPageNum = (val) => {
    this.setState({
      pageNum: val,
    });
    if (val === 1) {
      this.getData(0, this.state.pageSize);
    } else {
      let start = (val - 1) * this.state.pageSize;
      this.getData(start, start + this.state.pageSize);
    }
  };

  render() {
    const { data, dataLength, pageSize, pageNum } = this.state;
    return (
      <div className="edit">
        <div class="top">
          <span class="left">文章列表</span>
          <span class="right">共计 {dataLength} 篇</span>
        </div>
        <div class="table">
          <div class="table_hd">
            <span>标题</span>
            <span>日期</span>
          </div>
          {data.length > 0 ? (
            data.map((item) => {
              return (
                <div class="table_bd">
                  <span class="title">{item.title}</span>
                  <span class="data">{item.date}</span>
                  <button onClick={this.deleteArticle.bind(this, item._id)}>
                    删除
                  </button>
                  <button onClick={this.articleEdit.bind(this, item._id)}>
                    编辑
                  </button>
                </div>
              );
            })
          ) : (
            <span>还未发布文章</span>
          )}
          <Paging
            pageSize={pageSize}
            pageNum={pageNum}
            dataLength={dataLength}
            getValue={this.getPageNum}
          />
        </div>
        {/* <div className="page">
          <span className="iconfont pageIcon" onClick={this.setUp}>
            &#xe70a;
          </span>
          <span className="iconfont pageIcon" onClick={this.setNext}>
            &#xe61f;
          </span>
        </div> */}
      </div>
    );
  }
}
