import axios from "axios";
import React, { Component } from "react";
import "./index.css";
export default class ToiletRoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
    };
  }
  componentDidMount() {
    axios.post("http://localhost:3001/api/messageList").then((res) => {
      this.setState({
        messageList: res.data,
      });
    });
  }
  render() {
    const { messageList } = this.state;
    return (
      <div className="ToiletRoll">
        <div class="wrapper">
          <div class="toiletroll">
            <div class="roll"></div>
            <div class="papers">
              {messageList
                ? messageList.map((item) => {
                    return (
                      <div
                        class="paper"
                        dangerouslySetInnerHTML={{
                          __html: item.content ? item.content : null,
                        }}
                      ></div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
