<template>
    <!-- 收货 -->
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="take-content">
            <!-- 商品详情 -->
            <div class="take-cell">
                <div class="goods-info-top">
                    <img src="../../../static/image/vertical.png" alt />
                    <span>订单详情</span>
                </div>
                <div class="goods-info-content">
                    <img :src="goodsInfo.game_logo" alt />
                    <div class="goods-info">
                        <div class="goods-info-title" v-text="goodsInfo.goods_title"></div>
                        <div class="goods-info-box">
                            <div class="goods-info-strip">
                                <div class="text-left">交易链接</div>
                                <a
                                    class="t_link"
                                    target="view_window"
                                    :href="goodsInfo.link_href"
                                    v-text="goodsInfo.link_href"
                                ></a>
                            </div>
                            <div class="goods-info-strip">
                                <div class="text-left">官方交易价格</div>
                                <div class="text-right">
                                    ￥
                                    <span v-text="goodsInfo.goods_amount"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 订单号，分期情况，实际支付 -->
            <div class="take-cell">
                <div class="goodsInfo">
                    <div class="goodsInfo-left">订单号</div>
                    <div class="goodsInfo-right">
                        <span v-text="goodsInfo.order_sn"></span>
                        <img
                            class="copy-img"
                            src="../../../static/img/copy.png"
                            alt
                            :data-clipboard-text="goodsInfo.order_sn"
                            @click="copyFn()"
                            id="copy"
                        />
                    </div>
                </div>
                <div class="stage-info">
                    <div class="goodsInfo-left">分期情况</div>
                    <div class="goodsInfo-right" v-text="goodsInfo.stage_type"></div>
                    <div class="stage-box">
                        <div
                            class="calputer-bot-box"
                            v-for="(item,index) in goodsInfo.stage_info"
                            :key="index"
                        >
                            <span class="calputer-bot-left" v-text="item.stage_title"></span>
                            <span class="calputer-bot-right" v-text="item.stage_value"></span>
                        </div>
                    </div>
                </div>
                <div class="goodsInfo">
                    <div class="goodsInfo-left">实际支付</div>
                    <div class="goodsInfo-right">
                        <span class="red-color">
                            ￥
                            <span v-text="goodsInfo.payment_amount"></span>
                        </span>
                        <span class="green-color">已支付</span>
                    </div>
                </div>
            </div>
            <!-- 状态 -->
            <div class="take-status-img-cell">
                <img
                    v-for="item in takeData.takeTypeImg"
                    v-show="item.key == takeType"
                    :src="item.imgsrc"
                    alt
                />
            </div>
            <!-- 收货状态 -->
            <div class="take-cell">
                <div class="take-status-title">
                    <img src="../../../static/image/vertical.png" alt />
                    <span>收货状态</span>
                    <span class="gray-border" v-if="goodsInfo.is_end == 1">已收货</span>
                    <span
                        class="award"
                        @click="goArbitration"
                        v-if=" goodsInfo.is_arbitrate == 1"
                    >申请仲裁</span>
                    <span class="award" @click="cancelArb" v-if=" goodsInfo.is_arbitrate == 2">取消仲裁</span>
                </div>
                <div class="take-cell-content">
                    <!-- 验货跳过 -->
                    <div v-if="takeType == 1">
                        <div class="intie">为保证您在此次交易中的信息真实性，请先进行实名认证</div>
                        <div class="cargo maxcargo" @click="identifyFn">前往实名认证</div>
                    </div>
                    <div v-if="takeType == 2 || takeType == 5">
                        <div class="intie">客服正在为您草拟合同，请稍候片刻！</div>
                        <div class="cargo" v-if="takeType == 5" @click="verifyFn">前往签约</div>
                    </div>
                    <div class="intie" v-if="takeType == 3">
                        <img class="rocket" src="../../../static/img/order/speed.png" alt />
                        <span>客服正在为您购买账号，购买成功后，客服会与您取得联系</span>
                    </div>
                    <div class="intie" v-if="takeType == 4">
                        <div v-if="goodsInfo.is_end == 2">客服已发货，请您尽快确认收货</div>
                        <div v-if="goodsInfo.is_end == 2" class="small-font">（24小时内未操作，则自动确认收货）</div>
                        <div class="account" v-if="takeType == 4">
                            <div class="accountText">
                                <span>游戏账号:</span>
                                <input v-model="goodsInfo.account" disabled="disabled" />
                            </div>
                            <div class="accountText">
                                <span>密码:</span>
                                <input
                                    :type="passType?'type':'password'"
                                    v-model="goodsInfo.password"
                                    disabled="disabled"
                                />
                                <img
                                    class="see"
                                    :src="passType?'../../../static/img/order/noSee.png':'../../../static/img/order/see.png'"
                                    alt
                                    @click="seePasswordFn"
                                />
                            </div>
                            <div class="cargo" v-if="goodsInfo.is_end == 2" @click="endTrade">确认收货</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="take-bottom">
                交易过程中，如有任何疑问，请及时
                <span class="red-color dominant-color" @click="linkServer">咨询客服</span>
            </div>
        </div>
        <Protocal v-bind:proData="proData" v-on:isProFn="isProFn"></Protocal>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header"; //头部
