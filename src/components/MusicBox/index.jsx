/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import "./index.css";
class MusicBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicList: [
        { al: "", ar: [{ name: "" }] },
        { al: "", ar: [{ name: "" }] },
        { al: "", ar: [{ name: "" }] },
        { al: "", ar: [{ name: "" }] },
        { al: "", ar: [{ name: "" }] },
        { al: "", ar: [{ name: "" }] },
        { al: "", ar: [{ name: "" }] },
        { al: "", ar: [{ name: "" }] },
        { al: "", ar: [{ name: "" }] },
        { al: "", ar: [{ name: "" }] },
      ],
      idList: [],
      currentSong: [{ url: "" }],
      num: 0,
      favorite: false,
      autoplay: false,
      stop: true,
    };
  }
  componentDidMount() {
    axios
      .get("https://api.imjad.cn/cloudmusic/?type=playlist&id=6961865506")
      .then((res) => {
        this.setState({
          musicList: res.data.playlist.tracks,
        });
        let array = [];
        let data = res.data.playlist.tracks;
        data.map((item) => {
          array.push(item.id);
        });
        this.setState({
          idList: array,
        });
        this.getMusic(0);
      });
  }

  getMusic = (e) => {
    axios
      .get("https://api.imjad.cn/cloudmusic/", {
        params: {
          type: "song",
          id: this.state.idList[e],
        },
      })
      .then((res) => {
        this.setState({
          currentSong: res.data.data[0],
        });
      });
  };
  setUp = () => {
    if (this.state.num > 0) {
      let num = this.state.num - 1;
      this.setState({
        num: num,
        autoplay: true,
        stop: false,
      });
      this.getMusic(num);
    } else {
      let num = 9;
      this.setState({
        num: num,
        autoplay: true,
        stop: false,
      });
      this.getMusic(num);
    }
  };

  setNext = () => {
    if (this.state.num < 9) {
      let num = this.state.num + 1;
      this.setState({
        num: num,
        autoplay: true,
        stop: false,
      });
      this.getMusic(num);
    } else {
      let num = 0;
      this.setState({
        num: num,
        autoplay: true,
        stop: false,
      });
      this.getMusic(num);
    }
  };
  closeBox = () => {
    this.props.getOpenValue(false);
  };

  stopMusic = () => {
    let audio = document.getElementById("media");
    if (this.state.stop) {
      audio.play();
    } else {
      audio.pause();
    }
    this.setState({
      stop: !this.state.stop,
    });
  };

  render() {
    const { musicList, currentSong, num, favorite, autoplay, stop } =
      this.state;
    let currentUrl = "https://music.163.com/#/song?id=" + currentSong.id;
    return (
      <div className="musicBox">
        <div className="wrapper">
          <div className="closeIcon">
            <span className="iconfont" onClick={this.closeBox}>
              &#xe8e7;
            </span>
          </div>
          <div className="player">
            <div className="player__top">
              <div className="player-cover">
                <div className="player-cover__item">
                  <img src={musicList[num].al.picUrl} alt="" />
                </div>
              </div>
              <div className="player-controls">
                <div
                  className={
                    favorite
                      ? "player-controls__item -favorite"
                      : "player-controls__item"
                  }
                  onClick={() => {
                    this.setState({ favorite: !this.state.favorite });
                  }}
                >
                  <span className="iconfont icon">&#xe8c3;</span>
                </div>
                <div className="player-controls__item">
                  <a href={currentUrl} target="_blank" rel="noreferrer">
                    <span className="iconfont">&#xe8b0;</span>
                  </a>
                </div>
                <div className="player-controls__item" onClick={this.setUp}>
                  <span className="iconfont">&#xe603;</span>
                </div>
                <div className="player-controls__item" onClick={this.setNext}>
                  <span className="iconfont">&#xe8e8;</span>
                </div>
                <div className="player-controls_item" onClick={this.stopMusic}>
                  {stop ? (
                    <span className="iconfont">&#xe604;</span>
                  ) : (
                    <span className="iconfont">&#xe68f;</span>
                  )}
                </div>
              </div>
            </div>
            <div className="progress">
              <div className="progress__top">
                <div className="album-info">
                  <div className="album-info__name">{musicList[num].name}</div>
                  <div className="album-info__track">
                    {musicList[num].ar[0].name}
                  </div>
                </div>
              </div>
              <audio
                controls
                autoplay={autoplay ? "" : false}
                id="media"
                src={currentSong.url}
                style={{ width: "100%", height: "50px" }}
              ></audio>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MusicBox);
