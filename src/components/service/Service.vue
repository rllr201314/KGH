<template>
    <div class="wrap service-wrap">
        <Head :head_data="head_data"></Head>
        <div class="service-detail" ref="chattingContent">
            <!-- <div class="moreMsgs" @click="loadMoreMsgs">{{loadText}}</div> -->
            <div v-for="(item,index) in charts" :key="index">
                <div class="item1" :class="!item.bySelf?'left':'right'">
                    <img
                        class="header-img"
                        :src="!item.bySelf ?service_img:'../../../static/img/service/user-icon.png'"
                    />
                    <div>
                        <div class="time" v-text="renderTime(item.time)"></div>
                        <div class="message-box1" v-if="item.type == 'img'">
                            <img
                                :key="item.msg"
                                :src="item.msg?item.msg:''"
                                v-if="item.type === 'img'"
                                class="img-style"
                            />
                        </div>
                        <div class="message-box" v-else>
                            <span class="angle"></span>
                            <span class="message" v-text="item.msg"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="fixed-bottom">
            <div class="tool-box">
                <div class="tool-item">
                    <img src="../../../static/img/service/img-icon.png" alt />
                    <input
                        :disabled="!toId"
                        @change="sendImageMessage($event)"
                        ref="imageInput"
                        type="file"
                    />
                </div>
            </div>
            <div class="input-box">
                <input type="text" placeholder="请输入文字" @keyup.enter="sendMessage" v-model="txt" />
                <img src="../../../static/img/service/send.png" alt="发送" @click="sendMessage" />
            </div>
        </div>
        <van-action-sheet
            class="sheet-pop"
            v-model="show"
            cancel-text="取消"
            :close-on-click-overlay="false"
            :actions="actions"
            @select="onSelect"
            @cancel="onCancel"
        />
        <Loading v-show="showLoading"></Loading>
    </div>
</template>

<script>
import Head from "@/components/home-page/Header";
import WebIM from '../../utils/WebIM'
import { mapActions, mapGetters } from "vuex";
import moment from 'moment'
import Loading from "@/components/multi/Loading";

