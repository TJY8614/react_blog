import React, { Component } from "react";
import Header from "../../components/Header";
import "./index.css";
import bg from "../../asset/About/bg.png";
export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    setTimeout(() => {
      window.scrollBy(0, 725);
    });
  }

  render() {
    const {} = this.state;
    return (
      <div className="about">
        <Header />
        <main>
          <div className="bg">
            <img src={bg} alt="" />
          </div>
          <span className="iconfont gobackIco" onClick={this.goBack}>
            &#xe617;
          </span>
          <div className="title">关 于</div>
          <div className="content">
            <p>站长: Tjy</p>

            <p>本名: 未知</p>

            <p>性别: 女</p>

            <p>年龄: ?</p>

            <p>星座: 狮子座</p>

            <p className="typing-demo">
              座右铭: 明日复明日，明日何其多。 晨昏滚滚水东流，今古悠悠日西坠。
            </p>

            <p>简介: 详情请见</p>

            <p>自我介绍: 金鱼记忆大师</p>
          </div>
        </main>
      </div>
    );
  }
}
