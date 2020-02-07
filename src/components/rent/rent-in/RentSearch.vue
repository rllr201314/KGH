<template>
    <div class="search-wrap wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="titInp" @click="inc()">
            <img class="search-ico" src="../../../../static/img/search_ico.png" alt />
            <form @submit.prevent action="#">
                <input
                    class="search-title"
                    type="search"
                    placeholder="请输入搜索内容"
                    v-model.trim="request.content"
                    @keyup.13="show()"
                    ref="input1"
                    @blur="out()"
                />
            </form>
            <img
                class="empty-ico"
                src="../../../../static/img/empty_ico.png"
                alt
                @click="emptyFun()"
            />
        </div>
        <Screen @getData="getData" :param="param" ref="mychild"></Screen>
        <div class="goods-wrap" v-show="goodsList != ''?true:false">
            <div id="minirefresh" class="minirefresh-wrap list-wrap">
                <div class="minirefresh-scroll list">
                    <ul>
                        <li
                            class="goods-item"
                            v-for="(item,index) in goodsList"
                            :key="index"
                            @click="goDetail(item.goods_id)"
                        >
                            <div class="goods-strip-title">
                                <div class="boutique" v-if="item.is_recommend == 1">精</div>
                                <div class="title-ico rent-ico">租号</div>
                                <div class="title-ico deal-ico" v-if="item.rent_method == 3">成品号</div>
                                <img
                                    class="account-type"
                                    v-if="item.client_id == 1 || item.client_id == 3"
                                    src="../../../../static/img/rent/android.png"
                                    alt="安卓"
                                />
                                <img
                                    class="account-type"
                                    v-else-if="item.client_id == 2"
                                    src="../../../../static/img/rent/ios.png"
                                    alt="苹果"
                                />

                                <div class="area" v-text="item.area_name"></div>
                                <div class="gold authentication" v-if="item.merchant_level == 1">
                                    <img src="../../../../static/img/rent/gold.png" alt />
                                    <span>金牌认证</span>
                                </div>
                                <div
                                    class="silver authentication"
                                    v-else-if="item.merchant_level == 2"
                                >
                                    <img src="../../../../static/img/rent/silver.png" alt />
                                    <span>银牌认证</span>
                                </div>
                                <div
                                    class="copper authentication"
                                    v-else-if="item.merchant_level == 3"
                                >
                                    <img src="../../../../static/img/rent/copper.png" alt />
                                    <span>铜牌认证</span>
                                </div>
                            </div>
                            <div class="goods-strip-content">
                                <div
                                    class="goods-des"
                                    v-text="item.goods_title"
                                    :class="item.isSelect?'des_false':'des_true'"
                                ></div>
                                <div class="goods-strip-info">
                                    <span>VIP：8</span>
                                    <span>宠物宝宝：8</span>
                                    <span>套装：极品套装</span>
                                </div>
                                <div class="goods-ico">
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
                                        v-if="item.is_check == 1"
                                        src="../../../../static/img/goodscreen/verify.png"
                                        alt
                                    />
                                    <img
                                        v-if="item.is_compact == 1"
                                        src="../../../../static/img/goodscreen/contract_ico.png"
                                        alt
                                    />
                                </div>
                                <div class="goods-out">
                                    <div class="goods-out-tit">已租出</div>
                                    <div class="goods-out-bot">剩余12小时</div>
                                </div>
                            </div>
                            <div class="goods-strip-bot flex-box">
                                <div class="red-color">
                                    <span>￥2.5/</span>
                                    <span>小时</span>
                                </div>
                                <div class="gray-color">最近租用次数：69次</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="rent-package" v-show="showRentPackage">
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
            <div class="shade" v-show="showRentPackage" @click="showRentPackageFn(false)"></div>
        </div>
        <NoData class="nodata" v-show="goodsList !=''?false:true"></NoData>
        <Loading style="z-index:19;" v-show="showLoading"></Loading>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header"; //头部
