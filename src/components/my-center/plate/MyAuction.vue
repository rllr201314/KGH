<template>
    <!-- 我的竞拍 -->
    <div class="wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="auction-title">
            <div class="auciton-status" @click="seleAucitonStatus('unpaid')" :class="auction_status?'switching':''">待支付</div>
            <div class="auciton-status" @click="seleAucitonStatus('participate')" :class="auction_status?'':'switching'">我参与的</div>
        </div>
        <div class="auction-content">
            <div class="showStatus" v-show="!auction_status">
                <div class="auction-cell" v-for="item in goodsData">
                    <div class="gameLog">
                        <img :src="item.log" alt="">
                    </div>
                    <div class="orderInfo">
                        <div class="order-num">
                            <span>订单号</span>
                            <span v-text="item.orderNum"></span>
                            <span class="history-time" v-text="item.history_time"></span>
                        </div>
                        <div class="order-des" v-text="item.des"></div>
                        <div class="price-status">
                            <span class="flag-price">起拍价</span>
                            <span class="good-price" v-text="item.price"></span>
                            <span class="tag not-start" v-if="item.auction_status == 1">暂未开始</span>
                            <span class="tag bidding dominant-bg" v-if="item.auction_status == 2">竞拍中</span>
                            <span class="tag not-auction" v-if="item.auction_status == 3">未拍到</span>
                            <div class="people-num">
                                <img src="../../../../static/img/my-center/hot.png" alt="">
                                <span>参与人数</span>
                                <span v-text="item.people"></span>
                            </div>
                        </div>
                        <div class="up-price">
                            <span>我的出价</span>
                            <span v-text="item.up_price"></span>
                        </div>
                    </div>
                    <div class="order-operate">
                        <div class="left-operate">
                            <div v-if="item.auction_status != 3">
                                倒计时
                                <span class="time" v-text="item.time_h"></span>
                                <span class="gray">小时</span>
                                <span class="time" v-text="item.time_m"></span>
                                <span class="gray">分</span>后订单将自动取消
                            </div>
                            <div v-else>
                                活动已结束
                            </div>
                        </div>
                        <div class="right-operate">
                            <span class="pay dominant-bg" v-if="item.auction_status != 3">前往加价</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="showStatus" v-show="auction_status">
                <div class="auction-cell" v-for="item in goodsData">
                    <img src="../../../../static/img/my-center/auction_success.png" alt="" class="auction_success">
                    <div class="gameLog">
                        <img :src="item.log" alt="">
                    </div>
                    <div class="orderInfo">
                        <div class="order-num">
                            <span>订单号</span>
                            <span v-text="item.orderNum"></span>
                        </div>
                        <div class="order-des" v-text="item.des"></div>
                        <div class="price-status">
                            <span class="flag-price">成交价</span>
                            <span class="good-price" v-text="item.price"></span>
                            <span class="tag unpaid ">待支付</span>
                            <div class="people-num">
                                <img src="../../../../static/img/my-center/hot.png" alt="">
                                <span>参与人数</span>
                                <span v-text="item.people"></span>
                            </div>
                        </div>
                    </div>
                    <div class="order-operate">
                        <div class="left-operate">
                            <div class="payInfo">
                                <div class="payTitle">请于6小时内完成支付</div>
                                <div> (支付超时将扣除押金）</div>
                            </div>
                        </div>
                        <div class="left-operate">
                            <span>
                                倒计时
                                <span class="time" v-text="item.time_h"></span>
                                <span class="gray">小时</span>
                                <span class="time" v-text="item.time_m"></span>
                                <span class="gray">分</span>
                            </span>
                        </div>
                        <div class="right-operate">
                            <span class="pay dominant-bg">前往支付</span>
                        </div>
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
    name: "MyAuction",
    components: {
        Header,
        NoData
    },
    data() {
        return {
            comData: {
                head_data: {
                    show_type: 2,
                    tit_text: '我的竞拍',
                    right_icon: 2,
                    showBack: false,
                    showLogo: 2, //显示头部title文字
                    showShare: 3, //1搜索2分享3菜单
                    showBg: true, //是否显示背景
                }
            },
            auction_status: true, //判断是--待支付--还是--我参与
            goodsData: [],
            showNoData:true,
        };
    },
    methods: {
        seleAucitonStatus(flag) {
            if (flag == "unpaid") {
                this.auction_status = true;
            } else if (flag == "participate") {
                this.auction_status = false;
            }
        }
    }
};
</script>
<style  scoped>
.auction-content {
    padding: 0.2rem;
}
.auction-title {
    background: #ffffff;
    font-size: 0.26rem;
    color: #333333;
}
.auction-title div {
    display: inline-block;
    width: 49.3%;
    text-align: center;
    line-height: 0.8rem;
}
/* .red-border {
    color: #ff7e4a;
    border-bottom: 0.04rem solid #ff7e4a;
} */
.auction-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
    padding: 0 0.2rem;
    position: relative;
}
.auction_success {
    position: absolute;
    width: 1.03rem;
    height: 1rem;
    right: 0;
    top: 0;
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
    width: 5.4rem;
    padding: 0.3rem 0;
}
.orderInfo span {
    display: inline-block;
}
.order-num {
    color: #666666;
    font-size: 0.26rem;
    margin-bottom: 0.1rem;
}
.history-time {
    float: right;
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
.flag-price {
    color: #666666;
    font-size: 0.26rem;
}
.good-price {
    color: #ff5e5e;
    font-size: 0.28rem;
}
.tag {
    font-size: 0.2rem;
    padding: 0 0.05rem;
    height: 0.3rem;
    color: #ffffff;
    line-height: 0.3rem;
    text-align: center;
    vertical-align: middle;
}
.not-start {
    background: #c6c6c6;
}
.bidding {
    /* background: #fe7649; */
}
.not-auction {
    background: #c6c6c6;
}
.unpaid {
    background: #45c773;
}
.people-num {
    float: right;
    font-size: 0.24rem;
    color: #999999;
}
.people-num img {
    width: 0.16rem;
    height: 0.24rem;
}
.up-price {
    margin-top: 0.1rem;
    color: #666666;
    font-size: 0.26rem;
}

.order-operate {
    border-top: 0.01rem solid #e5e5e5;
    line-height: 0.8rem;
    display:flex;
    justify-content: space-between;
}
.order-operate div {
    /* display: inline-block; */
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
    display: inline-block;
    vertical-align: middle;
}
.payInfo {
    margin-right: 0.2rem;
    vertical-align: middle;
}
.payInfo div {
    display: block;
    line-height: 0.4rem;
}
.time {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    color: #333333;
    text-align: center;
    line-height: 0.4rem;
    border: 1px solid #aaaaaa;
    font-size: 0.26rem;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    /* margin: 0 0.1rem; */
}
.gray {
    color: #959595;
}
.right-operate {
    font-size: 0.22rem;
    color: #ffffff;
    /* position:absolute;
    right: .2rem; */
}
.pay {
    width: 1.1rem;
    line-height: 0.44rem;
    text-align: center;
    display: inline-block;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    /* background: #fe7649; */
}
</style>
