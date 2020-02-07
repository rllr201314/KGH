<template>
    <!-- 下单 -->
    <div class="wrap">
        <!-- 头部 -->
        <Header v-bind:head_data="head_data"></Header>
        <div class="placeOrder-content">
            <!-- 商品详情 -->
            <div class="placeOrder-cell">
                <img class="badge" src="../../../static/img/badge/cbg-badge.png" alt />
                <div class="goods-info-top">
                    <img src="../../../static/img/goodscreen/vertical.png" alt />
                    <span>订单详情</span>
                </div>
                <div class="goods-info-content">
                    <img :src="goodsInfo.game_logo" alt />
                    <div class="goods-info">
                        <div class="goods-info-title" v-text="goodsInfo.goods_title"></div>
                        <div class="goods-info-box">
                            <div class="goods-info-left">交易链接</div>
                            <a
                                class="t_link"
                                target="view_window"
                                :href="goodsInfo.link_href"
                                v-text="goodsInfo.link_href"
                            ></a>
                        </div>
                        <div class="goods-info-box">
                            <div class="goods-info-left">
                                <div>官方交易价格</div>
                                <div>分期方式</div>
                                <!-- <div>首付</div> -->
                                <div>期数</div>
                            </div>
                            <div class="goods-info-right">
                                <div>
                                    <span v-text="goodsInfo.goods_amount"></span>元
                                </div>
                                <div v-if="goodsInfo.stage_type == 1">日分期</div>
                                <div v-else-if="goodsInfo.stage_type == 2">月分期</div>
                                <!-- <div v-text="goodsInfo.payment_amount"></div> -->
                                <div v-if="goodsInfo.stage_type == 1">不限</div>
                                <div v-else-if="goodsInfo.stage_type == 2">
                                    <span v-text="goodsInfo.several_stages"></span>期
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="stage-info">
                    <div
                        class="stage-box"
                        v-for="(item,index) in goodsInfo.stageInfo"
                        :key="index"
                    >
                        <span class="calputer-bot-left" v-text="item.stage_title"></span>
                        <span class="calputer-bot-right" v-text="item.stage_value"></span>
                    </div>
                </div>
            </div>
            <!-- 订单详情 -->
            <div class="placeOrder-cell">
                <div class="contact-content">
                    <div class="contact-cell">
                        <span class="celltext">服务费</span>
                        <div class="cell-right">
                            <span class="unit-price price">
                                ￥
                                <span v-text="goodsInfo.other_charge"></span>
                            </span>
                        </div>
                    </div>
                    <div class="contact-cell">
                        <span class="celltext">首付金额</span>
                        <div class="cell-right">
                            <span class="unit-price price">
                                ￥
                                <span v-text="goodsInfo.deposit_price"></span>
                            </span>
                        </div>
                    </div>
                    <div class="contact-cell">
                        <div class="cell-right">
                            <div class="total-price price">
                                实际支付：
                                <span class="red-color" v-text="goodsInfo.payment_amount"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="protocol">
            <img
                :src="protocol?'../../../static/img/goodscreen/okcheck.png':'../../../static/img/goodscreen/nocheck.png'"
                alt
                @click="lookFn"
            />
            <div>
                我已阅读
                <span class="red-color" @click="getProtocol">《看个号平台交易协议》</span>
            </div>
        </div>
        <Protocal v-bind:proData="proData" v-on:isProFn="isProFn"></Protocal>
        <div class="nextBtn" @click="goPayFn">下一步</div>

        <!-- 遮罩 -->
        <div class="orderShade" v-show="showOrderShade" @click="hiddenFn"></div>
        <Loading class="black-bg" v-if="showNoData"></Loading>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header"; //头部
import Loading from "@/components/multi/Loading";
import Protocal from "@/components/multi/Protocal";

