<template>
    <!-- 已发货 -->
    <div class="wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="wait-content">
            <div class="wait-cell" v-for="item in goodsData">
                <div class="gameLog">
                    <img :src="item.game_logo" alt />
                </div>
                <div class="orderInfo">
                    <div class="order-num">
                        <span>订单号</span>
                        <span v-text="item.orderNum"></span>
                        <span class="history-time" v-text="item.create_time"></span>
                    </div>
                    <div class="order-des" v-text="item.goods_title"></div>
                    <div class="price-status">
                        <span class="good-price">
                            ￥
                            <span v-text="item.goods_amount"></span>
                        </span>
                        <span class="order-status">待收货</span>
                    </div>
                </div>
                <div class="order-operate">
                    <div class="left-operate">
                        <img src="../../../../static/img/my-center/contact_service.png" alt />
                        <span @click="linkServer">联系客服</span>
                    </div>
                    <div class="right-operate">
                        <span class="pay" @click="goStatus(item.order_id)">查看</span>
                    </div>
                </div>
            </div>
        </div>
        <NoData v-if="showNoData"></NoData>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import NoData from "@/components/multi/NoData";
export default {
    name: "SellWaitReceiveStatus",
    components: {
        Header,
        NoData
    },
    data() {
        return {
            comData: {
                head_data: {
                    show_type: 2,
                    tit_text: '已发货',
                    right_icon: 2,
                    showBack: false,
                    showLogo: 2, //显示头部title文字
                    showShare: 3, //1搜索2分享3菜单
                    showBg: true, //是否显示背景
                }
            },
            showNoData: false,
            goodsData: []
        };
    },
    methods: {
        linkServer() {
            this.$router.push({ name: 'Service' });
        },
        getData() {
            var that = this;
            that.$axios
                .post(process.env.API_HOST+"sellerConfirm")
                .then(res => {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            if (res.data.data == '') {
                                that.showNoData = true;
                            } else {
                                that.showNoData = false;
                                that.goodsData = res.data.data;
                            }
                        } else {
                            that.showNoData = true;
                            mui.toast(res.data.msg, { duration: 'short', type: 'div' });
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        goStatus(order_id) {
            this.$router.push({
                name: "SellTakeDelivery",
                query: { order: order_id }
            });
        },
    },
    mounted() {
        var that = this;
        that.getData();
    }
};
</script>
<style  scoped>
.wait-content {
    padding: 0.2rem;
}
.wait-cell {
    /* padding-left:.2rem; */
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
    padding: 0 0.2rem;
}
.gameLog {
    display: inline-block;
    vertical-align: middle;
    margin: 0 0.2rem;
}
.gameLog img {
    width: 0.8rem;
    height: 0.8rem;
}
.orderInfo {
    display: inline-block;
    vertical-align: middle;
    width: 5.3rem;
    padding: 0.3rem 0;
}
.orderInfo span {
    display: inline-block;
}
.order-num {
    color: #666666;
    font-size: 0.26rem;
    margin-bottom: 0.1rem;
    position: relative;
}
.history-time {
    color: #999999;
    position: absolute;
    top: 0;
    right: 0;
}
.order-des {
    width: 4rem;
    font-size: 0.26rem;
    color: #333333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0.1rem;
}
.price-status span {
    vertical-align: middle;
}
.good-price {
    color: #ff5e5e;
    font-size: 0.28rem;
    margin-right: 0.1rem;
}
.order-status {
    font-size: 0.2rem;
    background: #ff5e5e;
    padding: 0.01rem 0.05rem;
    color: #ffffff;
    line-height: 0.3rem;
    text-align: center;
    vertical-align: middle;
}
.order-operate {
    border-top: 0.01rem solid #e5e5e5;
    line-height: 0.8rem;
}
.order-operate div {
    display: inline-block;
}
.left-operate {
    font-size: 0.24rem;
    color: #666666;
}
.left-operate img {
    width: 0.25rem;
    height: 0.27rem;
    vertical-align: middle;
}
.left-operate span {
    vertical-align: middle;
}
.right-operate {
    font-size: 0.22rem;
    color: #ffffff;
    float: right;
}
.pay {
    width: 1.1rem;
    line-height: 0.44rem;
    text-align: center;
    display: inline-block;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    background: #fe7649;
}
</style>
