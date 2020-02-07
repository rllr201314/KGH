import Vue from "vue"
import Router from "@/router"
import store from '@/store'
import config from "./WebIMConfig";
// import websdk from "easemob-websdk";
import websdk from "easemob-websdk"

function ack(message) {
  var bodyId = message.id; // 需要发送已读回执的消息id
  var msg = new WebIM.message("read", WebIM.conn.getUniqueId());
  msg.set({
    id: bodyId,
    to: message.from
  });
  WebIM.conn.send(msg.body);
}

// 初始化IM SDK
var WebIM = {};
WebIM = window.WebIM = websdk;
WebIM.config = config;
WebIM.conn = new WebIM.connection({
  appKey: WebIM.config.appkey,
  isHttpDNS: WebIM.config.isHttpDNS,
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: WebIM.config.https,
  url: WebIM.config.xmppURL,
  apiUrl: WebIM.config.apiURL,
  isAutoLogin: true,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  isStropheLog: WebIM.config.isStropheLog,
  delivery: WebIM.config.delivery
});
if (!WebIM.conn.apiUrl) {
  WebIM.conn.apiUrl = WebIM.config.apiURL;
}


WebIM.conn.listen({
  onOpened(message) {
    // 获取好友
    this.getRoster({
      success: roster => {
        // const userList = roster.filter(user => ["both", "to"].includes(user.subscription));
        // store.commit("updateUserList", {
        //   userList,
        // });
        console.log('roster')
        console.log(roster)
        store.dispatch('SET_IM_CHART_ROSTERLIST', roster)

      }
    })
  },
  // 收到文本消息
  onTextMessage: function (message) {
    // console.log('onTextMessage', message)
    const {
      from,
      to,
      type
    } = message;
    console.log('message', message.time)
    console.log(Vue)

    const chatId = type !== "chat" ? to : from;
    store.commit("updateMsgList", {
      chatId: chatId,
      msg: message.data,
      bySelf: false,
      from: message.from,
      mid: message.id,
      time: Number(message.time),
    });
  },
  // 收到图片消息
  onPictureMessage: function (message) {
    console.log('onPictureMessage', message)
    const {
      from,
      to,
      type
    } = message;
    const chatId = type !== "chat" ? to : from;
    store.commit("updateMsgList", {
      chatId: chatId,
      msg: message.url,
      bySelf: false,
      type: "img",
      from: message.from,
      time: Number(message.time)
    });
    // ack(message);
  },
  // 处理请求


})


// WebIM.WebRTC = webrtc;
// WebIM.EMedia = emedia;
export default WebIM;
