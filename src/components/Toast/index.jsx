/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import ReactDOM from "react-dom";
import Toast from "./toast";
import "./index.css";

function createNotification() {
  const div = document.createElement("div");
  div.classList = "Toast";
  document.body.appendChild(div);
  const notification = ReactDOM.render(<Toast />, div);
  return {
    addNotice(notice) {
      return notification.addNotice(notice);
    },
    destroy() {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    },
  };
}

let notification;
const notice = (type, content, duration = 2000, onClose) => {
  if (!notification) {
    notification = createNotification();
    return notification.addNotice({ type, content, duration, onClose });
  } else {
    notification.destroy();
    notification = createNotification();
    return notification.addNotice({ type, content, duration, onClose });
  }
};

export default {
  info(content, duration, onClose) {
    return notice("info", content, duration, onClose);
  },
  success(content, duration, onClose) {
    return notice("success", content, duration, onClose);
  },
  error(content, duration, onClose) {
    return notice("error", content, duration, onClose);
  },
  loading(content = "加载中...", duration = 0, onClose) {
    return notice("loading", content, duration, onClose);
  },
};
