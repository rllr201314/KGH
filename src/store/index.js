import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    mobile: '',
    isLogin: '',
    time: '',
    hint: 1,
    isRefresh: false, //判断是否强制刷新，列表调转详情缓存 刷新完要重新请求
    groupMessageMap: {}, // 聊天信息集合
    rosterList: [], //好友列表
    msgList: {},
    currentMsgs: [],
    // 提交的数据
    list_request: {
      page: 1,
      rows: 10,
      category_id: "",
      deal_type: "",
      client_id: "",
      operation_id: "",
      area_id: "",
      server_id: "",
      is_stage: "",
      is_safe: "",
      is_compact: "",
      sell_type: "",
      is_bind: "",
      role_level: "",
      begin_price: "",
      end_price: "",
      sort_price: "",
      sort_collection: "",
      is_video: "",
      person_sex: "",
      faction_id: "",
      content: '',
      extend_attribute: [],
    },
  },
  mutations: {
    set_token(state, token) {
      state.token = token;
      localStorage.token = token;
    },
    del_token(state) {
      state.token = ''
      localStorage.removeItem('token');
    },
    set_mobile(state, mobile) {
      state.mobile = mobile
      localStorage.mobile = mobile;
    },
    del_mobile(state) {
      state.mobile = ''
      localStorage.removeItem('mobile');
    },
    changeLogin(state, data) {
      state.isLogin = data
      localStorage.i = data
    },
    set_hint(state) {
      state.hint = 1;
    },
    sub_hint(state) {
      state.hint = 0;
    },
    set_refresh(state, opt) {
      state.isRefresh = opt;
    },
    setMsgList(state, payload) {
      state.msgList = payload;
    },
    // 更新用户列表 
    SET_IM_CHART_ROSTERLIST(state, rosterList) { //好友
      state.rosterList = rosterList
    },
    updateMsgList(state, payload) {
      console.log(payload);
      const {
        chatId,
        msg,
        bySelf,
        type,
        id
      } = payload;

      let status = "unread";

      if (!state.msgList[chatId]) {
        state.msgList[chatId] = [{
          msg,
          bySelf,
          type: type || "",
          mid: id,
          status: status,
          ...payload
        }];
      } else {
        state.msgList[chatId].push({
          msg,
          bySelf,
          type: type || "",
          mid: id,
          status,
          ...payload
        });
        state.msgList[chatId] = state.msgList[chatId].sort((a, b) => {
          return a.time - b.time;
        });
      }
      console.log('msgList', state.msgList)
      state.currentMsgs = Object.assign({}, state.msgList[chatId]);
      state.msgList = Object.assign({}, state.msgList);
      console.log(state.msgList)
    },
    // 更新当前聊天记录
    updateCurrentMsgList(state, messages) {
      state.currentMsgs = messages;
    },

  },
  actions: {
    getHistoryMessage: function (context, payload) {
      const options = {
        queue: payload.name,
        isGroup: payload.isGroup,
        count: 10, // 每次获取消息条数
        success: function (msgs) {
          try {
            payload.success && payload.success(msgs);
            if (msgs.length) {
              const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
              const userId = userInfo && userInfo.userId;
              msgs.forEach((item) => {
                let time = Number(item.time);
                let msg = {};
                const bySelf = item.from == userId;
                if (!item.filename) {
                  msg = {
                    chatId: bySelf ? item.to : item.from,
                    msg: item.data,
                    bySelf: bySelf,
                    time: time,
                    mid: item.id,
                    status: "read"
                  };
                  if (payload.isGroup) {
                    msg.chatId = item.to;
                  } else {
                    msg.chatId = bySelf ? item.to : item.from;
                  }
                } else if (!item.ext.file_length && item.filename !== "audio" && item.filename.substring(item.filename.length - 3) !== "mp4") { // 为图片的情况
                  msg = {
                    msg: item.url,
                    chatId: bySelf ? item.to : item.from,
                    bySelf: bySelf,
                    type: "img",
                    time: time,
                    mid: item.id,
                    status: "read"
                  };
                  if (payload.isGroup) {
                    msg.chatId = item.to;
                  } else {
                    msg.chatId = bySelf ? item.to : item.from;
                  }
                } else if (item.filename === "audio") {
                  msg = {
                    msg: item.url,
                    chatId: bySelf ? item.to : item.from,
                    bySelf: bySelf,
                    type: "audio"
                  };
                  if (payload.isGroup) {
                    msg.chatId = item.to;
                  } else {
                    msg.chatId = bySelf ? item.to : item.from;
                  }
                } else if (item.filename.substring(item.filename.length - 3) === "mp4") {
                  msg = {
                    msg: item.url,
                    chatId: bySelf ? item.to : item.from,
                    bySelf: bySelf,
                    type: "video"
                  };
                  if (payload.isGroup) {
                    msg.chatId = item.to;
                  } else {
                    msg.chatId = bySelf ? item.to : item.from;
                  }
                } else {
                  msg = {
                    msg: item.url,
                    chatId: bySelf ? item.to : item.from,
                    bySelf: bySelf,
                    type: "file",
                    filename: item.filename,
                    file_length: item.file_length,
                    time: time,
                    mid: item.id,
                    status: "read"
                  };
                  if (payload.isGroup) {
                    msg.chatId = item.to;
                  } else {
                    msg.chatId = bySelf ? item.to : item.from;
                  }
                }
                msg.isHistory = true;
                context.commit("updateMsgList", msg);
              });
              // context.commit("updateMessageStatus", {
              //   action: "readMsgs",
              //   chatType: payload.isGroup ? "group" : "contact",
              // });
            }
          } catch (e) {
            console.log("error", e);
          }
        },
        fail: function () {
          console.log("-------------------------------------")
        }
      };
      WebIM.conn.fetchHistoryMessages(options);
    },
    onGetCurrentChatObjMsg: function (context, payload) {
      
      const {
        id
      } = payload;
      console.log(id)
      console.log('state', context.state.msgList[id])
      if (context.state.msgList[id]) {
        context.commit("updateCurrentMsgList", context.state.msgList[id]);
      }
    },
    // 发送消息
    onSendText: function (context, payload) {
      console.log(payload)
      const {
        chatId,
        message,
        callback,
      } = payload;
      const id = WebIM.conn.getUniqueId();
      const time = +new Date();

      const msgObj = new WebIM.message("txt", id);
      msgObj.set({
        msg: message,
        to: chatId,
        success: function () {
          context.commit("updateMsgList", {
            chatId: chatId,
            msg: message,
            bySelf: true,
            time: time,
            mid: id,
            status: "sending"
          });
          callback();
        },
        fail: function (e) {
          console.log("Send private text error", e);
        }
      });
      WebIM.conn.send(msgObj.body);
    },
    // 发送图片
    sendImgMessage: function (context, payload) {
      const {
        chatId,
        file,
        callback
      } = payload;
      const id = WebIM.conn.getUniqueId();
      const msgObj = new WebIM.message("img", id);
      msgObj.set({
        apiUrl: WebIM.config.apiURL,
        file: file,
        to: chatId,
        onFileUploadError: function (error) {
          console.log("图片上传失败", error);
          callback();
        },
        onFileUploadComplete: function (data) {
          let url = data.uri + "/" + data.entities[0].uuid;
          context.commit("updateMsgList", {
            msg: url,
            chatId: chatId,
            bySelf: true,
            type: "img",
            time: data.timestamp,
            mid: id,
            status: "sending"
          });
          callback();
        },
        success: function () {
          console.log("图片发送成功");
        }
      });
      WebIM.conn.send(msgObj.body);
    },
    // 好友列表
    SET_IM_CHART_ROSTERLIST({
      commit
    }, rosterList) {
      commit('SET_IM_CHART_ROSTERLIST', rosterList)
    },


  },
  getters: {
    // 获取聊天记录
    onGetCurrentChatObjMsg(state) {
      return state.currentMsgs;
    },
    // 获取好友列表
    onGetContactUserList(state) {
      return state.rosterList || []
    },
  }
})
