import React, { Component } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import Write from "../Admin/Write";
import Edit from "../Admin/Edit";
export default class Admin extends Component {
  render() {
    return (
      <div className="admin">
        <div className="nav">
          <div className="title">后台管理</div>
          <ul>
            <li>
              <Link to="/home">
                <span>首页</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/write">
                <span>写文章</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/edit">
                <span>管理文章</span>
              </Link>
            </li>
          </ul>
        </div>
        <Switch>
          {/* <Route path="/admin/write" component={Write} /> */}
          <Route path="/admin/write/:id" component={Write} />
          <Route path="/admin/write" component={Write} />
          <Route path="/admin/edit" component={Edit} />
          <Redirect to="/admin/write" />
        </Switch>
      </div>
    );
  }
}