export default {
    components: {
        Head, Loading
    },
    data() {
        return {
            head_data: {
                show_type: 2,
                tit_text: '客服1号',
                right_icon: 2,
                showBack: false,
                showLogo: 2, //显示头部title文字
                showShare: 3, //1搜索2分享3菜单
                showBg: true, //是否显示背景
            },
            toId: "",
            txt: '',
            show: true,
            actions: [],
            service_img: '../../../static/img/service/kgh-icon.png',
            loadText: '加载更多',
            showLoading: true,

        };
    },
    computed: {
        // 用户
        // 聊天列表
        ...mapGetters({
            onGetContactUserList: 'onGetContactUserList',//获取好友
            charts: "onGetCurrentChatObjMsg"
        }),
    },
    watch: {
        charts(val, oldVal) {
            console.log(val)
            this.scrollToBottom()
        },
        toId(val, oldVal) {
            var that = this;
            console.log(that.onGetContactUserList)
            if (that.onGetContactUserList == '') {
                //添加客服好友
                WebIM.conn.subscribe({
                    to: val,
                    message: '加个好友呗!'
                });
            } else {
                var a = 0;
                for (var i in that.onGetContactUserList) {
                    if (that.onGetContactUserList[i].name != val) {
                        a += 1;
                    }
                }
                if (that.onGetContactUserList.length == a) {
                    //添加客服好友
                    WebIM.conn.subscribe({
                        to: val,
                        message: '加个好友呗!'
                    });
                }
            }
        }

    },
    beforeCreate() {
        // 聊天记录
        let message = localStorage.getItem('msgList');
        if (message != '{}' && message != 'null' && message != null) {
            let history_msg = JSON.parse(message);
            this.$store.commit('setMsgList', history_msg);
        };
    },
    mounted() {
        this.initLogin();
    },
    destroyed() {
        if (WebIM.conn.user != '') {
            WebIM.conn.close();
        }
    },
    methods: {
        ...mapActions([
            "getHistoryMessage",
            "onGetCurrentChatObjMsg",
            "onSendText",
            "sendImgMessage",
        ]),
        loadMoreMsgs() {

            const me = this;
            const success = function (msgs) {
                if (msgs.length === 0) {
                    me.loadText = "已无更多数据";
                }
            };
            let name = me.toId;
            this.getHistoryMessage({
                name,
                isGroup: false,
                success
            });
        },
        // 格式化时间
        renderTime(time) {
            const nowStr = new Date();
            const localStr = time ? new Date(time) : nowStr;
            const localMoment = moment(localStr);
            const localFormat = localMoment.format("MM-DD hh:mm A");
            return localFormat;
        },
        initLogin() {
            var that = this;
            that.$axios.post(`${that.baseURL}chatToken`).then(res => {
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        that.actions = res.data.data.kf_info;
                        let userInfo = res.data.data.user_info;
                        let options = {
                            apiUrl: WebIM.config.apiURL,
                            user: userInfo.es_username,
                            pwd: userInfo.es_password,
                            appKey: WebIM.config.appkey
                        };
                        WebIM.conn.open(options);

                    } else {
                        mui.toast(res.data.msg, { duration: "short", type: "div" });
                    }
                }
            }).catch(err => {
                console.log(err)
            })
        },
        sendMessage() {
            var that = this;
            // 只做了单聊的会话 single  
            that.showLoading = true;
            if (this.txt) {
                var temp_message = this.txt;
                if (temp_message.replace(/\s/g, "") != "") {
                    that.onSendText({
                        chatId: that.toId,
                        message: that.txt,
                        callback: () => {
                            that.showLoading = false;
                        },
                    })
                    that.txt = '';
                } else {
                    mui.toast('不能发送空白信息', { duration: 'short', type: 'div' });
                }
            } else {
                mui.toast('不能发送空白信息', { duration: 'short', type: 'div' });
            }
        },
        scrollToBottom() {
            this.$nextTick(_ => {
                this.$refs['chattingContent'].scrollTop = this.$refs['chattingContent'].scrollHeight
            })
        },
        onSelect(item) {
            var that = this;
            that.service_img = item.avatar;
            that.head_data.tit_text = item.name;
            that.toId = item.es_username;
            that.show = false;
            that.showLoading = false;

            that.onGetCurrentChatObjMsg({ id: that.toId });
        },
        onCancel() {
            this.$router.go(-1)
        },
        sendImageMessage(e) {
            let that = this;
            that.showLoading = true;
            if (that.toId) {
                let file = WebIM.utils.getFileUrl(e.target);
                if (!file.filename) {
                    this.$refs.imageInput.value = null;
                    return false;
                }

                let obj = {
                    chatId: that.toId, //TODO 这里在群里面应该取的是ID，后期跟进
                    file: file,
                    callback: () => {
                        this.$refs.imageInput.value = null;
                        that.showLoading = false;
                    }
                };
                this.sendImgMessage(obj);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.service-wrap {
    background: #f6f8fe;
    .service-detail {
        height: calc(100vh - 2.5rem);
        overflow-y: scroll;
        padding: 0.2rem;
        /* 聊天item采用flex布局*/

        .moreMsgs {
            background: #ccc !important;
            border-radius: 8px;
            cursor: pointer;
            text-align: center;
        }
        .item1 {
            display: flex;
            margin-bottom: 0.2rem;
            .header-img {
                width: 0.8rem;
                height: 0.8rem;
                border-radius: 50%;
                margin-top: 0.2rem;
            }
            .time {
                color: #99a8b4;
                font-size: 0.14rem;
                margin-bottom: 0.05rem;
            }
            .message-box {
                font-size: 0px;
                display: flex;
                .message {
                    max-width: 4.6rem;
                    min-height: 0.3rem;
                    line-height: 0.4rem;
                    padding: 0.05rem 0.2rem;
                    font-size: 0.26rem;
                    white-space: normal;
                    word-break: break-all;
                    word-wrap: break-word;
                }
                .angle {
                    width: 0;
                    height: 0;
                    border-top: 0.1rem solid transparent;
                    border-bottom: 0.1rem solid transparent;
                    z-index: 1;
                }
            }
            .message-box1 {
                .img-style {
                    width: 4rem;
                    height: auto;
                    padding: 0.1rem;
                    border-radius: 0.05rem;
                    background: #ffffff;
                }
            }
        }
        .left {
            flex-direction: row;
            .time {
                text-align: left;
            }
            .img-style {
                margin-left: 0.2rem;
            }
            .message-box {
                flex-direction: row;
                .angle {
                    margin: 0.1rem 0 0 0.2rem;
                    border-right: 0.15rem solid #ffffff;
                }
                .message {
                    color: #333333;
                    background: #ffffff;
                    box-shadow: 0px 0.03rem 0.07rem 0px
                        rgba(199, 199, 199, 0.35);
                }
            }
        }
        .right {
            flex-direction: row-reverse;
            .time {
                text-align: right;
            }
            .img-style {
                margin-right: 0.2rem;
            }
            .message-box {
                flex-direction: row-reverse;
                .angle {
                    margin: 0.1rem 0.2rem 0 0;
                    border-left: 0.15rem solid #fd8159;
                }
                .message {
                    color: #ffffff;
                    background: #fd8159;
                    box-shadow: 0px 0.03rem 0.07rem 0px rgba(253, 89, 129, 0.35);
                }
            }
        }
    }
    .fixed-bottom {
        max-width: 640px;
        margin: 0 auto;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #ffffff;
        box-shadow: 0 0.03rem 0.07rem 0 rgba(221, 221, 221, 0.35);
        .tool-box {
            padding: 0.1rem 0.2rem 0;
            line-height: 0;
            .tool-item {
                display: inline-block;
                position: relative;
                img {
                    width: 0.4rem;
                    height: 0.4rem;
                }
                input {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
            }
        }
    }
    .input-box {
        display: flex;
        padding: 0.15rem 0.32rem 0.15rem 0.2rem;
        align-items: center;
        input {
            flex: 1;
            height: 0.64rem;
            border: 1px solid #e5e5e5;
            padding: 0.03rem 0.2rem;
            outline: none;
            margin: 0;
            font-size: 0.24rem;
        }
        img {
            width: 0.53rem;
            height: 0.49rem;
            margin-left: 0.15rem;
        }
    }
    .sheet-pop {
        max-width: 640px;
        margin: 0 auto;
        left: 0;
        right: 0;
    }
}
</style>