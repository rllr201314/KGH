<template>
    <!-- 个人中心 -->
    <div class="wrap center-wrap">
        <div class="mycenter-top">
            <Header v-bind:head_data="head_data"></Header>
            <div class="user-login" v-if="myData.userStatus == 1">
                <div class="user-log">
                    <img :src="head_img" alt />
                </div>
                <div class="user-status">
                    <span class="user-login" @click="goSele('login')">登录</span>
                    <span class="vertical">|</span>
                    <span class="user-register" @click="goSele('register')">注册</span>
                </div>
            </div>
            <div class="user-info" v-if="myData.userStatus == 2">
                <div class="left-user-info">
                    <img :src="head_img" alt />
                </div>
                <div class="right-user-info">
                    <div class="user-phone">
                        <span v-text="myData.phoneNum"></span>
                        <img src="../../../static/img/my-center/user_flag.png" alt />
                    </div>
                    <div class="right-user-info-strip">
                        <span>购买成功</span>
                        <span v-text="myData.buyNum"></span>
                    </div>
                    <div class="right-user-info-strip">
                        <span>出售成功</span>
                        <span v-text="myData.sellNum"></span>
                    </div>
                </div>
                <div class="sign" v-if="false">
                    <img class="sign-img" src="../../../static/img/my-center/sign.png" alt />
                    <div class="sign-box">
                        <span v-text="myData.integral"></span>
                        <span>积分</span>
                        <img
                            class="sign-right-img"
                            src="../../../static/img/my-center/sign_right.png"
                            alt
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="mycenter-content">
            <div class="suspend-box">
                <div class="operation-box">
                    <div class="operation-title">
                        <div
                            class="user-type"
                            @click="seleUserType('buy')"
                            :class="myData.userTypeOpt.usertype?'switching':''"
                        >
                            我是买家
                            <span class="red_circle" v-show="tipAll.buy_tip == 1"></span>
                        </div>
                        <div
                            class="user-type"
                            @click="seleUserType('sell')"
                            :class="myData.userTypeOpt.usertype?'':'switching'"
                        >
                            我是卖家
                            <span class="red-circle" v-show="tipAll.sell_tip == 1"></span>
                        </div>
                    </div>
                    <div class="operation-content" v-show="myData.userTypeOpt.usertype">
                        <div
                            class="cell buy-tit"
                            v-for="item in myData.userTypeOpt.buyTit"
                            :class="item.name"
                            @click="goSele(item.link)"
                        >
                            <img :src="item.imgSrc" alt />
                            <div v-text="item.val"></div>
                            <span class="red-circle" v-show="item.msg"></span>
                        </div>
                    </div>
                    <div class="operation-content" v-show="!myData.userTypeOpt.usertype">
                        <div
                            class="cell buy-tit"
                            v-for="item in myData.userTypeOpt.sellTit"
                            :class="item.name"
                            @click="goSele(item.link)"
                        >
                            <img :src="item.imgSrc" alt />
                            <div v-text="item.val"></div>
                            <span class="red-circle" v-show="item.msg"></span>
                        </div>
                    </div>
                </div>
                <img class="l-loop" src="../../../static/img/my-center/lloop.png" alt />
                <img class="r-loop" src="../../../static/img/my-center/lloop.png" alt />
                <div class="operation-box">
                    <div class="operation-content" v-show="myData.userTypeOpt.usertype">
                        <div
                            class="cell"
                            v-for="item in myData.userTypeOpt.buyCon"
                            :class="item.name"
                            @click="goSele(item.link)"
                        >
                            <img :src="item.imgSrc" alt />
                            <span v-text="item.val"></span>
                            <span
                                class="red-circle"
                                v-show="item.msg && tipAll.buyer_discuss_msg == 1"
                            ></span>
                        </div>
                    </div>
                    <div class="operation-content" v-show="!myData.userTypeOpt.usertype">
                        <div
                            class="cell"
                            v-for="item in myData.userTypeOpt.sellCon"
                            :class="item.name"
                            @click="goSele(item.link)"
                        >
                            <img :src="item.imgSrc" alt />
                            <span v-text="item.val"></span>
                            <span
                                class="red-circle"
                                v-show="item.msg && tipAll.seller_discuss_msg == 1"
                            ></span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 资产管理 -->
            <div class="operation-box">
                <div class="box-title">
                    <div class="title-left">
                        <img src="../../../static/image/vertical.png" alt />
                        <span>资产管理</span>
                    </div>
                    <div class="title-right" @click="goSele('withdrawDeposit')">
                        <img src="../../../static/img/my-center/draw.png" alt />
                        <span>提现</span>
                    </div>
                </div>
                <div class="box-content" @click="goSele('assetsManage')">
                    <div class="box-content-cell">
                        <div class="manage-des">可用余额</div>
                        <div class="manage-detail">
                            <span v-text="myData.manageData.usableBalance"></span>元
                        </div>
                    </div>
                    <div class="vertical-bg"></div>
                    <div class="box-content-cell">
                        <div class="manage-des">冻结余额</div>
                        <div class="manage-detail">
                            <span v-text="myData.manageData.frostBalance"></span>元
                        </div>
                    </div>
                    <div class="vertical-bg"></div>
                    <div class="box-content-cell">
                        <div class="manage-des">押金</div>
                        <div class="manage-detail">
                            <span v-text="myData.manageData.cashPledge"></span>元
                        </div>
                    </div>
                </div>
            </div>
            <div class="strip-wrap">
                <div class="sell-strip" @click="goSele('commissionManage')">
                    <div class="left-strip price">
                        <img src="../../../static/img/my-center/price.png" alt />
                        <span>轻松赚佣金</span>
                    </div>
                    <div class="right-opt">
                        <img src="../../../static/img/order/next.png" alt />
                    </div>
                </div>

                <div class="sell-strip" @click="goSele('collect')">
                    <div class="left-strip collect">
                        <img src="../../../static/img/my-center/collect.png" alt />
                        <span>我的收藏</span>
                    </div>
                    <div class="right-opt">
                        <img src="../../../static/img/order/next.png" alt />
                    </div>
                </div>

                <div class="sell-strip" @click="goSele('browseRecord')">
                    <div class="left-strip his">
                        <img src="../../../static/img/my-center/his.png" alt />
                        <span>浏览记录</span>
                    </div>
                    <div class="right-opt">
                        <img src="../../../static/img/order/next.png" alt />
                    </div>
                </div>

                <div class="sell-strip" @click="goSele('pact')">
                    <div class="left-strip pacd">
                        <img src="../../../static/img/my-center/pacd.png" alt />
                        <span>电子合同</span>
                    </div>
                    <div class="right-opt">
                        <span class="red-bg" v-if="myData.pactNews > 0" v-text="myData.pactNews"></span>
                        <img src="../../../static/img/order/next.png" alt />
                    </div>
                </div>
                <div class="sell-strip" @click="goSele('authenticity')">
                    <div class="left-strip see">
                        <img src="../../../static/img/my-center/see.png" alt />
                        <span>客服真伪验证</span>
                    </div>
                    <div class="right-opt">
                        <img src="../../../static/img/order/next.png" alt />
                    </div>
                </div>
                <div class="sell-strip" @click="goSele('safe')">
                    <div class="left-strip safe">
                        <img src="../../../static/img/my-center/safe.png" alt />
                        <span>安全中心</span>
                    </div>
                    <div class="right-opt">
                        <img src="../../../static/img/order/next.png" alt />
                    </div>
                </div>
                <div class="sell-strip" @click="linkServer">
                    <div class="left-strip service">
                        <img src="../../../static/img/my-center/service.png" alt />
                        <span>联系客服</span>
                    </div>
                    <div class="right-opt">
                        <img src="../../../static/img/order/next.png" alt />
                    </div>
                </div>
            </div>
            <div class="strip-wrap">
                <div class="sell-strip" @click="goSele('changePassword')">
                    <div class="left-strip write">
                        <img src="../../../static/img/my-center/amend.png" alt />
                        <span>修改密码</span>
                    </div>
                    <div class="right-opt">
                        <img src="../../../static/img/order/next.png" alt />
                    </div>
                </div>

                <div class="sell-strip" @click="logoutFn">
                    <div class="left-strip quit">
                        <img src="../../../static/img/my-center/quit.png" alt />
                        <span>退出登录</span>
                    </div>
                    <div class="right-opt">
                        <img src="../../../static/img/order/next.png" alt />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
