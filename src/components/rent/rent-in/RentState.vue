<template>
    <!-- 收货 -->
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="take-content">
            <!-- 商品详情 -->
            <div class="take-cell">
                <img class="badge" src="../../../../static/img/badge/rent-badge.png" alt />
                <div class="goods-info-top">
                    <img src="../../../../static/image/vertical.png" alt />
                    <span>订单详情</span>
                </div>
                <div class="goods-info-content">
                    <img :src="goodsInfo.game_logo" alt />
                    <div class="goods-info">
                        <div class="goods-info-title" v-text="goodsInfo.goods_title"></div>
                        <div class="goods-info-box">
                            <div class="goods-info-strip">
                                <div class="text-left">系统</div>
                                <div class="text-right" v-if="goodsInfo.client_id == 1">安卓</div>
                                <div class="text-right" v-else-if="goodsInfo.client_id == 2">苹果</div>
                                <div class="text-right" v-else-if="goodsInfo.client_id == 3">安卓混服</div>
                            </div>
                            <div class="goods-info-strip">
                                <div class="text-left">客户端</div>
                                <div class="text-right" v-text="goodsInfo.platform_name"></div>
                            </div>
                            <div class="goods-info-strip">
                                <div class="text-left">所在区服</div>
                                <div
                                    class="text-right"
                                    v-if="goodsInfo.server_name != null"
                                    v-text=" goodsInfo.area_name+'>'+goodsInfo.server_name"
                                ></div>
                                <div class="text-right" v-else v-text="goodsInfo.area_name"></div>
                            </div>
                            <div
                                class="goods-info-strip"
                                v-for="(item,index) in goodsInfo.goods_attribute"
                                :key="index"
                            >
                                <div class="text-left" v-text="item.title"></div>
                                <div class="text-right" v-text="item.value"></div>
                            </div>
                            <div class="goods-info-strip">
                                <div class="text-left">商品类型</div>
                                <div class="text-right" v-if="goodsInfo.rent_method == 1">成品号</div>
                                <div class="text-right" v-if="goodsInfo.rent_method == 2">租号</div>
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
                            src="../../../../static/img/copy.png"
                            alt
                            :data-clipboard-text="goodsInfo.order_sn"
                            @click="copyFn()"
                            id="copy"
                        />
                    </div>
                </div>
                <div class="goodsInfo">
                    <div class="goodsInfo-left">租期</div>
                    <div class="goodsInfo-right" v-text="goodsInfo.lease_time"></div>
                </div>
                <div class="goodsInfo">
                    <div class="goodsInfo-left">押金</div>
                    <div class="goodsInfo-right">
                        ￥
                        <span v-text="goodsInfo.cash"></span>
                    </div>
                </div>
                <div class="goodsInfo">
                    <div class="goodsInfo-left">
                        租金
                        <span class="gray-color">
                            (￥
                            <span v-text="goodsInfo.day_rent"></span>)
                        </span>
                    </div>
                    <div class="goodsInfo-right">
                        ￥
                        <span v-text="goodsInfo.rent_fee"></span>
                    </div>
                </div>
                <div class="goodsInfo">
                    <div class="goodsInfo-left">实际支付</div>
                    <div class="goodsInfo-right">
                        <span class="dominant-color">
                            ￥
                            <span v-text="goodsInfo.order_amount"></span>
                        </span>
                        <span class="green-color">已支付</span>
                    </div>
                </div>
            </div>
            <!-- 状态 -->
            <div class="take-status-img-cell">
                <img
                    v-for="(item,index) in takeData.takeTypeImg"
                    :key="index"
                    v-show="item.key == takeType"
                    :src="item.imgsrc"
                    alt
                />
            </div>
            <!-- 收货状态 -->
            <div class="take-cell">
                <div class="take-status-title">
                    <img src="../../../../static/image/vertical.png" alt />
                    <span>收货状态</span>
                    <span class="dominant-color take-status-hint" v-if="takeType == 2">（如果您已检验账号没有问题，请确认租号）</span>
                    <span class="gray-border" v-if="takeType == 4">已收号</span>
                    <span
                        class="award"
                        @click="goArbitration"
                        v-if=" goodsInfo.is_arbitrate == 1"
                    >申请仲裁</span>
                    <span class="award" @click="cancelArb" v-if=" goodsInfo.is_arbitrate == 2">取消仲裁</span>
                </div>
                <div class="take-cell-content">
                    <!-- 验货跳过 -->
                    <div class="cargo" v-if="takeType == 1" @click="verifyFn">申请验号</div>
                    <div class="cargo" v-if="takeType == 2" @click="agree">确认租号</div>
                    <div class="intie" v-if="takeType == 3">
                        <img src="../../../../static/img/order/speed.png" alt />
                        <span>客服正在火速为您办理租赁手续，请您</span>
                        <span class="orange-color" @click="goSign">前往签约</span>
                    </div>
                    <div
                        class="confirm-receipt"
                        v-if="takeType == 4 || takeType == 5 || takeType == 6 || takeType == 7"
                    >
                        <div class="rent-info">
                            <div class="rent-info-left">
                                <div class="rent-time">
                                    租赁起始时间：
                                    <span v-text="goodsInfo.rent_begin_time"></span>
                                </div>
                                <div class="rent-time">
                                    租赁截止时间：
                                    <span v-text="goodsInfo.rent_end_time"></span>
                                </div>
                            </div>
                            <div
                                class="rent-info-right dominant-bg"
                                v-if="takeType == 4 || takeType == 7"
                                @click="reletFn"
                            >续租</div>
                        </div>
                        <div class="account" v-if="takeType == 4 || takeType == 7">
                            <div class="accountText">
                                <span>游戏账号:</span>
                                <input v-model="goodsInfo.account" disabled="disabled" />
                            </div>
                            <div class="accountText">
                                <span>密码:</span>
                                <input
                                    class="ma"
                                    :type="passType?'type':'password'"
                                    v-model="goodsInfo.password"
                                    disabled="disabled"
                                />
                                <img
                                    :src="passType?'../../../../static/img/order/noSee.png':'../../../../static/img/order/see.png'"
                                    alt
                                    @click="seePasswordFn"
                                />
                            </div>
                        </div>
                        <div class="account text-center" v-if="takeType == 5 || takeType == 6">租号已完成</div>
                    </div>
                </div>
            </div>
            <div class="take-bottom">
                交易过程中，如有任何疑问，请及时
                <span class="dominant-color" @click="linkServer">咨询客服</span>
            </div>
        </div>
        <Protocal v-bind:proData="proData" v-on:isProFn="isProFn"></Protocal>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header"; //头部
