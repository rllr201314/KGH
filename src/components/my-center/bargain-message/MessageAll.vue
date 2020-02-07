<template>
    <div class="messageAll-wrap wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="search-wrap">
            <div class="search-left">
                <div class="sele-type" @click="showPopver('category')">
                    <span v-text="seleOpt.category_text"></span>
                    <img src="../../../../static/img/goodscreen/downsolid.png" alt="">
                </div>
                <div id="category" class="mui-popover">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell" v-for="item in category_type" v-text="item.game_name" @click="showText('category',item.category_id)"></li>
                    </ul>
                </div>
                <div class="sele-type" @click="showPopver('goods')">
                    <span v-text="seleOpt.goods_text"></span>
                    <img src="../../../../static/img/goodscreen/downsolid.png" alt="">
                </div>
                <div id="goods" class="mui-popover">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell" v-for="item in goods_type" v-text="item.name" @click="showText('goods',item.value)"></li>
                    </ul>
                </div>
                <div>
                    <input type="text" placeholder="请输入商品名称" v-model="goods_title">
                </div>
            </div>
            <div class="search" @click="getdiscuss('search')">搜索</div>
        </div>
        <div class="seleTit">
            <div :class="seleTit == ''?'red-border switching':''" @click="seleTitFn()">全部</div>
            <div :class="seleTit == 2?'red-border switching':''" @click="seleTitFn(2)">未读</div>
            <div :class="seleTit == 1?'red-border switching':''" @click="seleTitFn(1)">已读</div>
        </div>
        <div class="list-box-wrap" v-if="!showNoData">
            <div id="minirefresh" class="minirefresh-wrap list-wrap">
                <div class="minirefresh-scroll list">
                    <ul>
                        <div class="goods-strip" v-for="item in goodsInfo" @click="goMessageDetails(item.goods_status,item.goods_id)">
                            <div class="goods-strip-title">
                                <div class="goods-type" v-if="item.deal_type == 1">成品号</div>
                                <div class="goods-type" v-else>代练号</div>
                                <div class="account-type" v-if="item.client_id == 1">安卓</div>
                                <div class="account-type" v-else-if="item.client_id == 2">苹果</div>
                                <div class="account-type" v-else>安卓混服</div>
                                <div class="area" v-text="item.platform_name"></div>
                            </div>
                            <div class="goods-strip-content">
                                <div class="goods-des" v-text="item.goods_title"></div>
                                <div class="goods-ico">
                                    <img v-if="item.is_safe == 1" src="../../../../static/img/goodscreen/safe_ico.png" alt="">
                                    <img v-if="item.is_stage == 1" src="../../../../static/img/goodscreen/stages_ico.png" alt="">
                                    <img v-if="item.is_check == 2" src="../../../../static/img/goodscreen/verify.png" alt="">
                                    <img v-if="item.is_compact == 2" src="../../../../static/img/goodscreen/contract_ico.png" alt="">
                                </div>
                            </div>
                            <div class="goods-strip-bottom">
                                <div class="goods-price red-color" v-text="item.goods_price"></div>
                                <div class="tran-price" v-if="item.order_state >= 2">
                                    <span>成交价</span>
                                    <span class="red-color">￥
                                        <span v-text="item.goods_amount"></span>
                                    </span>
                                </div>
                                <div class="hint">
                                    <div class="bargain" :class="item.is_read==1?'gray-bg':'red-bg'" v-if="item.order_state < 2 || item.order_state == ''">
                                        <span>未处理的议价：</span>
                                        <span v-text="item.msg_count"></span>
                                    </div>
                                    <div class="sale" v-if="item.order_state >= 2">已卖出</div>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
        <NoData class="nodata" v-if="showNoData"></NoData>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import NoData from "@/components/multi/NoData";
