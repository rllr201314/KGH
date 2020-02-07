<template>
    <!-- 浏览记录 -->
    <div class="browse-wrap wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="list-box-wrap" v-if="!showNoData">
            <div id="minirefresh" class="minirefresh-wrap list-wrap">
                <div class="minirefresh-scroll list">
                    <ul>
                        <div class="browse-con" v-if="!showNoData">
                            <div class="sele">
                                <span @click="clear('null')">清除失效</span>
                                <span @click="clear('all')">清除所有记录</span>
                            </div>
                            <div class="browse-info">
                                <div class="vertical"></div>
                                <div class="browse-cell" v-for="(item,index) in goodsInfo" :key="index">
                                    <div class="browse-cell-tit">
                                        <span class="circle"></span>
                                        <span v-text="item.time"></span>
                                    </div>
                                    <div
                                        class="browse-cell-con"
                                        v-for="(ind,x) in item.data"
                                        :key="x"
                                        @click="godetail(ind.goods_status,ind.goods_id)"
                                    >
                                        <div
                                            class="browse-cell-con-top"
                                            :class="ind.rent_method == 2 ||　ind.rent_method == 3 ?'hide-border':'show-border'"
                                        >
                                            <div class="goods-strip-title">
                                                <div
                                                    class="title-ico deal-ico"
                                                    v-if="ind.rent_method == 1 || ind.rent_method == 3"
                                                >成品号</div>
                                                <div
                                                    class="title-ico rent-ico"
                                                    v-if="ind.rent_method == 2 || ind.rent_method == 3"
                                                >租号</div>
                                                <img
                                                    class="account-type"
                                                    v-if="ind.client_id == 1 || ind.client_id == 3"
                                                    src="../../../../static/img/rent/android.png"
                                                    alt="安卓"
                                                />
                                                <img
                                                    class="account-type"
                                                    v-else-if="ind.client_id == 2"
                                                    src="../../../../static/img/rent/ios.png"
                                                    alt="苹果"
                                                />
                                                <div class="area" v-text="ind.platform_name"></div>
                                            </div>
                                            <div class="goods-strip-content">
                                                <div class="goods-des" v-text="ind.goods_title"></div>
                                            </div>
                                            <div class="goods-strip-bottom">
                                                <span
                                                    class="goods-price"
                                                    v-if="ind.goods_price > 0"
                                                >
                                                    ￥
                                                    <span v-text="ind.goods_price"></span>
                                                </span>
                                                <div
                                                    class="rent-package-wrap"
                                                    v-for="(x,i) in ind.package_info"
                                                    :key="i"
                                                    @click.stop="showRentPackageFn(true)"
                                                >
                                                    <img
                                                        class="rent_package"
                                                        v-if="x.value == 1"
                                                        src="../../../../static/img/rent/A.png"
                                                        :alt="x.alias"
                                                    />
                                                    <img
                                                        class="rent_package"
                                                        v-else-if="x.value == 2"
                                                        src="../../../../static/img/rent/B.png"
                                                        :alt="x.alias"
                                                    />
                                                    <img
                                                        class="rent_package"
                                                        v-else-if="x.value == 3"
                                                        src="../../../../static/img/rent/C.png"
                                                        :alt="x.alias"
                                                    />
                                                    <img
                                                        class="rent_package"
                                                        v-else-if="x.value == 4"
                                                        src="../../../../static/img/rent/D.png"
                                                        :alt="x.alias"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="rent-des"
                                            v-if="ind.rent_method == 2 || ind.rent_method == 3"
                                            v-text="ind.goods_description"
                                        ></div>
                                        <div class="browse-cell-con-bot">
                                            <div class="con-bot-box">
                                                <img
                                                    class="see"
                                                    src="../../../../static/img/my-center/record/see.png"
                                                    alt
                                                />
                                                <span v-text="ind.click_count"></span>
                                            </div>
                                            <div class="con-bot-box">
                                                <img
                                                    class="collect"
                                                    src="../../../../static/img/my-center/record/collect.png"
                                                    alt
                                                />
                                                <span v-text="ind.collect_count"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
        <div class="hint" v-if="false">
            <img src="../../../../static/img/goods-details/left_solid.png" alt />
            <span>没有更多记录啦</span>
            <img src="../../../../static/img/goods-details/right_solid.png" alt />
        </div>
        <NoData class="nodata" v-if="showNoData"></NoData>
        <div class="rent-package" v-show="isShowKind">
            <div class="rent-tit">租号等级分类</div>
            <div class="rent-hide" @click="showRentPackageFn(false)">x</div>
            <div class="rent-item">
                <span class="rent-item-left">A免租金：</span>
                <span class="rent-item-right">租期活、号无损退全押，长期租等于免费租</span>
            </div>
            <div class="rent-item">
                <span class="rent-item-left">B低租金：</span>
                <span class="rent-item-right">超低租金、优质号，时间越长优惠越多</span>
            </div>
            <div class="rent-item">
                <span class="rent-item-left">C低押金：</span>
                <span class="rent-item-right">大量优质号源、折扣等你来租</span>
            </div>
            <div class="rent-item">
                <span class="rent-item-left">D免押金：</span>
                <span class="rent-item-right">无押金、低租金，最低10天起租</span>
            </div>
        </div>
        <div class="shade" v-show="isShowKind" @click="isShowKind?isShowKind = false:''"></div>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import NoData from "@/components/multi/NoData";
