import React from "react";
import { Redirect, Switch } from "react-router-dom";

//引入需要用到的页面组件
import Home from "../pages/Home/index";
import Login from "../pages/Login/index";
import Register from "../pages/Register/index";
import Admin from "../pages/Admin/index";
import Detail from "../pages/Detail/index";
import Archive from "../pages/Archive/index";
import Classify from "../pages/Classify/index";
import Labels from "../pages/Labels/index";
import MessageBoard from "../pages/MessageBoard/index";
import About from "../pages/About/index";

//引入一些模块
import { BrowserRouter as Router, Route } from "react-router-dom";

function router() {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/admin" component={Admin} />
        <Route path="/archive" component={Archive} />
        <Route path="/classify" component={Classify} />
        <Route path="/labels" component={Labels} />
        <Route path="/messageBoard" component={MessageBoard} />
        <Route path="/about" component={About} />

        <Redirect from="/" to="/home" />
      </Switch>
    </Router>
  );
}

export default router;
