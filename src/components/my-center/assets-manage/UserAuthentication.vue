<template>
    <!-- 用户认证 -->
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="userauthentic-content">
            <div class="add-card" v-if="pageType==1">
                <img src="../../../../static/img/assets-manage/user_card.png" alt />
                <div v-if="status">
                    <div>交易密码主要用于保护您的账户余额和押金余额的安全。</div>
                    <div>请先完成实名认证</div>
                </div>
                <div v-else>为了您的资金安全，请先完成个人实名认证</div>
                <div class="go-authentic" @click="goAuthentication">前往认证</div>
            </div>

            <div class="manange-card" v-else-if="pageType==2">
                <div class="manange-top">
                    <img src="../../../../static/img/goodscreen/vertical.png" alt />
                    <span>请填写提现账户信息</span>
                </div>
                <div class="manange-content">
                    <div class="manange-strip">
                        <span class="manange-left">姓名</span>
                        <span v-text="name"></span>
                        <span class="hint-right red-color dominant-color">（为了您的资金安全，姓名必须为认证用户本人）</span>
                    </div>

                    <div class="manange-strip" @click="showPop">
                        <span class="manange-left card-type">提现方式</span>
                        <div class="right-strip">
                            <span v-text="seleType"></span>
                            <img src="../../../../static/img/order/next.png" alt />
                        </div>
                    </div>

                    <div class="manange-strip" v-if="seleType == '支付宝'">
                        <span class="manange-left-z">支付宝账户</span>
                        <input type="text" class="card-num" placeholder="请输入支付宝账户" v-model="zfb" />
                    </div>
                    <div v-if="seleType == '银行卡'">
                        <div class="manange-strip">
                            <span class="manange-left">银行卡号</span>
                            <input
                                type="number"
                                class="card-num"
                                placeholder="请输入银行卡号"
                                v-model="bank_num"
                            />
                        </div>
                        <div class="manange-strip">
                            <span class="manange-left">开户行</span>
                            <input
                                type="text"
                                class="card-name"
                                placeholder="请填写您的开户行名称"
                                v-model="bank_text"
                            />
                            <span class="red-color dominant-color">（请咨询各银行服务热线）</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="protocol" v-if="pageType==2">
            <img
                :src="protocol?'../../../../static/img/goodscreen/okcheck.png':'../../../../static/img/goodscreen/nocheck.png'"
                alt
                @click="isAgree"
            />
            <div>
                我已阅读并同意
                <span class="red-color dominant-color" @click="getProtocol">《账户安全协议》</span>
            </div>
        </div>
        <Protocal v-bind:proData="proData" v-on:isProFn="isProFn"></Protocal>

        <div class="okBtn dominant-bg button" v-if="pageType==2" @click="addInfo">提交绑定信息</div>
        <div id="sheet" class="mui-popover mui-popover-bottom mui-popover-action">
            <!-- 可选择菜单 -->
            <ul class="pop-view">
                <li class="pop-view-tit option-gray">
                    <div>请选择提现方式</div>
                </li>
                <!-- 商品类型 -->
                <li
                    class="option-black"
                    v-for="(item,index) in accountType"
                    @click="seleTypeFn(item.value)"
                    v-text="item.name"
                    :key="index"
                ></li>
            </ul>
            <!-- 取消菜单 -->
            <ul class="pop-view">
                <li class="mui-table-view-cell option-black">
                    <a href="#sheet">取消</a>
                </li>
            </ul>
        </div>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import Loading from "@/components/multi/Loading";
import Protocal from "@/components/multi/Protocal";//协议

