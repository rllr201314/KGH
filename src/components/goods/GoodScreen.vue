<template>
    <div class="search-wrap wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="titInp">
            <img class="search-ico" src="../../../static/img/search_ico.png" alt="">
            <form @submit.prevent action="#">
                <input class="search-title" type="search" placeholder="请输入搜索内容" v-model.trim="request.content" @keyup.13="show()" ref="input1" @blur="out()">
            </form>
            <img class="empty-ico" src="../../../static/img/empty_ico.png" alt="" @click="emptyFun()">
        </div>
        <Screen @getData="getData" :param="param" ref="mychild"></Screen>
        <div class="list-box-wrap" v-show="goodsList != ''?true:false" :class="listTop?'top1':'top2'">
            <div id="minirefresh" class="minirefresh-wrap list-wrap" >
                <div class="minirefresh-scroll list" >
                    <ul>
                        <div class="goods-strip" v-for="(item,index) in goodsList" :key="index" @click="goDetail(item.goods_id)">
                            <div class="goods-strip-title">
                                <div class="boutique" v-if="item.is_recommend == 1">精</div>
                                <div class="title-ico deal-ico" v-if="item.rent_method == 1 || item.rent_method == 3">成品号</div>
                                <div class="title-ico rent-ico" v-if="item.rent_method == 2 || item.rent_method == 3">出租</div>
                                <div class="title-ico wz-ico" v-if="item.rent_method == 5">物资</div>
                                <img class="account-type" v-if="item.client_id == 1 || item.client_id == 3" src="../../../static/img/rent/android.png" alt="安卓">
                                <img class="account-type" v-else-if="item.client_id == 2" src="../../../static/img/rent/ios.png" alt="苹果">
                                <div class="area" v-text="item.area_name"></div>
                            </div>
                            <div class="goods-strip-content">
                                <div class="goods-des" :class="item.isSelect?'des_false':'des_true'" v-text="item.goods_title"></div>
                                <div class="goods-ico">
                                    <img v-if="item.is_safe == 1" src="../../../static/img/goodscreen/safe_ico.png" alt="">
                                    <img v-if="item.is_stage == 1" src="../../../static/img/goodscreen/stages_ico.png" alt="">
                                    <img v-if="item.is_check == 1" src="../../../static/img/goodscreen/verify.png" alt="">
                                    <img v-if="item.is_compact == 1" src="../../../static/img/goodscreen/contract_ico.png" alt="">
                                 </div>
                            </div>
                            <div class="goods-strip-bottom">
                                <div class="goods-price">￥<span v-text="item.goods_price"></span></div>
                                <div class="bargain" v-if="item.sell_type == 2">可议价</div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
        <NoData class="nodata" v-show="goodsList !=''?false:true"></NoData>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header"; //头部