import Protocal from "@/components/multi/Protocal";//协议
export default {
    name: "RentState",
    components: {
        Header,
        Protocal,
    },
    data() {
        return {
            head_data:{
                tit_text:'收货',
                right_icon:2,
                show_type:2,
            },
            proData: {
                isShow: false,
                con: "",
                btn: "确认已读",
                val: ""
            },
            passType: false,
            goodsInfo: {},
            // 已收货状态 仲裁显示 **
            takeType: '', //1 认证 2签约 3  4确认

            takeData: {
                takeTypeImg: [
                    {
                        key: 1,
                        imgsrc: "./static/image/cbg/one.png"
                    },
                    {
                        key: 2,//签约 没合同
                        imgsrc: "./static/image/cbg/two.png"
                    },
                    {
                        key: 5,//签约 待签
                        imgsrc: "./static/image/cbg/two.png"
                    },
                    {
                        key: 3,//1&&2换绑
                        imgsrc: "./static/image/cbg/three.png"
                    },
                    {
                        key: 4,
                        imgsrc: "./static/image/cbg/four.png"
                    },
                ],
                gamePrint: 8,
                account: "",
                password: ""
            }
        };
    },
    methods: {
        linkServer(){
            this.$router.push({ name: 'Service' });
        },
        // 续租
        reletFn() {
            var that = this;
            that.proData.isShow = true;
            that.proData.val = true;
        },
        isProFn(data) {
            console.log(data);
            // 跳下单--------------------------------------------
        },
        copyFn() {
            let that = this;
            let clipboard = new ClipboardJS("#copy");
            clipboard.on("success", function (e) {
                clipboard.destroy();
                mui.toast("复制成功", { duration: "short", type: "div" });
            });
            clipboard.on("error", function (e) {
                clipboard.destory();
                mui.toast("请重新点击复制", { duration: "short", type: "div" });
            });
        },
        // 查看密码
        seePasswordFn() {
            this.passType = !this.passType;
        },
        identifyFn() {
            this.$router.push({ name: 'SafeCard' })
        },
        // 申请验货
        verifyFn() {
            this.$router.push({ name: 'Signature' })
        },
        // 确认交易
        agree() {
            var that = this;
            that.$axios.post(process.env.API_HOST + "agreeTrade", {
                order_id: that.goodsInfo.order_id
            }).then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        mui.toast(res.data.msg, { duration: "short", type: "div" });
                        that.takeType = res.data.data.bind_status;
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        // 确认收货
        endTrade() {
            var that = this;
            that.$axios.post(process.env.API_HOST + "endStore", {
                order_id: that.goodsInfo.order_id
            }).then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        mui.toast(res.data.msg, { duration: "short", type: "div" });
                        that.getData(that.$route.query.order);
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        // 申请仲裁
        goArbitration() {
            this.$router.push({ name: 'Arbitration', query: { order: this.goodsInfo.order_id } });
        },
        // 取消仲裁
        cancelArb() {
            var that = this;
            that.$axios.post(process.env.API_HOST + 'cancelArbitrate', {
                order_id: that.goodsInfo.order_id
            }).then((res) => {
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        mui.toast(res.data.msg, { duration: "short", type: "div" });
                        that.getData(that.goodsInfo.order_id);
                    }
                }
            })
        },
        getData(order_id, flag) {
            var that = this;
            that.$axios.post(process.env.API_HOST + "buyStoreStatus", {
                order_id: order_id
            }).then((res) => {
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        that.goodsInfo = res.data.data;
                        if (that.goodsInfo.is_identify == 1) {
                            if (that.goodsInfo.is_bind == 1) {
                                if (that.goodsInfo.store_status == 1) {
                                    if (that.goodsInfo.is_end == 1) {
                                        that.takeType = 4;//确认收货
                                    } else {
                                        that.takeType = 4;//确认收货
                                    }
                                } else {
                                    that.takeType = 3;//采购
                                }
                            } else if (that.goodsInfo.is_bind == 2) {
                                that.takeType = 2;//签约 -- 没合同
                            } else if (that.goodsInfo.is_bind == 3) {
                                that.takeType = 5;//签约 -- 待签
                            }
                        } else {
                            that.takeType = 1;//实名认证
                        }
                        if (flag) {
                            that.$router.push({ name: 'Service' });
                        }
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    mounted() {
        var that = this;
        that.getData(that.$route.query.order)
    }
};
</script>
<style scoped>
.take-content {
    padding: 0.2rem 0.2rem 0;
}
.take-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
}
.take-cell .goodsInfo:nth-last-child(1) {
    border: none;
}
.goodsInfo {
    line-height: 0.9rem;
    border-bottom: 0.01rem solid #e5e5e5;
    margin-left: 0.2rem;
    padding-right: 0.2rem;
}
.goodsInfo-left,
.goodsInfo-right {
    display: inline-block;
    font-size: 0.26rem;
}
.goodsInfo-left {
    color: #666666;
}

.goodsInfo-right {
    color: #333333;
    float: right;
}
.blue-color {
    color: #4ac0f4;
    font-size: 0.28rem;
    margin-left: 0.1rem;
}
.green-color {
    color: #ffffff;
    background: #45c773;
    text-align: center;
    font-size: 0.2rem;
}
.red-color {
    /* color: #ff5e5e !important; */
}
.take-status-img-cell {
    text-align: center;
    width: 6.39rem;
    height: 0.95rem;
    margin: 0.2rem auto;
}
.take-status-img-cell img {
    width: 6.39rem;
    height: 0.95rem;
}

.take-status-title {
    line-height: 0.7rem;
    border-bottom: 0.01rem solid #e5e5e5;
}

.take-status-title span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
    margin-right: 0.2rem;
}
.take-status-title .red-color {
    font-size: 0.24rem;
}
.take-status-title img {
    width: 0.08rem;
    height: 0.25rem;
    margin-left: 0.17rem;
    vertical-align: middle;
    border-radius: 0.1rem;
}
.take-cell-content {
    font-size: 0.26rem;
    color: #666666;
    padding: 0.35rem 0.2rem;
}
.cargo {
    width: 1.1rem;
    color: #ffffff;
    line-height: 0.44rem;
    text-align: center;
    background: #fe7649;
    font-size: 0.22rem;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    margin: 0.2rem auto 0;
}
.maxcargo {
    width: 1.7rem;
}
.account {
    background: #f6f6f6;
    padding: 0.2rem 0.15rem;
    margin: 0.2rem 0;
}
.text-center {
    text-align: center;
}
.accountText {
    line-height: 0.5rem;
    color: #333333;
}
.accountText span {
    width: 1.3rem;
    display: inline-block;
    text-align: right;
    padding-right: 0.1rem;
    color: #666666;
}
.see {
    width: 0.35rem;
    height: 0.22rem;
}
.accountText input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.26rem;
    border: none;
    width: 3rem;
    height: 0.6rem;
    background: #f6f6f6;
}
.intie {
    text-align: center;
}
.rocket {
    width: 0.25rem;
    height: 0.25rem;
    vertical-align: middle;
}
.intie span {
    vertical-align: middle;
}
.confirm-title {
    margin-bottom: 0.2rem;
}
.confirm-title span {
    color: #999999;
}
.confirm-title .red-color {
    text-decoration: underline;
}
.account {
    background: #f6f6f6;
    /* -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem; */
    padding: 0.2rem 0.15rem;
    margin: 0.2rem 0;
}

.take-bottom {
    font-size: 0.24rem;
    color: #999999;
    text-align: center;
    margin-bottom: 0.3rem;
}
.take-bottom span {
    text-decoration: underline;
}
.take-status-title .gray-border {
    border: 1px solid #b5b5b5;
    padding: 1px 3px;
    font-size: 0.2rem;
    text-align: center;
    line-height: 0.35rem;
    -webkit-border-radius: 0.18rem;
    -moz-border-radius: 0.18rem;
    border-radius: 0.18rem;
    color: #999999;
}
.take-status-title .award {
    float: right;
    font-size: 0.24rem;
    color: #999999;
}
.copy-img {
    width: 0.2rem;
    height: 0.24rem;
}
.gray-color {
    color: #999999;
}

/* 订单详情 */
.goods-info-top {
    line-height: 0.7rem;
    border-bottom: 0.01rem solid #e5e5e5;
}

.goods-info-top span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
    vertical-align: middle;
}
.goods-info-top img {
    width: 0.08rem;
    height: 0.25rem;
    margin: 0 0 0 0.17rem;
    vertical-align: middle;
    vertical-align: middle;
    border-radius: 0.1rem;
}
.goods-info-content {
    padding: 0.2rem 0;
    font-size: 0.26rem;
    color: #666666;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.goods-info-content img {
    width: 1.1rem;
    height: 1.1rem;
    margin: 0 0 0 0.35rem;
}
.goods-info {
    width: 70%;
}
.goods-info-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333333;
    margin-bottom: 0.15rem;
}
.goods-info-strip {
    display: flex;
    align-items: top;
}
.text-left {
    min-width: 1.1rem;
    margin-right: 0.3rem;
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

.t_link {
    color: #999999;
    text-decoration: underline;
    overflow: hidden; /*超出的部分隐藏起来。*/
    white-space: nowrap; /*不显示的地方用省略号...代替*/
    text-overflow: ellipsis; /* 支持 IE */
}
.stage-info {
    line-height: 0.9rem;
    margin-left: 0.2rem;
    padding-right: 0.2rem;
}
.stage-box {
    background: #f6f6f6;
    line-height: 0.5rem;
    font-size: 0.24rem;
    color: #999999;
}
.calputer-bot-box {
    line-height: 0.5rem;
    display: flex;
    justify-content: space-around;
}
.calputer-bot-box span {
    display: inline-block;
}
.calputer-bot-right {
    color: #666666;
}
.calputer-bot-left {
    color: #999999;
    min-width: 1rem;
    margin-right: 0.3rem;
}
.small-font {
    font-size: 0.22rem;
    color: #999999;
}
</style>