export default {
    name: "CbgPlaceOrder",
    components: {
        Header,
        Loading,
        Protocal
    },
    data() {
        return {
            head_data: {
                show_type: 2,
                right_icon: 2,
                tit_text: '商品下单',
            },
            proData: {
                isShow: false,
                con: "",
                btn: "确认已读",
                val: ""
            },
            showPro: false,//是否显示协议
            protocalText: '',//协议
            protocol: true, //阅读协议
            showNoData: true,
            showOrderShade: false, //遮罩
            totalPrice: null,
            goodsInfo: {}
        };
    },
    methods: {
        // 隐藏遮罩
        hiddenFn() {
            this.showOrderShade = false;
        },
        // 协议
        getProtocol() {
            var that = this;
            that.$axios.post(process.env.API_HOST + 'protocolSafe').then((res) => {
                // console.log(res);
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
        isProFn(flag) {
            var that = this;
            if (flag) {
                that.protocol = true;
            }
        },
        // 阅读协议
        lookFn() {
            this.protocol = !this.protocol;
        },
        getData() {
            var that = this;
            that.$axios
                .post(process.env.API_HOST + "storeFee", {
                    order_id: that.$route.query.order_id
                })
                .then(res => {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            that.goodsInfo = res.data.data;
                            that.showNoData = false;
                        } else if (res.data.code == 400) {
                            that.showNoData = true;
                            mui.alert(res.data.msg, '提示', '确认', function () {
                                that.$router.go(-1);
                            }, 'div')
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        goPayFn() {
            var that = this;
            // 判断是否勾选协议
            if (!that.protocol) {
                mui.alert("请阅读并同意《看个号平台交易协议》", "提示", "确定", "", "div");
                return false;
            }
            var all = {};
            all.pay_type = 8;//藏宝阁
            all.order_id = that.$route.query.order_id;
            var order_info = JSON.stringify(all);
            sessionStorage.info = order_info;
            that.$router.push({ name: 'Pay', params: { info: order_info } });
        }
    },
    mounted() {
        var that = this;
        that.showNoData = false;
        if (that.$route.query.order_id != "" && that.$route.query.order_id != undefined) {
            that.getData();
        } else {
            that.$router.go(-1);
        }
    }
};
</script>
<style scoped>
.placeOrder-content {
    padding: 0.2rem 0.2rem 0;
}
/* 商品信息 */
.placeOrder-cell {
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
.goods-info-top {
    line-height: 0.7rem;
    border-bottom: 0.01rem solid #e5e5e5;
}

.goods-info-top span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
}
.goods-info-top img {
    width: 0.13rem;
    height: 0.29rem;
    margin-left: 0.17rem;
    vertical-align: middle;
}

.goods-info-content {
    padding: 0.2rem 0;
    font-size: 0.26rem;
    color: #666666;
}
.goods-info-content img {
    width: 1.1rem;
    height: 1.1rem;
    margin: 0 0.6rem 0 0.35rem;
    vertical-align: middle;
}
.goods-info {
    display: inline-block;
    width: 4.8rem;
    vertical-align: middle;
}
.goods-info-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333333;
    margin-bottom: 0.15rem;
}
.goods-info-box {
    display: flex;
}
.goods-info-left {
    width: 40%;
    overflow: hidden;
}
.goods-info-left div {
    margin-bottom: 0.1rem;
    white-space: nowrap;
}
.goods-info-right div {
    margin-bottom: 0.1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #333333;
}
.contact-content {
    padding-left: 0.2rem;
}
.contact-cell {
    line-height: 0.9rem;
    border-bottom: 0.01rem solid #e5e5e5;
    padding-right: 0.2rem;
}
.contact-cell::after {
    display: block;
    clear: both;
    content: "";
}
.inpright input {
    width: 70%;
    text-align: right;
    border: 0;
    margin: 0;
    height: 0.9rem;
    float: right;
}
.celltext {
    color: #666666;
    font-size: 0.26rem;
    display: inline-block;
    min-width: 1.35rem;
}

.contact-bottom {
    padding: 0.17rem;
    font-size: 0.24rem;
}
.red-color {
    color: #ff5e5e !important;
}

/*  */
.cell-right {
    float: right;
}
/* 价格 */
.price {
    font-size: 0.26rem;
    color: #333333;
}

/* 商品数量 */
.raise-good input {
    width: 0.8rem;
    height: 0.42rem;
    padding: 0 0.05rem;
    outline: none;
    border: 0.01rem solid #d2d2d2;
    vertical-align: middle;
    margin: 0 0.2rem;
}
.raise-good img {
    width: 0.29rem;
    height: 0.29rem;
    vertical-align: middle;
}
/*  */
.order-cell {
    border-bottom: 0.01rem solid #e5e5e5;
    padding: 0.2rem 0.2rem 0.2rem 0;
}
/* 优惠券 */
.descount img {
    width: 0.13rem;
    height: 0.24rem;
    vertical-align: middle;
}
.grey-color {
    color: #666666;
    font-size: 0.24rem;
}
.gray-color {
    color: #999999;
    font-size: 0.24rem;
}
.periodsNum {
    min-width: 0.8rem;
    color: #333333;
    display: inline-block;
}
/* 选项 */
.sele-opera {
    width: 5rem;
    display: inline-block;
}
.opera {
    display: inline-block;
    margin-right: 0.7rem;
}
.opera img {
    width: 0.22rem;
    height: 0.22rem;
    vertical-align: middle;
}
.opera span {
    font-size: 0.26rem;
    color: #333333;
    vertical-align: middle;
}
/* 首付金额 */
.downPay-left {
    margin-top: 0.1rem;
}
.downPay-left,
.downPay-right {
    vertical-align: top;
}
.downPay-right input {
    width: 3rem;
    height: 0.5rem;
    margin: 0;
    padding: 0 0.1rem;
}
.custom {
    color: #ffffff;
    font-size: 0.26rem;
    background: #fc5f4e;
    display: inline-block;
    margin-left: 0.5rem;
    width: 0.8rem;

    text-align: center;
}
.sele-downPay {
    line-height: 0.5rem;
    color: #333333;
    font-size: 0.24rem;
    border: 0.01rem solid #d2d2d2;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
    padding: 0 0.15rem;
    display: inline-block;
    margin-bottom: 0.2rem;
}
.sele-downPay span {
    margin-right: 0.5rem;
    vertical-align: middle;
}
.sele-downPay img {
    width: 0.2rem;
    height: 0.1rem;
    vertical-align: middle;
}
.sole {
    color: #333333;
    font-size: 0.26rem;
    margin-left: 0.1rem;
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
/* 下一步 */
.nextBtn {
    color: #ffffff;
    font-size: 0.28rem;
    margin: 0 auto 0.3rem;
    width: 6.5rem;
    text-align: center;
    line-height: 0.8rem;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    background: -webkit-linear-gradient(#fd915f, #fc534a);
    background: -o-linear-gradient(#fd915f, #fc534a);
    background: -moz-linear-gradient(#fd915f, #fc534a);
    background: linear-gradient(to right, #fd915f, #fc534a);
}

.hint {
    font-size: 0.22rem;
}

.orderShade {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 8;
}

/* ==========input========= */
input {
    font-size: 0.24rem;
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
    font-size: 0.24rem;
}
:-moz-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
::-moz-placeholder {
    color: #999999;
    font-size: 0.24rem;
}
:-ms-input-placeholder {
    color: #999999;
    font-size: 0.24rem;
}

.black-bg {
    background: rgba(255, 255, 255, 1);
}
.stage-info {
    padding: 0 0.2rem 0.2rem;
}

.stage-box {
    background: #f6f6f6;
    line-height: 0.5rem;
    font-size: 0.24rem;
    color: #999999;
    display: flex;
    justify-content: space-around;
    line-height: 0.5rem;
}
.t_link {
    color: #999999;
    text-decoration: underline;
    max-width: 3rem;
    overflow: hidden; /*超出的部分隐藏起来。*/
    white-space: nowrap; /*不显示的地方用省略号...代替*/
    text-overflow: ellipsis; /* 支持 IE */
}
</style>