import Screen from "@/components/multi/Screen";
import NoData from "@/components/multi/NoData";
export default {
    name: "GoodScreen",
    components: {
        Header,
        Screen,
        NoData
    },
    data() {
        return {
            head_data: {
                show_type: 2, //显示头部inp
                right_icon: 2, //1搜索2分享3菜单
                tit_text: ""
            },
            content: "",
            goodsInfo: "",
            goodsList: [], //商品列表
            request: {},
            toload: true,
            param:{
                rent_status:1,//1成品号 2租号
            },
            title:'',
            keywords:'',
            des_color:true,
            listTop:'',
        };
    },
    methods: {
        // 去详情
        goDetail(goods_id) {
            var that = this;
            let x = 0;
            while(x < that.goodsList.length){
                if(that.goodsList[x].goods_id == goods_id){
                    that.goodsList[x].isSelect = true;
                    break;
                }
                x++;
            }
            this.$router.push({name: "Details",params: { goods_id: goods_id }});
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
            this.$refs.input1.blur();
            this.request.page = 1;
            this.getGoodsInfo(this.request);
            $('#minirefresh').scrollTop(0);

        },
        out() {
            this.request.page = 1;
            this.getGoodsInfo(this.request);
            $('#minirefresh').scrollTop(0);
        },
        getData(data,flag) {
            this.request = data;
            if (this.toload) {
                this.toload = false;
                this.refresh();
            } else {
                this.getGoodsInfo(data, "refresh");
            }
            if(flag){
                // $('.list-wrap').css({'top':'2.38rem'})
                this.listTop = true;
            }else{
                // $('.list-wrap').css({'top':'1.68rem'})
                this.listTop = false;
            }
        },
        // 获取商品列表
        getGoodsInfo(request, flag) {
            var that = this;
            that.$axios
                .post(process.env.API_HOST + "goodsInfo", request)
                .then(function(res) {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var data = res.data.data.data;
                            if(res.data.data.game_name == "波克捕鱼"){
                               that.title = '波克捕鱼_租号_卖号_弹头_机械号_救济金_道具交易_账号出租_官方版_看个号'
                            }else{
                                that.title = res.data.data.game_name+'交易平台_看个号';
                            }
                            that.keywords = res.data.data.game_name+'账号交易'
                            // 上拉加载
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
                .catch(function(err) {
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
    metaInfo(){
        return {
            title:this.title,
            meta:[{
                name:'keywords',
                content:this.keywords,
            },{
                name:'description',
                content:'看个号(https://www.kangehao.com)是国内专业的手游交易平台，安全可靠专注手游的交易网站，提供手游账号交易、买号卖号交易的手游交易平台！'
            }]
        }
    },
    activated(){
        var that = this;
        // 判断是否从详情返回 或者 是否强制刷新过
        if(!that.$route.meta.isBack || !that.$store.state.isRefresh){
            that.request = JSON.parse(JSON.stringify(that.$store.state.list_request));
            // that.request.rent_status = 1;//1成品号 2 租号
            that.request.category_id = that.$route.params.opt;
            that.$refs.mychild.getConfig(that.$route.params.opt,that.request);

        }else{
            $('#minirefresh').scrollTop(that.$route.meta.scroll_top);
        }
        that.$route.meta.isBack = false;
    },
    beforeRouteLeave(to,from,next){
        // 跳转详情页的话存储当前页面浏览位置 并且改变存储页面是否强制刷新属性
        if(to.name == "Details"){
            from.meta.scroll_top = $('#minirefresh').scrollTop();
            this.$store.commit('set_refresh',true);
        }
        next();
    },
    beforeRouteEnter(to,from,next){
        // 从详情页面返回 
        if(from.name == 'Details'){
            to.meta.isBack=true;
        }
        next();
    },

    

};
</script>
<style scoped>
.search-wrap{
    padding-top:0;
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
    margin:.2rem;
}

.list-box-wrap{
    position:relative;
    max-width:640px;
    margin:0 auto;
    height:100vh;
}
.top1{
    /* padding-top: 2.38rem; */
    /* margin-top: 2.38rem;    */
    top: 2.38rem;
    height: calc(100vh - 2.38rem);
}
.top2{
    top: 1.68rem;
    height: calc(100vh - 1.68rem);
}
.list {
    background: #f6f8fe;
}
.nodata{
    padding-top:1.68rem;
}
/* 单条商品 */
.goods-strip {
    background: #ffffff;
    padding: 0.3rem 0.2rem;
    margin-top: 0.2rem;
}
/* 头部------ */
.goods-strip-title {
    color: #ffffff;
    font-size: 0.24rem;
    line-height: 0.36rem;
    margin-bottom: 0.2rem;
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
.title-ico{
    text-align: center;
    width: 0.93rem;
    height: 0.36rem;
    display: inline-block;
    margin-right: 0.1rem;
}
.deal-ico {
    background: -webkit-linear-gradient(#feab49, #ffcc4b);
    background: -o-linear-gradient(#feab49, #ffcc4b);
    background: -moz-linear-gradient(#feab49, #ffcc4b);
    background: linear-gradient(to right, #feab49, #ffcc4b);
}
.rent-ico{
    background: -webkit-linear-gradient(#ff9090, #ff687a);
    background: -o-linear-gradient(#ff9090, #ff687a);
    background: -moz-linear-gradient(#ff9090, #ff687a);
    background: linear-gradient(to right, #ff9090, #ff687a);
}
.wz-ico{
    background: -webkit-linear-gradient(#BDB3F0, #8BB7F6);
    background: -o-linear-gradient(#BDB3F0, #8BB7F6);
    background: -moz-linear-gradient(#BDB3F0, #8BB7F6);
    background: linear-gradient(to right, #BDB3F0, #8BB7F6);
}
.account-type {
    width:.42rem;
    height:.42rem;
    vertical-align:middle;
}
.account-ios {
    text-align: center;
    /* width:.7rem; */
    padding: 0 0.1rem;
    height: 0.36rem;
    background: -webkit-linear-gradient(-30deg,rgba(139,191,255,1),rgba(109,202,255,1),rgba(98,172,255,1));
    background: -o-linear-gradient(-30deg,rgba(139,191,255,1),rgba(109,202,255,1),rgba(98,172,255,1));
    background: -moz-linear-gradient(-30deg,rgba(139,191,255,1),rgba(109,202,255,1),rgba(98,172,255,1));
    background:linear-gradient(-30deg,rgba(139,191,255,1),rgba(109,202,255,1),rgba(98,172,255,1));
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
    position: relative;
}
.goods-des {
    width: 5rem;
    display: inline-block;
    font-size: 0.3rem;
    line-height: 0.4rem;
}
.des_true{
    color: #333333;
}
.des_false{
    color: #999999;
}
.goods-ico {
    position: absolute;
    top:0;right:0;
    text-align: right;
    width:2.2rem;
}
.goods-ico img {
    width: 0.36rem;
    height: 0.36rem;
    margin-left: 0.12rem;
}
/* 底部 价格 */
.goods-strip-bottom div {
    display: inline-block;
}
.goods-price {
    font-size: 0.36rem;
    color: #fa5856;
    vertical-align: middle;
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


</style>