// import OrderInfo from "@/components/buy/OrderInfo"; //订单信息
import Protocal from "@/components/multi/Protocal";//协议
export default {
    name: "RentState",
    components: {
        Header,
        Protocal,
        // OrderInfo
    },
    data() {
        return {
            head_data:{
                show_type:2,
                tit_text:"收货",
                right_icon:2,
            },
            proData: {
                isShow: false,
                con: "",
                btn: "同意并前往支付",
                val: ""
            },
            passType: false,
            goodsInfo: {},
            // 已收货状态 仲裁显示 **
            takeType: 3, //1-申请验货 2-确认交易 3-签约 4-发货
            takeData: {
                takeTypeImg: [
                    {
                        key: 1,
                        imgsrc: "./static/image/rent/buy/one.png"
                    },
                    {
                        key: 2,
                        imgsrc: "./static/image/rent/buy/two.png"
                    },
                    {
                        key: 3,//1&&2换绑
                        imgsrc: "./static/image/rent/buy/three.png"
                    },
                    {
                        key: 4,
                        imgsrc: "./static/image/rent/buy/four.png"
                    },
                    {
                        key: 5,
                        imgsrc: "./static/image/rent/buy/four.png"
                    }, {
                        key: 6,
                        imgsrc: "./static/image/rent/buy/four.png"
                    }, {
                        key: 7,
                        imgsrc: "./static/image/rent/buy/four.png"
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
            that.$axios.post(process.env.API_HOST + 'protocolRelet').then((res) => {   //contract_relet
                console.log(res);
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        that.proData.isShow = true;
                        that.proData.con = res.data.data;
                        that.proData.val = true;
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        isProFn(data) {
            var that = this;
            that.$router.push({ name: 'RentPlaceOrder', query: { order_id: that.goodsInfo.order_id } })
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
        // 申请验货
        verifyFn() {
            var that = this;
            that.$axios.post(process.env.API_HOST + 'verifyAccount', {
                order_id: that.goodsInfo.order_id
            }).then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        that.getData(that.goodsInfo.order_id, true);
                    }
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        // 确认租号
        agree() {
            var that = this;
            that.$axios.post(process.env.API_HOST + "buyerConfirmRent", {
                order_id: that.goodsInfo.order_id
            }).then((res) => {
                console.log(res);
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        mui.toast(res.data.msg, { duration: "short", type: "div" });
                        that.takeType = res.data.data.rent_status;
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
            that.$axios.post(process.env.API_HOST + "buyRentStatus", {    //buyer_rent_status
                order_id: order_id
            }).then((res) => {
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        that.goodsInfo = res.data.data;
                        that.takeType = that.goodsInfo.rent_status;
                        if (flag) {
                            this.$router.push({ name: 'Service' });
                        }
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        // 前往签约
        goSign() {
            this.$router.push({ name: 'Pact' })
        }
    },
    mounted() {
        var that = this;
        that.getData(that.$route.query.order)
    }
};
</script>
<style>
.take-content {
    padding: 0.2rem 0.2rem;
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
    position: relative;
}
.badge {
    width: 1.03rem;
    height: 1rem;
    position: absolute;
    top: 0;
    right: 0;
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
.take-status-hint{
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
    margin: 0 auto;
}
.intie {
    text-align: center;
}
.intie img {
    width: 0.25rem;
    height: 0.25rem;
    vertical-align: middle;
}
.intie span {
    vertical-align: middle;
}
.orange-color {
    color: #FFA303;
    text-decoration: underline;
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
.accountText img {
    width: 0.35rem;
    height: 0.22rem;
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
    color: #56c9ff;
    text-decoration: underline;
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

/* 续租 */
.rent-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.rent-time {
    color: #999999;
}
.rent-info-right {
    color: #ffffff;
    width: 1.1rem;
    line-height: 0.44rem;
    background: #FFA303;
    text-align: center;
    border-radius: 0.04rem;
    box-shadow: 1px 1px 3px 0px #FFA303;
}

/* ==========input========= */
.accountText input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.26rem;
    border: none;
    width: 3rem;
    height: 0.6rem;
    background: #f6f6f6;
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

.accountText .ma{
    width: 50%;
}
</style>
