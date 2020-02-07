<template>
    <!-- 交易失败 -->
    <div class="failure-wrap wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="list-box-wrap" v-if="!showNoData">
            <div id="minirefresh" class="minirefresh-wrap list-wrap">
                <div class="minirefresh-scroll list">
                    <ul>
                        <div class="failure-cell" v-for="item in goodsData">
                            <div class="gameLog">
                                <img :src="item.game_logo" alt="">
                            </div>
                            <div class="orderInfo">
                                <div class="order-num">
                                    <span>订单号</span>
                                    <span v-text="item.order_sn"></span>
                                    <span class="history-time" v-text="item.create_time"></span>
                                </div>
                                <div class="order-des" v-text="item.goods_title"></div>
                                <div class="price-status">
                                    <span class="good-price">￥<span v-text="item.goods_amount"></span></span>
                                    <span class="order-status">交易失败</span>
                                </div>
                                <div class="causer" v-if="item.reason != null">
                                    <span class="gray">原因</span>
                                    <span v-text="item.reason"></span>
                                </div>
                            </div>
                            <div class="order-operate">
                                <div class="right-operate">
                                    <span class="pay dominant-bg" @click="lookGood">查看商品</span>
                                </div>
                            </div>
                        </div>
                    </ul>
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
    name: "BuyFailureDealStatus",
    components: {
        Header,
        NoData
    },
    data() {
        return {
            comData: {
                head_data: {
                    show_type:2,
                    right_icon:2,
                    tit_text:"交易失败",
                }
            },
            showNoData: false,
            goodsData: [],
            now_page: null,
            pages: null,
            minirefresh: null,
        };
    },
    methods: {
        lookGood(){
            mui.toast("交易失败的订单不能查看", { duration: "short", type: "div" });
        },
        getData(flag) {
            var that = this;
            if (flag) {
                that.$axios
                    .post(process.env.API_HOST+"buyerTradeFail")
                    .then(res => {
                        // console.log(res);
                        if (res.status == 200) {
                            if (res.data.code == 200) {
                                if (res.data.data.data == "") {
                                    that.minirefresh.endUpLoading(true);
                                } else {
                                    for(var i in res.data.data.data){
                                        that.goodsData.push(res.data.data.data[i]);
                                    }
                                    that.minirefresh.endUpLoading(false);
                                }
                            }
                            
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                that.$axios
                    .post(process.env.API_HOST+"buyerTradeFail")
                    .then(res => {
                        // console.log(res);
                        if (res.status == 200) { 
                            if (res.data.code == 200) {
                                if (res.data.data.data == "") {
                                    that.showNoData = true;
                                } else {
                                    that.showNoData = false;
                                    that.goodsData = res.data.data.data;
                                    that.pages = res.data.data.last_page;
                                    that.now_page = res.data.data.current_page;
                                }
                                that.minirefresh.endDownLoading();
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        refresh() {
            var that = this;
            that.minirefresh = new MiniRefresh({
                container: "#minirefresh",
                down: {
                    isAuto: false,
                    bounceTime: 500,
                    callback: () => {
                        this.getData();
                    }
                },
                up: {
                    isAuto: false,
                    loadFull: {
                        isEnable: false,
                    },
                    isShowUpLoading: true,
                    callback: () => {
                        that.now_page++;
                        if (that.now_page > that.pages) {
                            that.minirefresh.endUpLoading(true);
                        } else {
                            this.getData("push");
                        }
                    }
                }
            });
        }
    },
    mounted() {
        var that = this;
        that.getData();
        that.refresh();
    }
};
</script>
<style  scoped>
.failure-wrap {
    padding:0;
}
.failure-cell {
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
    background: #c6c6c6;
    padding: 0.01rem 0.05rem;
    color: #ffffff;
    line-height: 0.3rem;
    text-align: center;
    vertical-align: middle;
}
.causer {
    margin-top: 0.1rem;
    font-size: 0.26rem;
    color: #333333;
}
.gray {
    color: #999999;
}

.order-operate {
    border-top: 0.01rem solid #e5e5e5;
    line-height: 0.8rem;
    text-align: right;
}
.order-operate div {
    display: inline-block;
}

.right-operate {
    font-size: 0.22rem;
    color: #ffffff;
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
.list-box-wrap{
    position:relative;
    max-width:640px;
    margin:0 auto;
    height:100vh;
}
.list-wrap {
    top: 0.88rem;
}
.list {
    background: #f6f8fe;
    padding: 0.2rem;
}
</style>