export default {
    name: "BrowseRecord",
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
                    tit_text: "浏览记录",
                    showBack: false,
                    showLogo: 2, //显示头部title文字
                    showShare: 3, //1搜索2分享3菜单
                    showBg: true, //是否显示背景
                }
            },
            now_page: 1,
            pages: null,
            showNoData: false,
            goodsInfo: [],
            miniRefresh: null,
            isShowKind: false,
        };
    },
    methods: {
        // 显示租号分类
        showRentPackageFn(flag) {
            if (flag) {
                this.isShowKind = true;
            } else {
                this.isShowKind = false;
            }
        },
        clear(flag) {
            var that = this;
            if (flag == "null") {
                that.$axios
                    .post(process.env.API_HOST+"clearHistory")
                    .then(res => {
                        if (res.status == 200) {
                            this.getData();
                            mui.toast(res.data.msg, {
                                duration: "short",
                                type: "div"
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else if (flag == "all") {
                that.$axios
                    .post(process.env.API_HOST+"clearAllHistory")
                    .then(res => {
                        if (res.status == 200) {
                            if (res.data.code == 200) {
                                that.showNoData = true;
                                mui.toast(res.data.msg, { duration: "short", type: "div" });
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        // 跳转详情
        godetail(status, id) {
            if (status == 3) {
                this.$router.push({ name: "Details", params: { goods_id: id } });
            } else if (status == 4) {
                mui.toast("该商品已下架", { duration: "short", type: "div" });
            } else if (status == 5) {
                mui.toast("该商品已售出", { duration: "short", type: "div" });
            } else {
                mui.toast("该商品已失效", { duration: "short", type: "div" });
            }
        },
        getData(flag) {
            var that = this;
            that.$axios
                .post(process.env.API_HOST+"historyInfo", {
                    page: that.now_page
                })
                .then(res => {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            if (flag) {
                                if (res.data.data.data == "") {
                                    that.miniRefresh.endUpLoading(true);
                                } else {
                                    for (var i in res.data.data.data) {
                                        that.goodsInfo.push(
                                            res.data.data.data[i]
                                        );
                                    }
                                    that.miniRefresh.endUpLoading(false);
                                }
                            } else {
                                if (res.data.data.data == "") {
                                    that.showNoData = true;
                                } else {
                                    that.goodsInfo = res.data.data.data;
                                    that.showNoData = false;
                                    that.pages = res.data.data.last_page;
                                }
                            }
                        } else {
                            mui.toast(res.data.msg, { duration: "short", type: "div" });
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        refresh() {
            this.miniRefresh = new MiniRefresh({
                container: "#minirefresh",
                down: {
                    isLock: true,
                    isAuto: false,
                    callback: () => {
                        this.request.page = 1;
                        this.getData();
                    }
                },
                up: {
                    isAuto: false,
                    loadFull: {
                        isEnable: false
                    },
                    isShowUpLoading: true,
                    callback: () => {
                        this.now_page++;
                        if (this.now_page <= this.pages) {
                            this.getData("push");
                        } else {
                            this.miniRefresh.endUpLoading(true);
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
<style scoped>
.browse-wrap {
    padding: 0;
}
.browse-con {
    padding: 0 0.2rem;
    position: relative;
}
.sele {
    color: #999999;
    font-size: 0.24rem;
    position: absolute;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: right;
    right: 0.2rem;
    top: 0;
    z-index: 2;
}
.sele span {
    display: inline-block;
}
.sele span:nth-last-child(1) {
    margin-left: 0.6rem;
}
.vertical {
    width: 1px;
    position: absolute;
    left: 0;
    top: 0.3rem;
    bottom: 0;
    /* height:1200px; */
    background: #dcdcdc;
}
.browse-info {
    padding-left: 0.24rem;
    position: relative;
}
.browse-info .browse-cell-con:nth-last-child(1) {
    margin-bottom: 0;
}
.browse-cell-tit {
    line-height: 0.8rem;
    font-size: 0.28rem;
    color: #333333;
    position: relative;
}
.circle {
    display: inline-block;
    width: 0.1rem;
    height: 0.1rem;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    background: #ffa303;
    position: absolute;
    left: -0.28rem;
    top: calc(50% - 0.05rem);
}
.browse-cell-con {
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
.browse-cell-con-top {
    padding: 0.2rem 0 0.1rem;
}
/* 头部------ */
.goods-strip-title {
    color: #ffffff;
    font-size: 0.24rem;
    line-height: 0.36rem;
    margin-bottom: 0.2rem;
}
.goods-strip-title div {
    vertical-align: middle;
}
/* 精品 */
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
    width: 0.42rem;
    height: 0.42rem;
    vertical-align: middle;
}
.area {
    font-size: 0.26rem;
    color: #999999;
    display: inline-block;
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

/* 底部 价格 */
.goods-price {
    color: #fa5856;
    font-size: 0.36rem;
}
.rent-package-wrap {
    display: inline-block;
    vertical-align: middle;
}
.rent_package {
    width: 0.93rem;
    height: 0.36rem;
    margin-right: 0.1rem;
}
.browse-cell-con-bot {
    line-height: 0.6rem;
}
.browse-cell-con-bot div {
    display: inline-block;
    margin-right: 0.7rem;
}
.con-bot-box {
    color: #666666;
    font-size: 0.24rem;
}
.con-bot-box img {
    vertical-align: middle;
}
.con-bot-box span {
    vertical-align: middle;
}
.see {
    width: 0.34rem;
    height: 0.21rem;
}
.collect {
    width: 0.3rem;
    height: 0.28rem;
    margin-top: -0.05rem;
}

/* 没有更多历史记录 */
.hint {
    text-align: center;
    line-height: 0.7rem;
}
.hint img {
    width: 0.55rem;
    height: 0.03rem;
    vertical-align: middle;
}
.hint span {
    display: inline-block;
    margin: 0 0.1rem;
    color: #999999;
    font-size: 0.24rem;
    vertical-align: middle;
}
.list-box-wrap {
    position: relative;
    max-width: 640px;
    margin: 0 auto;
    height: 100vh;
}
.list-wrap {
    top: 0.88rem;
}
.list {
    background: #f6f8fe;
}
.nodata {
    padding-top: 0.88rem;
}

.rent-des {
    color: #999999;
    font-size: 0.26rem;
    line-height: 0.7rem;
    background: #f6f6f6;
    padding-left: 0.27rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.hide-border {
    border: 0;
}
.show-border {
    border-bottom: 1px solid #e5e5e5;
}

.shade {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 6;
}
.rent-package {
    position: absolute;
    z-index: 10;
    width: 7.02rem;
    height: 3.78rem;
    top: 5.38rem;
    font-size: 0.24rem;
    left: calc(50% - 3.51rem);
    background: #ffffff;
    line-height: 0.6rem;
}
.rent-tit {
    font-size: 0.26rem;
    text-align: center;
    padding-top: 0.4rem;
}
.rent-hide {
    position: absolute;
    top: 0.05rem;
    right: 0.05rem;
    color: #666666;
    padding: 0 0.2rem;
}
.rent-item-left {
    color: #333333;
    padding-left: 0.6rem;
}
.rent-item-right {
    color: #999999;
}
</style>