export default {
    name: "MessageAll",
    components: {
        Header,
        NoData
    },
    data() {
        return {
            comData: {
                head_data: {
                    show_type: 2,
                    tit_text: '收到的议价消息',
                    right_icon: 2,
                    showBack: false,
                    showLogo: 2, //显示头部title文字
                    showShare: 3, //1搜索2分享3菜单
                    showBg: true, //是否显示背景
                }
            },
            showNoData: false,
            // 商品列表
            goodsInfo: [],
            now_page: 1,
            pages: null,
            minirefresh: null,
            seleOpt: {
                category_text: "游戏类型",
                goods_text: "成交状态"
            },
            request: {},
            goods_title: "",
            category_type: [],
            goods_type: [
                {
                    value: "",
                    name: "全部"
                },
                {
                    value: 1,
                    name: "已成交"
                },
                {
                    value: 2,
                    name: "未成交"
                }
            ],
            c_id: "",
            g_id: "",
            seleTit:2,
            is_read:'',//默认全部 1-已读 2-未读
        };
    },
    mounted() {
        var that = this;
        that.getCategory();
        that.getdiscuss();
        that.refresh();
    },
    methods: {
        refresh() {
            var that = this;
            that.minirefresh = new MiniRefresh({
                container: "#minirefresh",
                down: {
                    isLock: true
                },
                up: {
                    isAuto: false,
                    loadFull: {
                        isEnable: false
                    },
                    isShowUpLoading: true,
                    callback: () => {
                        that.now_page++;
                        if (that.now_page > that.pages) {
                            that.minirefresh.endUpLoading(true);
                        } else {
                            this.getdiscuss("push");
                        }
                    }
                }
            });
        },
        seleTitFn(type = ""){
            var that = this;
            this.seleTit = type;
            that.getdiscuss('',type);
        },
        // 获取列表
        getdiscuss(flag,type = 2) {
            var that = this;
            if (flag == "push") {
                that.request.page = that.now_page;
            } else if (flag == "search") {
                that.request.page = that.now_page = 1;
            } else {
                that.request = {};
                that.request.page = that.now_page;
            }
            that.request.goods_status = that.g_id;
            that.request.category_id = that.c_id;
            that.request.goods_title = that.goods_title;
            that.request.is_read = type;
            that.$axios
                .post(process.env.API_HOST+"previewDiscuss", that.request)
                .then(function(res) {
                    // console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var data = res.data.data.data;
                            if (flag == "push") {
                                if (data != "") {
                                    for (var i in data) {
                                        that.goodsInfo.push(data[i]);
                                    }
                                    that.minirefresh.endUpLoading(false);
                                }else{
                                    that.minirefresh.endUpLoading(true);
                                }
                            } else {
                                that.goodsInfo = data;
                                that.pages = res.data.data.last_page;
                                
                                if (data != "") {
                                    that.showNoData = false;
                                } else {
                                    that.showNoData = true;
                                }
                            }
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        // 获取游戏类型
        getCategory() {
            var that = this;
            that.$axios
                .post(process.env.API_HOST+"categoryInfo")
                .then(function(res) {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var category = res.data.data;
                            category.unshift({
                                category_id: "",
                                game_name: "全部"
                            });
                            that.category_type = category;
                        }
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        // 显示弹出框
        showPopver(flag) {
            mui(`#${flag}`).popover("toggle");
        },
        // 选择隐藏弹框
        showText(flag, val) {
            var that = this;
            mui(`#${flag}`).popover("toggle");
            if (flag == "category") {
                var categoryArr = that.category_type;
                for (var i in categoryArr) {
                    if (val == categoryArr[i].category_id) {
                        that.seleOpt.category_text = categoryArr[i].game_name;
                        that.c_id = categoryArr[i].category_id;
                        break;
                    }
                }
            } else {
                var goodArr = that.goods_type;
                for (var i in goodArr) {
                    if (val == goodArr[i].value) {
                        that.seleOpt.goods_text = goodArr[i].name;
                        that.g_id = goodArr[i].value;
                        break;
                    }
                }
            }
        },
        // 跳转议价详情
        goMessageDetails(status,goods_id) {
            if(status == 5){
                mui.toast('当前商品未上架或已售出，不可处理',{ duration:'short', type:'div' });
            }else{
                this.$router.push({
                    name: "MessageDetails",
                    query: { goods_id: goods_id }
                });
            }
        }
    }
};
</script>
<style scoped>
.messageAll-wrap {
    padding:0;
}
.search-wrap {
    background: #ffffff;
    padding: 0.3rem 0 0.3rem 0.2rem;
    font-size: 0.24rem;
    color: #333333;
    position: fixed;
    top:.88rem;
    left:0;
    right:0;
    max-width:640px;
    margin:0 auto;
    z-index:999;
}
.search-left {
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.5rem;
}
.search-left .sele-type:nth-child(1) {
    margin-right: 0.8rem;
}
.sele-type {
    width: 2.3rem;
    height: 0.5rem;
    line-height: 0.5rem;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
    border: 1px solid #d2d2d2;
    padding: 0 0.1rem;
    display: inline-block;
    position: relative;
}
#category,
#goods {
    width: 2.3rem;
}
#goods {
    left: 3.35rem;
}
.sele-type img {
    width: 0.2rem;
    height: 0.1rem;
    position: absolute;
    top: calc(50% - 0.05rem);
    right: 0.2rem;
}
.search {
    font-size: 0.22rem;
    display: inline-block;
    width: 0.65rem;
    height: 0.44rem;
    background: #FFA303;
    color: #ffffff;
    text-align: center;
    line-height: 0.44rem;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    -webkit-box-shadow: 0.01rem 0.02rem 0.1rem #fe7649;
    -moz-box-shadow: 0.01rem 0.02rem 0.1rem #fe7649;
    box-shadow: 0.01rem 0.02rem 0.1rem #fe7649;
    vertical-align: middle;
}

/* 单条商品 */
.goods-strip {
    background: #ffffff;
    padding: 0.3rem 0.2rem;
    margin-bottom: 0.2rem;
}
/* 头部------ */
.goods-strip-title {
    color: #ffffff;
    font-size: 0.24rem;
    line-height: 0.36rem;
    margin-bottom: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.goods-type {
    text-align: center;
    width: 0.93rem;
    height: 0.36rem;
    background: -webkit-linear-gradient(#feab49, #ffcc4b);
    background: -o-linear-gradient(#feab49, #ffcc4b);
    background: -moz-linear-gradient(#feab49, #ffcc4b);
    background: linear-gradient(to right, #feab49, #ffcc4b);
    display: inline-block;
    margin-right: 0.1rem;
}
.account-type {
    text-align: center;
    width: 0.7rem;
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
    display: inline-block;
    margin-right: 0.1rem;
}
.area {
    font-size: 0.26rem;
    color: #999999;
    display: inline-block;
}
/* 详情 -- 保障*/
.goods-strip-content {
    margin-bottom: 0.15rem;
}
.goods-des {
    width: 4.5rem;
    overflow: hidden; /*超出的部分隐藏起来。*/
    white-space: nowrap; /*不显示的地方用省略号...代替*/
    text-overflow: ellipsis; /* 支持 IE */
    display: inline-block;
    font-size: 0.3rem;
    line-height: 0.31rem;
    color: #333333;
}
.goods-ico {
    width:2rem;
    float: right;
    display:flex;
    justify-content: flex-end;
}
.goods-ico img {
    width: 0.36rem;
    height: 0.36rem;
    margin-left: 0.12rem;
}
/* 底部 价格 */
.goods-strip-bottom {
    position: relative;
}
.goods-strip-bottom div {
    display: inline-block;
}
.goods-price {
    font-size: 0.36rem;
    margin-right: 0.3rem;
}
.red-color {
    color: #fa5856;
}
.tran-price {
    font-size: 0.26rem;
    color: #666666;
}
.tran-price span {
    margin-left: 0.1rem;
}

.hint {
    display: inline-block;
    font-size: 0.2rem;
    color: #ffffff;
    line-height: 0.27rem;
    position: absolute;
    top: 0.1rem;
    right: 0;
}
.bargain {
    /* background: #fa5856; */
    padding: 1px 3px;
}
.red-bg{
    background: #fa5856;
}
.gray-bg{
    background: #c6c6c6;
}
.sale {
    padding: 1px 5px;
    background: #c6c6c6;
}
/* ==========input========= */
input {
    margin: 0.2rem 0 0;
    padding: 0.1rem;
    font-size: 0.24rem;
    /* border: none; */
    width: 100%;
    height: 0.5rem;
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

.list-box-wrap {
    position:relative;
    max-width:640px;
    margin:0 auto;
    height:100vh;
}
.list-wrap {
    top: 3.5rem;
}
.list {
    background: #f6f8fe;
}
.nodata{
    padding-top:3.5rem;
}
.seleTit {
    display: flex;
    font-size: 0.26rem;
    color: #333333;
    line-height: 0.8rem;
    text-align: center;
    /* background: #ffffff; */
    position: fixed;
    top: 2.68rem;
    left: 0;
    right: 0;
    z-index: 66;
    max-width:640px;
    margin:0 auto;
}
.seleTit div {
    width: 100%;
}
/* .red-border {
    border-bottom: 0.04rem solid #ff7e4a;
    color: #ff7e4a;
} */


input[type="text"]{
    height: .5rem;
}
</style>
