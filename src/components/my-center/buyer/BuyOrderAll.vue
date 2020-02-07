<template>
    <div class="wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="orderAll-content">
            <div class="orderAll-cell">
                <div class="orderAll-strip" @click="toLink('wait')">
                    <span class="orderAll-lefttext">未支付</span>
                    <span class="num">
                        (
                        <span v-text="trade_wait"></span>)
                    </span>
                    <div class="right-opt">
                        <img src="../../../../static/img/order/next.png" alt />
                    </div>
                </div>
                <div class="orderAll-strip" @click="toLink('trading')">
                    <span class="orderAll-lefttext">交易中</span>
                    <span class="num">
                        (
                        <span v-text="trading"></span>)
                    </span>
                    <div class="right-opt">
                        <img src="../../../../static/img/order/next.png" alt />
                    </div>
                </div>
                <div class="orderAll-strip" @click="toLink('confirm')">
                    <span class="orderAll-lefttext">待确认收货</span>
                    <span class="num">
                        (
                        <span v-text="trade_confirm"></span>)
                    </span>
                    <div class="right-opt">
                        <img src="../../../../static/img/order/next.png" alt />
                    </div>
                </div>
                <div class="orderAll-strip" @click="toLink('arbitrate')">
                    <span class="orderAll-lefttext">仲裁中</span>
                    <span class="num">
                        (
                        <span v-text="trade_arbitrate"></span>)
                    </span>
                    <div class="right-opt">
                        <img src="../../../../static/img/order/next.png" alt />
                    </div>
                </div>
                <div class="orderAll-strip" @click="toLink('success')">
                    <span class="orderAll-lefttext">交易成功</span>
                    <span class="num">
                        (
                        <span v-text="trade_success"></span>)
                    </span>
                    <div class="right-opt">
                        <img src="../../../../static/img/order/next.png" alt />
                    </div>
                </div>
                <div class="orderAll-strip" @click="toLink('fail')">
                    <span class="orderAll-lefttext">交易失败</span>
                    <span class="num">
                        (
                        <span v-text="trade_fail"></span>)
                    </span>
                    <div class="right-opt">
                        <img src="../../../../static/img/order/next.png" alt />
                    </div>
                </div>
            </div>
        </div>
        <Loading v-show="showLoading"></Loading>
    </div>
</template>
<script>
import Header from '@/components/home-page/Header'
import Loading from "@/components/multi/Loading"
export default {
    name: 'BuyOrderAll',
    components: {
        Header,Loading
    },
    data() {
        return {
            comData: {
                head_data: {
                    show_type: 2,
                    right_icon: 2,
                    tit_text: "买家订单",
                }
            },
            trade_arbitrate: '',
            trade_confirm: '',
            trade_fail: '',
            trade_success: '',
            trade_wait: '',
            trading: '',
            showLoading:true,
        }
    },
    methods: {
        toLink(flag) {
            var that_r = this.$router;
            if (flag == "trading") {
                //交易中
                that_r.push({ name: "BuyTradingStatus" });
            } else if (flag == "confirm") {
                //待确认收货
                that_r.push({ name: "BuyWaitReceiveStatus" });
            } else if (flag == "success") {
                //交易成功
                that_r.push({ name: "BuyTradeSuccessStatus" });
            } else if (flag == "fail") {
                //交易失败
                that_r.push({ name: "BuyFailureDealStatus" });
            } else if (flag == "arbitrate") {
                //仲裁中
                that_r.push({ name: "BuyArbitrationStatus" });
            } else if (flag == "wait") {
                //未支付
                that_r.push({ name: "BuyUnpaidStatus" });
            }
        },

        getData() {
            var that = this;
            that.$axios.post(process.env.API_HOST + "buyerOrder").then((res) => {
                // console.log(res)
                if (res.status == 200) {
                    that.showLoading = false;
                    if (res.data.code == 200) {
                        var data = res.data.data;
                        that.trade_arbitrate = data.trade_arbitrate;
                        that.trade_confirm = data.trade_confirm;
                        that.trade_fail = data.trade_fail;
                        that.trade_success = data.trade_success;
                        that.trade_wait = data.trade_wait;
                        that.trading = data.trading;
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    mounted() {
        var that = this;
        that.getData();
    }
}
</script>
<style scoped>
.orderAll-content {
    padding: 0.2rem;
}
.orderAll-cell {
    padding-left: 0.2rem;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
}

.orderAll-strip {
    font-size: 0.26rem;
    color: #666666;
    border-bottom: 0.01rem solid #e5e5e5;
    padding-right: 0.2rem;
}
.orderAll-lefttext {
    margin-right: 0.1rem;
    line-height: 0.9rem;
    display: inline-block;
}
.right-opt {
    text-align: right;
    float: right;
    line-height: 0.9rem;
}
.right-opt img {
    width: 0.13rem;
    height: 0.24rem;
}
.num {
    color: #999999;
    font-size: 0.26rem;
}
</style>