import Screen from "@/components/multi/Screen";
import NoData from "@/components/multi/NoData";
import Loading from "@/components/multi/Loading";
export default {
    name: "RentSearch",
    components: {
        Header,
        Screen,
        NoData, Loading
    },
    data() {
        return {
            head_data: {
                show_type: 2,
                go_back: 1,
                right_icon: 2,
                // tit_text: '游戏店铺',
            },
            content: "",
            goodsInfo: "",
            goodsList: [], //商品列表
            request: "",
            toload: true,
            param: {
                rent_status: 2,//租号
            },
            title: '',
            keywords: '',
            showRentPackage: false,
            showLoading: false,
        };
    },
    methods: {
        // 去详情
        goDetail(goods_id) {
            var that = this;
            let x = 0;
            while (x < that.goodsList.length) {
                if (that.goodsList[x].goods_id == goods_id) {
                    that.goodsList[x].isSelect = true;
                    break;
                }
                x++;
            }
            this.$router.push({
                name: "Details",
                params: { goods_id: goods_id }
            });
        },
        // 显示租号分类
        showRentPackageFn(flag) {
            if (flag) {
                this.showRentPackage = true;
            } else {
                this.showRentPackage = false;
            }
        },
        //一键清空
        emptyFun() {
            this.request.content = '';
            this.request.page = 1;
            this.getGoodsInfo(this.request);
            $('#minirefresh').scrollTop(0);
        },
        // 隐藏键盘
        show(e) {
            this.request.page = 1;
            this.$refs.input1.blur();
            this.getGoodsInfo(this.request);
            $('#minirefresh').scrollTop(0);
        },
        out() {
            this.getGoodsInfo(this.request);
            $('#minirefresh').scrollTop(0);
        },
        inc() {
            if (this.showRentPackage) {
                this.showRentPackage = false;
            }
        },
        getData(data, flag) {
            this.request = data;
            if (this.toload) {
                this.toload = false;
                this.refresh();
            } else {
                this.getGoodsInfo(data, "refresh");
            }
            if (flag) {
                $('.list-wrap').css({ 'top': '2.38rem' })
            } else {
                $('.list-wrap').css({ 'top': '1.68rem' })
            }
        },
        // 获取商品列表
        getGoodsInfo(request, flag) {
            var that = this;
            that.showLoading = true;
            that.$axios
                .post(process.env.API_HOST + "goodsInfo", request)
                .then(function (res) {
                    that.showLoading = false;
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var data = res.data.data.data;
                            if (res.data.data.game_name == "波克捕鱼") {
                                that.title = '波克捕鱼_租号_卖号_弹头_机械号_救济金_道具交易_账号出租_官方版_看个号'
                            } else {
                                that.title = res.data.data.game_name + '租号平台_看个号';
                            }
                            that.keywords = res.data.data.game_name + '账号出租，' + res.data.data.game_name + '账号寄租'
                            // 上拉加载
                            // debugger;
                            if (flag == "push") {
                                if (data == "") {
                                    that.miniRefresh.endUpLoading(true);
                                } else {
                                    that.miniRefresh.endUpLoading(false);
                                    for (var i in res.data.data.data) {
                                        res.data.data.data[i].isSelect = false;
                                        that.goodsList.push(
                                            res.data.data.data[i]
                                        );
                                    }
                                }
                            } else {
                                if (data == "") {
                                    that.showNoData = true;
                                    that.goodsList = "";
                                    that.miniRefresh.endDownLoading();
                                } else {
                                    for (var i in res.data.data.data) {
                                        res.data.data.data[i].isSelect = false;
                                    }
                                    that.goodsList = res.data.data.data;
                                    that.pages = res.data.data.last_page;
                                    that.showNoData = false;
                                    that.miniRefresh.endDownLoading();
                                }
                            }
                        }
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        // 刷新
        refresh() {
            var that = this;
            that.miniRefresh = new MiniRefresh({
                container: "#minirefresh",
                down: {
                    isAuto: true,
                    bounceTime: 500,
                    callback: () => {
                        that.request.page = 1;
                        that.getGoodsInfo(that.request, "refresh");
                    }
                },
                up: {
                    isAuto: false,
                    loadFull: {
                        isEnable: false
                    },
                    isShowUpLoading: true,
                    callback: () => {
                        that.request.page++;
                        if (that.request.page <= that.pages) {
                            that.getGoodsInfo(that.request, "push");
                        } else {
                            that.miniRefresh.endUpLoading(true);
                        }
                    }
                }
            });
        }
    },
    metaInfo() {
        return {
            title: this.title,
            meta: [{
                name: 'keywords',
                content: this.keywords
            }, {
                name: 'description',
                content: '看个号(https://www.kangehao.com)是国内专业的手游交易平台，安全可靠专注手游的交易网站，提供手游账号交易、买号卖号交易的手游交易平台！'
            }]
        }
    },
    activated() {
        var that = this;
        // 判断是否从详情返回 或者 是否强制刷新过
        if (!that.$route.meta.isBack || !that.$store.state.isRefresh) {
            that.request = JSON.parse(JSON.stringify(that.$store.state.list_request));
            // that.request.rent_status = 2;
            that.request.category_id = that.$route.params.opt;
            that.$refs.mychild.getConfig(that.$route.params.opt, that.request);
        } else {
            $('#minirefresh').scrollTop(that.$route.meta.scroll_top);
        }
        that.$route.meta.isBack = false;
    },
    beforeRouteLeave(to, from, next) {
        if (this.showRentPackage) {
            this.showRentPackage = false;
        }
        // 跳转详情页的话存储当前页面浏览位置 并且改变存储页面是否强制刷新属性
        if (to.name == 'Details') {
            from.meta.scroll_top = $('#minirefresh').scrollTop();
            this.$store.commit('set_refresh', true)
        }
        next();
    },
    beforeRouteEnter(to, from, next) {
        // 从详情页面返回
        if (from.name == 'Details') {
            to.meta.isBack = true;
        }
        next();
    },
};
</script>
<style scoped>
.search-wrap {
    padding-top: 0;
}
/*搜索*/
.titInp {
    width: 5.8rem;
    height: 0.88rem;
    margin: 0 auto;
    position: fixed;
    top: 0;
    left: calc(50% - 2.9rem);
    z-index: 999999;
    line-height: 0.88rem;
}
.search-title {
    background: #ffffff;
    width: 5.8rem;
    height: 0.66rem;
    font-size: 0.26rem;
    padding: 0 0.6rem;
    margin: 0;
    border-top-left-radius: 0.33rem;
    border-top-right-radius: 0.33rem;
    border-bottom-left-radius: 0.33rem;
    border-bottom-right-radius: 0.33rem;
    background: #ffffff;
}
.search-ico {
    width: 0.32rem;
    height: 0.27rem;
    position: absolute;
    top: 0.32rem;
    left: 0.23rem;
}
.empty-ico {
    width: 0.23rem;
    height: 0.24rem;
    position: absolute;
    top: 0.12rem;
    right: 0.1rem;
    margin: 0.2rem;
}
.goods-wrap {
    position: relative;
    top: 0;
    margin: 0 auto;
    height: 100vh;
    z-index: 15;
}

/* 单条商品 */
.goods-strip {
    background: #ffffff;
    margin-top: 0.2rem;
}
.goods-strip-top {
    padding: 0.3rem 0.2rem 0;
}
/* 头部------ */
.goods-strip-title {
    color: #ffffff;
    font-size: 0.24rem;
    line-height: 0.36rem;
    margin-bottom: 0.1rem;
}
/* 精品 */
.boutique {
    text-align: center;
    background: #fe7649;
    width: 0.36rem;
    height: 0.36rem;
    display: inline-block;
    margin-right: 0.1rem;
}
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
.account-ios {
    text-align: center;
    /* width:.7rem; */
    padding: 0 0.1rem;
    height: 0.36rem;
    background: -webkit-linear-gradient(
        -30deg,
        rgba(139, 191, 255, 1),
        rgba(109, 202, 255, 1),
        rgba(98, 172, 255, 1)
    );
    background: -o-linear-gradient(
        -30deg,
        rgba(139, 191, 255, 1),
        rgba(109, 202, 255, 1),
        rgba(98, 172, 255, 1)
    );
    background: -moz-linear-gradient(
        -30deg,
        rgba(139, 191, 255, 1),
        rgba(109, 202, 255, 1),
        rgba(98, 172, 255, 1)
    );
    background: linear-gradient(
        -30deg,
        rgba(139, 191, 255, 1),
        rgba(109, 202, 255, 1),
        rgba(98, 172, 255, 1)
    );
    display: inline-block;
    margin-right: 0.1rem;
}
.area {
    font-size: 0.26rem;
    color: #999999;
    display: inline-block;
}
.authentication {
    display: inline-block;
}
.gold {
    color: #f6a200;
}
.silver {
    color: #b1b1b1;
}
.copper {
    color: #e69740;
}
.authentication img {
    width: 0.36rem;
    height: 0.36rem;
    margin-bottom: -0.1rem;
    /* vertical-align: middle; */
}
/* 详情 -- 保障*/
.goods-strip-content {
    position: relative;
}
.goods-des {
    width: 5rem;
    display: inline-block;
    font-size: 0.3rem;
    line-height: 0.6rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.des_true {
    color: #333333;
}
.des_false {
    color: #999999;
}
.goods-ico {
    position: absolute;
    top: 0;
    right: 0;
    text-align: right;
    width: 2.25rem;
}
.goods-ico img {
    width: 0.36rem;
    height: 0.36rem;
    margin-left: 0.12rem;
}
.goods-type {
    line-height: 0.6rem;
}
.original-price {
    color: #666666;
    font-size: 0.26rem;
    line-height: 0.5rem;
    display: inline-block;
}
.original-text {
    margin-right: 0.1rem;
}
.yet {
    font-size: 0.2rem;
    display: inline-block;
}
.yet-ico {
    color: #ffffff;
    background: #45c773;
    display: inline-block;
    line-height: 0.36rem;
    padding: 0 0.16rem;
    border-radius: 0.18rem;
    margin: 0 0.07rem 0 0.1rem;
}
.yet-text {
    color: #999999;
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

.bargain {
    margin-left: 0.1rem;
    line-height: 0.35rem;
    text-align: center;
    font-size: 0.2rem;
    color: #999999;
    padding: 0.02rem 0.1rem;
    border: 1px solid #b5b5b5;
    border-top-left-radius: 0.18rem;
    border-top-right-radius: 0.18rem;
    border-bottom-left-radius: 0.18rem;
    border-bottom-right-radius: 0.18rem;
    vertical-align: middle;
}

.list-wrap {
    top: 1.68rem;
}
.list {
    background: #f6f8fe;
}
.list ul {
    background: #f6f8fe;
}

.nodata {
    padding-top: 1.68rem;
}
.shade {
    position: absolute;
    top: 2.38rem;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9;
    background: rgba(0, 0, 0, 0.5);
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

/* 新列表 */
.goods-item {
    padding: 0.16rem 0.2rem;
    background: #ffffff;
    margin-top: 0.2rem;
}
.goods-strip-info {
    font-size: 0.2rem;
    color: #999999;
}
.goods-out {
    width: 1.4rem;
    text-align: center;
    box-shadow: 1px 1px 3px #ccc;
    border-radius: 0.1rem;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
}
.goods-out-tit {
    color: #fff;
    background: #6495e4;
    font-size: 0.24rem;
}
.goods-out-bot {
    background: #fff;
    color: #666666;
    font-size: 0.16rem;
}
.goods-strip-bot {
    line-height: 0.4rem;
}
.goods-strip-bot .red-color {
    font-size: 0.3rem;
    margin-right: 0.2rem;
}
.goods-strip-bot .gray-color {
    font-size: 0.2rem;
}

.loading {
    z-index: 19;
}
</style>