export default {
    name: "UserAuthentication",
    components: {
        Header,
        Loading,
        Protocal
    },
    data() {
        return {
            head_data: {
                show_type: 2,
                right_icon: '',
                tit_text: "选择账户",
            },
            proData: {
                isShow: false,
                con: "",
                btn: "确认已读",
                val: ""
            },
            showLoading: false,
            pageType: null, //控制页面是添加银行卡还是选择银行卡----
            protocol: true,
            name: "",
            accountType: [],
            seleType: "支付宝",
            seleVal: "",
            zfb: "",
            bank_num: "",
            bank_text: "",
            status: null,
        };
    },
    mounted() {
        var that = this;
        if (that.$route.query.type) {
            // 1-已实名认证
            if (that.$route.query.type == 1) {
                that.pageType = 2;
                that.getData();
            } else {
                that.pageType = 1;
                if (that.$route.query.status) {
                    that.status = that.$route.query.status;
                }
            }
        } else {
            that.$router.go(-1);
        }
    },
    methods: {
        // 前往认证
        goAuthentication() {
            // this.$router.push({ name: "SafePhone" });
            this.$router.push({ path: '/safe-card' });
        },
        // 获取银行卡配置
        getData() {
            var that = this;
            that.$axios
                .post(process.env.API_HOST + "accountConfig")
                .then(res => {
                    // console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            that.name = res.data.data.username;
                            that.accountType = res.data.data.withdraw_method;
                            for (var i in that.accountType) {
                                if (that.accountType[i].name == "支付宝") {
                                    that.seleVal = that.accountType[i].value;
                                    break;
                                }
                            }
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 提现方式弹框
        showPop() {
            mui("#sheet").popover("toggle");
        },
        seleTypeFn(val) {
            mui("#sheet").popover("toggle");
            var that = this;
            for (var i in that.accountType) {
                if (that.accountType[i].value == val) {
                    that.seleVal = that.accountType[i].value;
                    that.seleType = that.accountType[i].name;
                    break;
                }
            }
        },
        // 是否阅读合同
        isAgree() {
            this.protocol = !this.protocol;
        },
        getProtocol() {
            var that = this;
            that.$axios.post(process.env.API_HOST + 'protocolReg').then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        that.proData.isShow = true;
                        that.proData.con = res.data.data;
                        that.proData.val = true;
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        isProFn(flag) {
            var that = this;
            if (flag) {
                that.protocol = true;
            }
        },
        addInfo() {
            var that = this;
            var request = {};
            if (that.seleVal == 1) {
                if (that.bank_num == "") {
                    mui.toast("请填写银行卡号", { duration: "short", type: "div" });
                    return false;
                }
                if (that.bank_text == "") {
                    mui.toast("请填写开户行名称", { duration: "short", type: "div" });
                    return false;
                }
                request.account = that.bank_num;
                request.open_bank = that.bank_text;
            } else if (that.seleVal == 2) {
                if (that.zfb == "") {
                    mui.toast("请填写支付宝账号", { duration: "short", type: "div" });
                    return false;
                }
                request.account = that.zfb;
            }
            if (that.protocol) {
                that.showLoading = true;
                request.withdraw_method = that.seleVal;//提现方式

                that.$axios.post(process.env.API_HOST + "addAccount", request).then((res) => {
                    // console.log(res);
                    that.showLoading = false;
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            mui.toast(res.data.msg, { duration: "short", type: "div" });
                            that.$router.go(-1);
                        } else {
                            mui.toast(res.data.msg, { duration: "short", type: "div" });
                        }
                    }
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                mui.toast("请阅读并同意《看个号手机网游平台协议》", { duration: "short", type: "div" });
            }
        }
    }
};
</script>
<style scoped>
.userauthentic-content {
    font-size: 0.26rem;
    color: #333333;
    padding: 0.2rem;
}
.add-card {
    text-align: center;
}
.add-card img {
    width: 1.57rem;
    height: 1.26rem;
    margin: 3rem 0 0.5rem;
}
.go-authentic {
    width: 1.5rem;
    line-height: 0.44rem;
    font-size: 0.22rem;
    background: #ffa303;
    color: #ffffff;
    padding: 0.05rem 0;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    -webkit-box-shadow: 0 1px 2px #fe7649;
    -moz-box-shadow: 0 1px 2px #fe7649;
    box-shadow: 0 1px 2px #fe7649;
    margin: 0.2rem auto 0;
}

.manange-card {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
}
.manange-top {
    line-height: 0.7rem;
    border-bottom: 0.01rem solid #e5e5e5;
}
.manange-top span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
}
.manange-top img {
    width: 0.08rem;
    height: 0.25rem;
    margin-left: 0.17rem;
    vertical-align: middle;
}
.manange-content {
    padding-left: 0.2rem;
}
.manange-strip {
    line-height: 0.9rem;
    font-size: 0.26rem;
    border-bottom: 0.01rem solid #e5e5e5;
    position: relative;
}
.manange-strip span {
    display: inline-block;
}
.manange-left {
    width: 1.2rem;
    font-size: 0.26rem;
    color: #666666;
}
.manange-left-z {
    width: 1.5rem;
    font-size: 0.26rem;
    color: #666666;
}
.card-type {
    width: 1.4rem;
}
.hint-right {
    width: 3rem;
    line-height: 0.3rem;
    position: absolute;
    right: 0.2rem;
    top: 0.15rem;
}
.red-color {
    font-size: 0.24rem;
}
.right-strip {
    color: #999999;
    position: absolute;
    right: 0.2rem;
    top: 0;
}
.right-strip img {
    width: 0.13rem;
    height: 0.24rem;
    margin-left: 0.17rem;
    vertical-align: middle;
}
.right-strip span {
    vertical-align: middle;
}

/* 协议 */
.protocol {
    margin: 0 0 0.2rem;
    padding: 0 0.2rem;
}
.protocol img {
    width: 0.28rem;
    height: 0.28rem;
    vertical-align: middle;
}
.protocol div {
    display: inline-block;
    font-size: 0.22rem;
}
/* 提交申请 */
.okBtn {
    color: #ffffff;
    font-size: 0.28rem;
    margin: 0.2rem auto 0;
    width: 6.5rem;
    text-align: center;
    line-height: 0.8rem;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    background: -webkit-linear-gradient(#fd915f, #ffa303);
    background: -o-linear-gradient(#fd915f, #ffa303);
    background: -moz-linear-gradient(#fd915f, #ffa303);
    background: linear-gradient(to right, #fd915f, #ffa303);
}

.card-num {
    width: 5rem;
}
/* ==========input========= */
input {
    font-size: 0.26rem;
    border: none;
    padding: 0;
    margin: 0;
    width: 2.65rem;
    line-height: 0.9rem;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
}
input[type="number"] {
    -moz-appearance: textfield;
}
::-webkit-input-placeholder {
    color: #999999;
    font-size: 0.26rem;
}
:-moz-placeholder {
    color: #999999;
    font-size: 0.26rem;
}
::-moz-placeholder {
    color: #999999;
    font-size: 0.26rem;
}
:-ms-input-placeholder {
    color: #999999;
    font-size: 0.26rem;
}

/* 弹框 */
.pop-view {
    margin-top: 10px;
    background: #ffffff;
    text-align: center;
    list-style: none;
}
.pop-view li {
    line-height: 0.9rem;
    border-bottom: 1px solid #e5e5e5;
}
.pop-view a {
    padding: 0;
}
</style>
