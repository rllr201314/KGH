<template>
    <!-- 收藏 -->
    <div class="bargain-wrap wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="bargain-tit" v-if="!showNoData">
            <div class="tit-box" @click="delData">
                <img src="../../../../static/img/delete_ico.png" alt />
                <span>全部清空</span>
            </div>
        </div>
        <div class="bragin-con" v-show="!showNoData">
            <div id="minirefresh" class="minirefresh-wrap list-wrap">
                <div class="minirefresh-scroll list">
                    <ul>
                        <div
                            class="goods-strip"
                            v-for="item in goodsInfo"
                            @click="goDetail(item.goods_id)"
                        >
                            <div class="goods-strip-top">
                                <div class="goods-strip-title">
                                    <div
                                        class="title-ico deal-ico"
                                        v-if="item.rent_method == 1 || item.rent_method == 3"
                                    >成品号</div>
                                    <div
                                        class="title-ico rent-ico"
                                        v-if="item.rent_method == 2 || item.rent_method == 3"
                                    >租号</div>
                                    <div class="account-type" v-if="item.client_id == 1">安卓</div>
                                    <div class="account-type" v-else-if="item.client_id == 2">苹果</div>
                                    <div class="account-type" v-else-if="item.client_id == 3">安卓混服</div>
                                    <div class="area" v-text="item.platform_name"></div>
                                    <div class="goods-collect">
                                        <img
                                            class="collect"
                                            src="../../../../static/image/collection.png"
                                            alt
                                        />
                                        <span>已收藏</span>
                                    </div>
                                </div>
                                <div class="goods-strip-content">
                                    <div class="goods-des" v-text="item.goods_title"></div>
                                    <div class="goods-icon">
                                        <img
                                            v-if="item.is_safe == 1"
                                            src="../../../../static/img/goodscreen/safe_ico.png"
                                            alt
                                        />
                                        <img
                                            v-if="item.is_stage == 1"
                                            src="../../../../static/img/goodscreen/stages_ico.png"
                                            alt
                                        />
                                        <img
                                            v-if="item.is_compact == 1"
                                            src="../../../../static/img/goodscreen/contract_ico.png"
                                            alt
                                        />
                                    </div>
                                </div>
                                <div class="goods-strip-bot">
                                    <div v-if="item.rent_method == 1">
                                        <span class="goods-price">
                                            ￥
                                            <span v-text="item.goods_price"></span>
                                        </span>
                                        <div class="bargain" v-if="item.sell_type == 2">可议价</div>
                                    </div>
                                    <div class="original-price" v-if="item.rent_method == 3">
                                        <span class="original-text">原价</span>
                                        <span>￥</span>
                                        <span v-text="item.goods_price"></span>
                                    </div>
                                </div>
                                <div v-if="item.rent_method == 2 || item.rent_method == 3">
                                    <div class="goods-strip-bottom">
                                        <div>
                                            <img src="../../../../static/img/rent/rent-ico.png" alt />
                                            <span>租金</span>
                                            <span class="red-color">￥</span>
                                            <span class="goods_price" v-text="item.day_rent"></span>/
                                            <span v-text="item.rent_unit"></span>
                                        </div>
                                        <div>
                                            <img
                                                src="../../../../static/img/rent/pledge-ico.png"
                                                alt
                                            />
                                            <span>押金</span>
                                            <span>￥</span>
                                            <span v-text="item.cash"></span>
                                        </div>
                                        <div>
                                            <img
                                                src="../../../../static/img/rent/pledge-ico.png"
                                                alt
                                            />
                                            <span>最短租期</span>
                                            <span v-text="item.least_lease"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="hint-bottom"
                                v-if="item.rent_method == 2 || item.rent_method == 3"
                                v-text="item.goods_description"
                            ></div>
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
    inject: ['reload'],
    name: "BargainRecord",
    components: {
        Header,
        NoData
    },
    data() {
        return {
            comData: {
                head_data: {
                    show_type: 2,
                    right_icon: 2,
                    tit_text: '我的收藏',
                    showBack: false,
                    showLogo: 2, //显示头部title文字
                    showShare: 3, //1搜索2分享3菜单
                    showBg: true, //是否显示背景
                }
            },
            showNoData: false,
            seleType: {
                reply: true,
                pay: false
            },
            accountData: {},
            // 商品列表
            goodsInfo: [],
            pages: null,
            num_page: null,
        };
    },
    methods: {
        getData(flag) {
            var that = this;
            that.$axios.post(process.env.API_HOST + "collection", {
                page: that.num_page
            }).then((res) => {
                console.log(res);
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        var data = res.data.data.data;
                        if (flag == 'refresh') {
                            that.miniRefresh.endDownLoading();
                            if (data != "") {
                                that.goodsInfo = data;
                                that.pages = res.data.data.last_page;
                                that.num_page = res.data.data.current_page;
                            } else {
                                that.showNoData = true;

                            }
                        } else if (flag == 'push') {
                            if (data != "") {
                                that.miniRefresh.endUpLoading();
                                for (var i in data) {
                                    that.goodsInfo.push(data[i]);
                                }
                            } else {
                                that.miniRefresh.endUpLoading(true);
                            }
                        }
                    } else {
                        that.showNoData = true;
                        mui.toast(res.data.msg, { duration: 'short', type: 'div' });
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        delData() {
            var that = this;
            that.$axios.post(process.env.API_HOST + "clearCollection").then((res) => {
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        mui.toast(res.data.msg, { duration: 'short', type: 'div' });
                        that.reload();
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        goDetail(goods_id) {
            this.$router.push({
                name: "Details",
                params: { goods_id: goods_id }
            });
        },
        refresh() {
            var that = this;
            that.miniRefresh = new MiniRefresh({
                container: "#minirefresh",
                down: {
                    isAuto: true,
                    bounceTime: 500,
                    callback: () => {
                        that.num_page = 1;
                        that.getData('refresh');
                    }
                },
                up: {
                    isAuto: false,
                    loadFull: {
                        isEnable: false
                    },
                    isShowUpLoading: true,
                    callback: () => {
                        that.num_page++;
                        if (that.num_page <= that.pages) {
                            that.getData('push');
                        } else {
                            that.miniRefresh.endUpLoading(true);
                        }
                    }
                }
            });
        }
    },
    mounted() {
        var that = this;
        this.refresh();
    }
};
</script>
<style scoped>
.bargain-wrap {
    padding: 0;
}
.bargain-tit {
    line-height: 0.7rem;
    background: #f6f8fe;
    text-align: right;
    font-size: 0;
    position: fixed;
    top: 0.88rem;
    left: 0;
    right: 0;
    max-width: 640px;
    margin: 0 auto;
    z-index: 10;
}
.tit-box {
    font-size: 0.24rem;
    color: #666666;
    display: inline-block;
    margin-right: 0.2rem;
}
.tit-box img {
    width: 0.26rem;
    height: 0.26rem;
    margin-right: 0.1rem;
    vertical-align: middle;
}
.tit-box span {
    vertical-align: middle;
}
.bragin-con .goods-strip:nth-last-child(1) {
    margin-bottom: 0;
}
.bragin-con {
    position: relative;
    height: 100vh;
    max-width: 640px;
    margin: 0 auto;
}
.list-wrap {
    top: 1.58rem;
}
.list {
    background: #f6f8fe;
}

.con-tit {
    line-height: 0.7rem;
    color: #999999;
    font-size: 0.24rem;
    padding-left: 0.2rem;
}

/* 单条商品 */
.goods-strip {
    background: #ffffff;
    margin-bottom: 0.2rem;
}
.goods-strip-top {
    padding: 0.3rem 0.2rem 0;
}
/* 头部------ */
.goods-strip-title {
    color: #ffffff;
    font-size: 0.24rem;
    line-height: 0.36rem;
    margin-bottom: 0.2rem;
    position: relative;
}
.goods-strip-title div {
    display: inline-block;
    vertical-align: middle;
}
/* 精品 */
.title-ico {
    text-align: center;
    width: 0.93rem;
    height: 0.36rem;
    display: inline-block;
    margin-right: 0.1rem;
}
.rent-ico {
    background: -webkit-linear-gradient(#ff9090, #ff687a);
    background: -o-linear-gradient(#ff9090, #ff687a);
    background: -moz-linear-gradient(#ff9090, #ff687a);
    background: linear-gradient(to right, #ff9090, #ff687a);
}
.deal-ico {
    background: -webkit-linear-gradient(#feab49, #ffcc4b);
    background: -o-linear-gradient(#feab49, #ffcc4b);
    background: -moz-linear-gradient(#feab49, #ffcc4b);
    background: linear-gradient(to right, #feab49, #ffcc4b);
}
.account-type {
    padding: 0 0.1rem;
    height: 0.36rem;
    background: -webkit-linear-gradient(
        120deg,
        rgba(104, 224, 218, 1),
        rgba(104, 223, 222, 1),
        rgba(132, 240, 178, 1),
        rgba(73, 209, 202, 1)
    );
    background: -o-linear-gradient(
        120deg,
        rgba(104, 224, 218, 1),
        rgba(104, 223, 222, 1),
        rgba(132, 240, 178, 1),
        rgba(73, 209, 202, 1)
    );
    background: -moz-linear-gradient(
        120deg,
        rgba(104, 224, 218, 1),
        rgba(104, 223, 222, 1),
        rgba(132, 240, 178, 1),
        rgba(73, 209, 202, 1)
    );
    background: linear-gradient(
        120deg,
        rgba(104, 224, 218, 1),
        rgba(104, 223, 222, 1),
        rgba(132, 240, 178, 1),
        rgba(73, 209, 202, 1)
    );
    margin-right: 0.1rem;
}
.area {
    font-size: 0.26rem;
    color: #999999;
}
/* 详情 -- 保障*/
.goods-strip-content {
    line-height: 0.5rem;
}
.goods-des {
    width: 5rem;
    overflow: hidden; /*超出的部分隐藏起来。*/
    white-space: nowrap; /*不显示的地方用省略号...代替*/
    text-overflow: ellipsis; /* 支持 IE */
    display: inline-block;
    font-size: 0.3rem;
    line-height: 0.31rem;
    color: #333333;
}
.goods-icon {
    float: right;
    text-align: right;
    display: flex;
}
.goods-icon img {
    width: 0.36rem;
    height: 0.36rem;
    margin-left: 0.12rem;
}
/* 底部 价格 */
.goods-strip-bot div {
    display: inline-block;
}
.goods-price {
    color: #fa5856;
    font-size: 0.34rem;
    display: inline-block;
    margin-bottom: 0.2rem;
    vertical-align: middle;
}
.goods-price span {
    font-size: 0.36rem;
}
.bargain {
    padding: 1px 3px;
    margin-left: 0.1rem;
    line-height: 0.35rem;
    text-align: center;
    font-size: 0.2rem;
    color: #999999;
    border: 1px solid #b5b5b5;
    border-top-left-radius: 0.18rem;
    border-top-right-radius: 0.18rem;
    border-bottom-left-radius: 0.18rem;
    border-bottom-right-radius: 0.18rem;
    vertical-align: middle;
    margin-bottom: 0.2rem;
}
.goods-collect {
    font-size: 0.24rem;
    color: #999999;
    position: absolute;
    right: 0;
}
.goods-collect img {
    width: 0.25rem;
    height: 0.23rem;
}

.original-price {
    color: #666666;
    font-size: 0.26rem;
    line-height: 0.5rem;
}
.original-text {
    margin-right: 0.1rem;
}
/* 底部 */
.goods-strip-bottom {
    line-height: 0.8rem;
    border-top: 1px solid #dcdcdc;
    color: #999999;
    font-size: 0.26rem;
    display: flex;
    justify-content: space-between;
}
.goods-strip-bottom img {
    width: 0.3rem;
    height: 0.3rem;
    vertical-align: middle;
}
.goods-strip-bottom span {
    vertical-align: middle;
}
.red-color {
    color: #fa5856;
}
.goods_price {
    color: #fa5856;
    font-size: 0.36rem;
}
.hint-bottom {
    line-height: 0.7rem;
    background: #f6f6f6;
    font-size: 0.26rem;
    color: #999999;
    padding-left: 0.27rem;
    border-bottom: 1px solid #dcdcdc;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