export default {
    name: "MyCenter",
    components: {
        Header
    },
    data() {
        return {
            head_data: {
                show_type: 2,
                right_icon: 2,
                tit_text: '个人中心',
                back:1,
            },
            buyer_msg: null,
            seller_msg: null,
            tipAll: {
                buy_tip: null,
                sell_tip: null,
                buyer_discuss_msg: null,
                seller_discuss_msg: null,
                buyer_tip_info: {
                    buyer_confirm_tip: null,
                    buyer_trading_tip: null,
                    buyer_wait_tip: null,
                },
                seller_tip_info: {
                    seller_confirm_tip: null,
                    seller_trading_tip: null,
                },
            },
            head_img: null,
            myData: {
                is_identify: '', is_bank: null,//实名认证-是否绑定银行卡
                userStatus: 2,
                userTypeOpt: {
                    usertype: true, //true是买家 false是卖家
                    buyTit: [
                        {
                            key: 1,
                            name: "unpaid",
                            imgSrc: "./static/image/mycenter/unpaid.png",
                            val: "待支付",
                            link: "b_unpaid",
                        },
                        {
                            key: 2,
                            name: "trading",
                            imgSrc: "./static/image/mycenter/trading.png",
                            val: "交易中",
                            link: "b_trading"
                        },
                        {
                            key: 3,
                            name: "receiv",
                            imgSrc: "./static/image/mycenter/receiv.png",
                            val: "待收货",
                            link: "b_receiv"
                        },
                        {
                            key: 4,
                            name: "tradsuccess",
                            imgSrc: "./static/image/mycenter/tradsuccess.png",
                            val: "交易成功",
                            link: "b_tradsuccess"
                        },
                        {
                            key: 5,
                            name: "order",
                            imgSrc: "./static/image/mycenter/order.png",
                            val: "全部订单",
                            link: "b_order"
                        }
                    ],
                    sellTit: [
                        {
                            key: 1,
                            name: "trading",
                            imgSrc: "./static/image/mycenter/trading.png",
                            val: "交易中",
                            link: "s_trading"
                        },
                        {
                            key: 2,
                            name: "deliver",
                            imgSrc: "./static/image/mycenter/deliver.png",
                            val: "已发货",
                            link: "s_wait"
                        },
                        {
                            key: 3,
                            name: "tradsuccess",
                            imgSrc: "./static/image/mycenter/tradsuccess.png",
                            val: "交易成功",
                            link: "s_tradsuccess"
                        },
                        {
                            key: 4,
                            name: "deal",
                            imgSrc: "./static/image/mycenter/deal.png",
                            val: "交易失败",
                            link: "s_fail"
                        },
                        {
                            key: 5,
                            name: "order",
                            imgSrc: "./static/image/mycenter/order.png",
                            val: "全部订单",
                            link: "s_order"
                        }
                    ],
                    buyCon: [
                        {
                            key: 1,
                            name: "voucher",
                            imgSrc: "./static/img/my-center/voucher.png",
                            val: "代金券",
                            link: "voucher"
                        },
                        {
                            key: 2,
                            name: "bidd",
                            imgSrc: "./static/img/my-center/bidd.png",
                            val: "我的竞拍",
                            link: "myAuction"
                        },
                        {
                            key: 3,
                            name: "bill",
                            imgSrc: "./static/img/my-center/bill.png",
                            val: "分期账单",
                            link: "bill"
                        },
                        {
                            key: 4,
                            name: "bargain",
                            imgSrc: "./static/img/my-center/bargain.png",
                            val: "发起的议价",
                            link: "bargain",
                            msg: true
                        }
                    ],
                    sellCon: [
                        {
                            key: 1,
                            name: "sell",
                            imgSrc: "./static/img/my-center/sell.png",
                            val: "我要出售",
                            link: "sell"
                        },
                        {
                            key: 2,
                            name: "goods",
                            imgSrc: "./static/img/my-center/goods.png",
                            val: "我的商品",
                            link: "myGoods"
                        },
                        {
                            key: 3,
                            name: "news",
                            imgSrc: "./static/img/my-center/news.png",
                            val: "议价消息",
                            link: "messageAll",
                            msg: true
                        }
                    ]
                },
                manageData: {
                    usableBalance: "0",
                    frostBalance: "0",
                    cashPledge: "0"
                },
                comNews: '',
                pactNews: '',
                phoneNum: "",
                sellNum: "",
                buyNum: "",
                integral: ""
            }
        };
    },
    methods: {
        linkServer() {
            this.$router.push({ name: 'Service' });
        },
        seleUserType(flag) {
            if (flag == "buy") {
                this.myData.userTypeOpt.usertype = true;
                sessionStorage.user_type = '1';
            } else if (flag == "sell") {
                this.myData.userTypeOpt.usertype = false;
                sessionStorage.user_type = '2';
            }
        },

        // 路由跳转
        goSele(flag) {
            var that = this;
            var token = that.$store.state.token;
            if (flag == 'login') {
                that.$router.push({ name: "AccountLogin" });
                return false;
            } else if (flag == 'register') {
                that.$router.push({ name: "Register" });
                return false;
            }

            if (token == undefined || token == "") {
                mui.confirm("请先登陆", "提示", ["取消", "确认"],
                    function (e) {
                        if (e.index == 1) {
                            that.$router.push({ name: "AccountLogin" });
                        }
                    },
                    "div"
                );
            } else {
                var that_r = that.$router;
                if (flag == "changePassword") {
                    // 修改密码
                    that_r.push({ name: "ChangePassword" });
                } else if (flag == "authenticity") {
                    //客服鉴别
                    that_r.push({ name: "Authenticity" });
                } else if (flag == "pact") {
                    //合同
                    that_r.push({ name: "Pact" });
                } else if (flag == "browseRecord") {
                    //浏览记录
                    that_r.push({ name: "BrowseRecord" });
                } else if (flag == "collect") {
                    //收藏
                    that_r.push({ name: "Collect" });
                } else if (flag == "commissionManage") {
                    //佣金管理
                    // that_r.push({ name: "CommissionManage" });
                    mui.toast('暂未开放', { duration: "short", type: "div" });
                } else if (flag == "assetsManage") {
                    //资产管理
                    that_r.push({ name: "AssetsManage" });
                } else if (flag == "withdrawDeposit") {
                    // 提现
                    if (Number(that.myData.manageData.usableBalance) > 0) {
                        if (that.myData.is_identify == 1) {
                            if (that.myData.is_bank == 1) {
                                that_r.push({ name: "WithdrawDeposit", query: { type: that.myData.is_identify } });
                            } else {
                                that.$router.push({ name: 'UserAuthentication', query: { type: that.myData.is_identify } })
                            }
                        } else {
                            that.$router.push({ name: 'UserAuthentication', query: { type: that.myData.is_identify } })
                        }
                    } else {
                        mui.toast('可提现金额不足', { duration: "short", type: "div" });
                    }
                } else if (flag == "b_unpaid") {
                    // 买家 头部导航栏
                    //待支付
                    that_r.push({ name: "BuyUnpaidStatus" });
                } else if (flag == "b_trading") {
                    //交易中
                    that_r.push({ name: "BuyTradingStatus" });
                } else if (flag == "b_receiv") {
                    //待收货
                    that_r.push({ name: "BuyWaitReceiveStatus" });
                } else if (flag == "b_tradsuccess") {
                    //交易成功
                    that_r.push({ name: "BuyTradeSuccessStatus" });
                } else if (flag == "b_order") {
                    //全部订单
                    that_r.push({ name: "BuyOrderAll" });
                } else if (flag == "s_trading") {
                    // 卖家 头部导航栏
                    //交易中
                    that_r.push({ name: "SellTradingStatus" });
                } else if (flag == "s_wait") {
                    //已发货
                    that_r.push({ name: "SellWaitReceiveStatus" });
                } else if (flag == "s_tradsuccess") {
                    //交易成功
                    that_r.push({ name: "SellTradeSuccessStatus" });
                } else if (flag == "s_fail") {
                    //交易失败
                    that_r.push({ name: "SellFailureDealStatus" });
                } else if (flag == "s_order") {
                    //全部订单
                    that_r.push({ name: "SellOrderAll" });
                } else if (flag == "voucher") {
                    // 买家 底部导航栏
                    //代金券
                    that_r.push({ name: "Voucher" });
                } else if (flag == "myAuction") {
                    //我的竞拍
                    that_r.push({ name: "MyAuction" });
                } else if (flag == "bill") {
                    //分期账单
                    that_r.push({ name: "BillInstallment" });
                } else if (flag == "bargain") {
                    //发起的议价-------------------------------------------------------------
                    // if(that.buyer_msg == 1){
                    //     that_r.push({ name: "BargainRecord" });
                    // }else{
                    that_r.push({ name: "BargainRecord" });
                    // }
                } else if (flag == "sell") {
                    // 卖家 底部导航栏
                    //我要卖
                    that_r.push({ name: "Sell" });
                    sessionStorage.buyOrsell = 2;
                } else if (flag == "myGoods") {
                    //我的商品
                    that_r.push({ name: "MyGoods" });
                } else if (flag == "messageAll") {
                    //议价消息
                    that_r.push({ name: "MessageAll" });
                } else if (flag == "safe") {
                    that_r.push({ name: 'Safety_Center', query: { type: that.myData.is_identify } });
                }
            }
        },
        logoutFn() {
            var that = this;
            console.log(that.$store.state.time)
            that.$axios.post(process.env.API_HOST + "logout").then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        that.$router.push({ name: 'HomePage' });
                        that.$store.commit('del_token');
                        that.$store.commit('del_mobile');
                    }
                    mui.toast(res.data.msg, { duration: "short", type: "div" });
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        getData(){
            var that=this;
            that.$axios.post(process.env.API_HOST+"userInfo").then((res)=>{
                // console.log(res)
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        var data = res.data.data;
                        that.$store.commit('set_mobile', data.user_info.username);
                        that.myData.phoneNum = data.user_info.username;
                        that.myData.sellNum = data.user_info.sell_count;
                        that.myData.buyNum = data.user_info.buy_count;
                        that.myData.manageData.usableBalance = Number(data.user_info.total_money);//可用余额
                        that.myData.manageData.frostBalance = Number(data.user_info.limit_money);//冻结金额
                        that.myData.manageData.cashPledge = Number(data.user_info.deposit);//押金
                        that.myData.is_identify = data.user_info.is_identify;
                        that.myData.is_bank = data.user_info.is_bank;
                        that.buyer_msg = data.user_info.buyer_discuss_msg;
                        that.myData.pactNews = data.user_info.compact_count;
                        that.seller_msg = data.user_info.seller_discuss_msg;
                        that.head_img = data.user_info.head_img;


                        that.tipAll.sell_tip = data.user_info.seller_tip;
                        that.tipAll.buy_tip = data.user_info.buyer_tip;
                        that.tipAll.buyer_discuss_msg = data.user_info.buyer_discuss_msg;
                        that.tipAll.seller_discuss_msg = data.user_info.seller_discuss_msg;

                        for (var i in that.myData.userTypeOpt.buyTit) {
                            if (that.myData.userTypeOpt.buyTit[i].name == "unpaid") {
                                if (data.buyer_tip_info.buyer_wait_tip == 1) {
                                    that.myData.userTypeOpt.buyTit[i].msg = true;
                                }
                            } else if (that.myData.userTypeOpt.buyTit[i].name == "trading") {
                                if (data.buyer_tip_info.buyer_trading_tip == 1) {
                                    that.myData.userTypeOpt.buyTit[i].msg = true;
                                }
                            } else if (that.myData.userTypeOpt.buyTit[i].name == "receiv") {
                                if (data.buyer_tip_info.buyer_confirm_tip == 1) {
                                    that.myData.userTypeOpt.buyTit[i].msg = true;
                                }
                            }
                        }
                        for (var i in that.myData.userTypeOpt.sellTit) {
                            if (that.myData.userTypeOpt.sellTit[i].name == "trading") {
                                if (data.seller_tip_info.seller_trading_tip == 1) {
                                    that.myData.userTypeOpt.sellTit[i].msg = true;
                                }
                            } else if (that.myData.userTypeOpt.sellTit[i].name == "deliver") {
                                if (data.seller_tip_info.seller_confirm_tip == 1) {
                                    that.myData.userTypeOpt.sellTit[i].msg = true;
                                }
                            }
                        }
                    }else if (res.data.code == 400) {
                        mui.toast(res.data.msg, { duration: "short", type: "div" });
                        // that.$router.go(-1);
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    mounted() {
        var that = this;
        var token = this.$store.state.token;
        if (token == undefined || token == "") {
            that.myData.userStatus = 1;
        } else {
            that.myData.userStatus = 2;
            that.getData()
        }
        if (sessionStorage.getItem('user_type') != null) {
            if (sessionStorage.getItem('user_type') == 1) {
                this.myData.userTypeOpt.usertype = true;
            } else {
                this.myData.userTypeOpt.usertype = false;
            }
        }
    }
};
</script>
<style scoped>
.center-wrap {
    padding-bottom: 0.2rem;
}
.mycenter-top {
    background-image: url(../../../static/image/personal1.jpg);
    background-repeat: no-repeat;
    background-size: 100% 3.8rem;
    padding-bottom: 0.9rem;
}
.user-login {
    font-size: 0.3rem;
    color: #333333;
    text-align: center;
}
.user-log {
    width: 1rem;
    height: 1rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 0.3rem;
}
.user-log img {
    width: 1rem;
    height: 1rem;
}
.user-status span {
    display: inline-block;
    color: #ffffff;
}
.vertical {
    margin: 0 0.2rem;
}
/* 内容部分 */
.mycenter-content {
    padding: 0 0.2rem;
    margin-top: -0.58rem;
}
.suspend-box {
    font-size: 0.24rem;
    position: relative;
}
.l-loop {
    width: 0.12rem;
    height: 0.54rem;
    position: absolute;
    top: 2.14rem;
    left: 0.5rem;
}
.r-loop {
    width: 0.12rem;
    height: 0.54rem;
    position: absolute;
    top: 2.14rem;
    right: 0.5rem;
}
.operation-box {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
}

/* 选择用户状态 */
.operation-title {
    border-bottom: 0.01rem solid #e5e5e5;
    text-align: center;
}
.operation-title div {
    display: inline-block;
    width: 49.2%;
    line-height: 0.7rem;
    position: relative;
}
.operation-title span {
    position: absolute;
    top: 0.15rem;
}
.red-circle {
    width: 0.12rem;
    height: 0.12rem;
    border-radius: 100%;
    background: #f31000;
    display: inline-block;
}
.operation-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.3rem 0;
}
.cell {
    color: #666666;
    text-align: center;
}
.cell div {
    margin-top: 0.05rem;
}
.buy-tit,
.sell-tit {
    position: relative;
}
.buy-tit .red-circle {
    position: absolute;
    top: 0;
    right: 0.15rem;
}
.deliver .red-circle {
    right: 0.05rem;
}

.unpaid img {
    width: 0.37rem;
    height: 0.37rem;
}
.trading img {
    width: 0.34rem;
    height: 0.33rem;
}
.receiv img {
    width: 0.35rem;
    height: 0.35rem;
}
.tradsuccess img {
    width: 0.34rem;
    height: 0.33rem;
}
.order img {
    width: 0.3rem;
    height: 0.35rem;
}
.deal img {
    width: 0.36rem;
    height: 0.36rem;
}
.deliver img {
    width: 0.51rem;
    height: 0.3rem;
}
.red-color {
    color: #fe7649;
    border-bottom: 0.03rem solid #fe7649;
}
.voucher img {
    width: 0.3rem;
    height: 0.21rem;
}
.bidd img {
    width: 0.25rem;
    height: 0.25rem;
}
.bill img {
    width: 0.24rem;
    height: 0.26rem;
}
.bargain {
    position: relative;
}
.bargain .red-circle {
    position: absolute;
    top: 0;
    left: 0.16rem;
}
.bargain img {
    width: 0.23rem;
    height: 0.25rem;
}
.sell img {
    width: 0.22rem;
    height: 0.21rem;
}
.goods img {
    width: 0.2rem;
    height: 0.23rem;
}
.news img {
    width: 0.25rem;
    height: 0.25rem;
}
.news {
    position: relative;
}
.news .red-circle {
    position: absolute;
    top: 0;
    left: 0.16rem;
}

/* 资产管理 */
.box-title {
    line-height: 0.7rem;
    border-bottom: 0.01rem solid #e5e5e5;
    padding-right: 0.2rem;
}
.title-left {
    display: inline-block;
}
.title-left span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
}
.title-left img {
    width: 0.08rem;
    height: 0.25rem;
    margin-left: 0.17rem;
    vertical-align: middle;
    border-radius: 0.1rem;
}
.title-right {
    float: right;
}
.title-right img {
    width: 0.25rem;
    height: 0.28rem;
    vertical-align: middle;
}
.title-right span {
    font-size: 0.24rem;
    color: #999999;
}
.box-content {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 0.3rem 0 0.28rem;
    text-align: center;
    align-items: center;
    line-height: 0.4rem;
}
.manage-des {
    font-size: 0.24rem;
    color: #999999;
}
.manage-detail {
    font-size: 0.28rem;
    color: #333333;
}
.vertical-bg {
    width: 0.02rem;
    height: 0.45rem;
    background: #e5e5e5;
}

.strip-wrap {
    font-size: 0.26rem;
    color: #666666;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
    padding-left: 0.2rem;
}
.sell-strip {
    line-height: 0.9rem;
    border-bottom: 0.01rem solid #e5e5e5;
    padding-right: 0.2rem;
}
.sell-strip img {
    vertical-align: middle;
}
.sell-strip span {
    vertical-align: middle;
}
.left-strip {
    display: inline-block;
    position: relative;
    min-width: 4rem;
}
/* .left-strip img {
    margin-right: 0.1rem;
} */
.left-strip span {
    position: absolute;
    left: 0.5rem;
}

.right-opt {
    float: right;
}
.right-opt img {
    width: 0.13rem;
    height: 0.24rem;
    margin-left: 0.2rem;
}
.red-bg {
    display: inline-block;
    line-height: 0.34rem;
    padding: 0 0.1rem;
    background: #fa5856;
    color: #ffffff;
    border-bottom-left-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
}
.price img {
    width: 0.25rem;
    height: 0.27rem;
}
.collect img {
    width: 0.3rem;
    height: 0.29rem;
}
.his img {
    width: 0.28rem;
    height: 0.28rem;
}
.pacd img {
    width: 0.23rem;
    height: 0.27rem;
}
.see img {
    width: 0.33rem;
    height: 0.21rem;
}
.safe img {
    width: 0.26rem;
    height: 0.29rem;
}
.service img {
    width: 0.27rem;
    height: 0.25rem;
}
.service span {
    color: #666666;
}
.write img {
    width: 0.25rem;
    height: 0.23rem;
}
.quit img {
    width: 0.26rem;
    height: 0.27rem;
}

.user-info {
    padding: 0 0.3rem;
    position: relative;
    padding-top: 0.5rem;
}
.left-user-info,
.right-user-info {
    display: inline-block;
    vertical-align: top;
}
.left-user-info img {
    width: 1rem;
    height: 1rem;
}
.user-phone {
    font-size: 0.26rem;
    color: #ffffff;
}
.right-user-info {
    margin-left: 0.26rem;
    font-size: 0.22rem;
    color: #ffdfdb;
    line-height: 0.4rem;
}
.user-phone img {
    width: 0.28rem;
    height: 0.28rem;
    vertical-align: middle;
}
.user-phone span {
    vertical-align: middle;
}
.sign {
    height: 1.8rem;
    text-align: center;
    display: inline-block;
    color: #ffffff;
    font-size: 0.26rem;
    position: absolute;
    top: 0.4rem;
    right: 0.1rem;
}
.sign-img {
    width: 1.8rem;
    height: 1.8rem;
}
.sign-box {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
