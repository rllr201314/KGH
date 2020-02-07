<template>
    <!-- 议价记录 -->
    <div class="bargain-wrap wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="bargin-tit">
            <div class="tit-box" @click="barginTypeFn('all')">
                <img :src="seleType.all?'../../../../static/img/goodscreen/okcheck.png':'../../../../static/img/goodscreen/nocheck.png'" alt="">
                <span>全部</span>
            </div>
            <div class="tit-box" @click="barginTypeFn('reply')">
                <img :src="seleType.reply?'../../../../static/img/goodscreen/okcheck.png':'../../../../static/img/goodscreen/nocheck.png'" alt="">
                <span>待回复</span>
            </div>
            <div class="tit-box" @click="barginTypeFn('pay')">
                <img :src="seleType.pay?'../../../../static/img/goodscreen/okcheck.png':'../../../../static/img/goodscreen/nocheck.png'" alt="">
                <span>待支付</span>
            </div>
        </div>
        <div class="list-box-wrap" v-if="!showNoData">
            <div id="minirefresh" class="minirefresh-wrap list-wrap">
               <div class="minirefresh-scroll list">
                   <ul>
                       <div class="bragin-con" v-for="val in goodsInfo">
                           <div class="con-tit" v-text="val.time"></div>
                           <div class="goods-strip" v-for="(item,index) in val.data">
                               <img v-if="item.order_state >= 2 &&　item.is_self == 1" class="deal-status" src="../../../../static/img/my-center/clinch.png" alt="">
                               <img  v-if="item.order_state >= 2 &&　item.is_self == 2" class="deal-status" src="../../../../static/img/my-center/sale.png" alt="">
                               <img  v-if="item.is_agree == 3" class="deal-status" src="../../../../static/img/my-center/void.png" alt="">
                               <div class="goods-top">
                                   <div class="goods-strip-title">
                                       <div class="goods-type" v-if="item.deal_type_id == 1">成品号</div>
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
                                           <img v-if="item.is_check == 1" src="../../../../static/img/goodscreen/verify.png" alt="">
                                           <img v-if="item.is_compact == 1" src="../../../../static/img/goodscreen/contract_ico.png" alt="">
                                       </div>
                                   </div>
                                   <div class="goods-strip-bottom">
                                       <span>原价</span>
                                       <span class="goods-price">￥<span v-text="item.goods_price"></span></span>
                                       <span v-if="item.is_agree == 1 && item.order_state == ''" class="p-bBtn" @click="goPayFn(item.order_state,item.goods_id,item.discuss_msg)">前往支付</span>
                                       <span v-else-if="item.is_agree == 1 && item.order_state == 1 && item.is_self == 1" class="p-bBtn" @click="goPayFn(item.order_state,item.order_id,item.discuss_msg)">前往支付</span>

                                       <span v-if="(item.is_agree == 2 || item.is_agree == 3) && item.order_state == '' && item.goods_status == 3" class="p-bBtn" @click="bargainFn(item.goods_id)">发起议价</span>
                                   </div>
                               </div>
                               <div class="goods-bot">
                                   <div class="sell-cell-top">
                                       <img src="../../../../static/img/goodscreen/vertical.png" alt="">
                                       <span>议价记录</span>
                                   </div>
                                   <div class="sell-cell-content">
                                       <div class="sell-cell-strip" v-for="discuss in item.discuss_msg">
                                           <div class="strip-left">
                                               <span>出价</span>
                                               <span class="bid">
                                                   ￥<span v-text="discuss.price"></span>
                                               </span>
                                           </div>
                                           <div class="strip-con gray-bg" v-if="discuss.is_agree == -1">待回复</div>
                                           <div class="strip-con green-bg" v-if="discuss.is_agree == 1">同意交易</div>
                                           <div class="strip-con red-bg" v-if="discuss.is_agree == 2">拒绝</div>
                                           <div class="strip-con gray-bg" v-if="discuss.is_agree == 3">已下架</div>
                                           <div class="time" v-text="discuss.create_time"></div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </ul>
               </div>
            </div>
        </div>
        <div class="hoodle" v-show="showShade">
            <img src="../../../../static/img/my-center/record/bargain_tit.png" alt="">
            <div class="hoodle-con">
                <input type="number" placeholder="请输入您的出价" v-model="bargain_price">
            </div>
            <div class="hoodle-btn">
                <div class="okBtn" @click="goBargain('pay')">确认</div>
                <div class="cancelBtn" @click="goBargain('cancle')">取消</div>
            </div>
        </div>
        <div class="shade" v-show="showShade"></div>
        <NoData class="nodata" v-if="showNoData"></NoData>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header";
import NoData from "@/components/multi/NoData";
export default {
    name: "BargainRecord",
    components: {
        Header,
        NoData,
    },
    data() {
        return {
            comData: {
                head_data: {
                    show_type: 2,
                    tit_text: '议价记录',
                    right_icon: 2,
                    showBack: false,
                    showLogo: 2, //显示头部title文字
                    showShare: 3, //1搜索2分享3菜单
                    showBg: true, //是否显示背景
                }
            },
            showNoData:false,
            showShade: false,
            goods_id:'',
            bargain_price:'',
            seleType: {
                all:true,
                reply: false,
                pay: false,
            },
            lastAgree: " ",
            goodsInfo: [],
            now_page:1,
            pages:'',
        };
    },
    methods: {
        goPayFn(order_state,id,msg){
            var that = this;
            // order_status == '' 没有订单去生成订单 / != '' 有订单去选择支付方式
            if(order_state){
                var request = {};
                for(var i in msg){
                    if(msg[i].is_agree == 1){
                        request.price = msg[i].price;
                        break;
                    }
                }
                request.order_id = id;
                var order_info = JSON.stringify(request);
                sessionStorage.unpaid_o = order_info;
                that.$router.push({name:'Pay',query:{order_info}})
            }else{
                that.$router.push({name:'PlaceOrderPage', query:{ goods_id: id }})
            }
        },
        bargainFn(goods_id,e) {
            var that = this;
            that.showShade = true;
            that.goods_id = goods_id;

            // var mo = function(e) {
            //     e.preventDefault();
            // };
            // document.body.style.overflow = "hidden";
            // document.addEventListener("touchmove", mo, false); //禁止页面滑动
        },
        goBargain(flag) {
            var that = this;
            if (flag == "pay") {
                if (that.bargain_price) {
                    that.$axios.post(process.env.API_HOST+"discuss", {
                            goods_id: that.goods_id,
                            discuss_price: that.bargain_price
                        }).then(function(res) {
                            console.log(res)
                            if (res.status == 200) {
                                mui.alert(res.data.msg,"提示","确认",function(){
                                    that.getdiscuss('refresh',true);
                                },"div");
                            }
                        }).catch(function(err) {
                            console.log(err);
                        });
                } else {
                    mui.alert("请输入议价价格", "提示", "确认", "", "div");
                    return false;
                }
            }
            that.bargain_price = "";
            that.showShade = false;
            
            // var mo = function(e) {
            //     e.preventDefault();
            // };
            // document.body.style.overflow = ""; //出现滚动条
            // document.removeEventListener("touchmove", mo, false);
        },
        barginTypeFn(flag) {
            var that = this;
            if (flag == "pay") {
                that.seleType.reply = false;
                that.seleType.pay = true;
                that.seleType.all = false;
            } else if(flag == 'reply'){
                that.seleType.reply =true;
                that.seleType.pay = false;
                that.seleType.all = false;
            }else if(flag == 'all'){
                that.seleType.all = true;
                that.seleType.pay = false;
                that.seleType.reply = false;
            }
            that.getdiscuss('refresh');
        },
        getdiscuss(flag,refresh) {
            var that = this;
            var agree = "";
            if (that.seleType.reply &&　!that.seleType.pay) {
                agree = -1;
            } else if(!that.seleType.reply &&　that.seleType.pay){
                agree = 1;
            }else if(that.seleType.all){
                agree = ''
            }
            if (that.lastAgree != agree || refresh) {
                that.$axios
                    .post(process.env.API_HOST+"goodsDiscuss", {
                        is_agree: agree
                    })
                    .then(function(res) {
                        if (res.status == 200) {
                            if (res.data.code == 200) {
                                var data = res.data.data.data;
                                that.pages = res.data.data.last_page;
                                if(flag == 'refresh'){
                                    if(data == ""){
                                        that.showNoData = true;
                                        that.goodsInfo = '';
                                    }else{
                                        that.goodsInfo = data;
                                        that.showNoData = false;
                                    }
                                }else if(flag == 'push'){
                                    if(data == ""){
                                        that.minirefresh.endUpLoading(true);
                                    }else{
                                        that.minirefresh.endUpLoading();
                                        for(var i in data){
                                            that.goodsInfo.push(data[i]);
                                        }
                                    }
                                }   
                               
                            }
                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }
            that.lastAgree = agree;
        },
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
    },
    mounted() {
        this.getdiscuss('refresh');
    }
};
</script>
<style scoped>
.bargain-wrap {
    /* max-width: 12rem; */
    /* margin: 0 auto; */
    padding:0;
}
.bargin-tit {
    line-height: 0.8rem;
    background: #ffffff;
    padding-left: 0.2rem;
    z-index:88;
    position:fixed;
    top:.88rem;
    left:0;
    right:0;
    max-width: 640px;
    margin:0 auto;
}
.tit-box {
    font-size: 0.24rem;
    color: #666666;
    display: inline-block;
    margin-right: 1rem;
}
.tit-box img {
    width: 0.28rem;
    height: 0.28rem;
    margin-right: 0.1rem;
    vertical-align: middle;
}
.tit-box span {
    vertical-align: middle;
}
.bragin-con .goods-strip:nth-last-child(1) {
    margin-bottom: 0;
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
    padding: 0.3rem 0.2rem;
    margin-bottom: 0.2rem;
    position: relative;
}
.deal-status {
    width: 0.89rem;
    height: 0.89rem;
    position: absolute;
    top: 0;
    right: 0;
}
.goods-top {
    border-bottom: 0.01rem solid #e5e5e5;
    padding-bottom: 0.2rem;
}

/* 头部------ */
.goods-strip-title {
    color: #ffffff;
    font-size: 0.24rem;
    line-height: 0.36rem;
    margin-bottom: 0.2rem;
    display:flex;
    align-items: center;
    justify-content: flex-start;

}
/* 精品 */
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
.goods-ico {
    float: right;
    text-align: right;
    display:flex;
}
.goods-ico img {
    width: 0.36rem;
    height: 0.36rem;
    margin-left: 0.12rem;
}
/* 底部 价格 */
.goods-strip-bottom {
    font-size: 0.26rem;
    color: #666666;
    position: relative;
}
.goods-strip-bottom span {
    display: inline-block;
    vertical-align: middle;
}
.p-bBtn {
    padding: 0 5px;
    text-align: center;
    line-height: 0.44rem;
    font-size: 0.22rem;
    text-align: center;
    color: #ffffff;
    background: #fe7649;
    -webkit-border-radius: 0.04rem;
    -moz-border-radius: 0.04rem;
    border-radius: 0.04rem;
    -webkit-box-shadow: 0 0.5px 0.4px #fe7649;
    -moz-box-shadow: 0 0.5px 0.4px #fe7649;
    box-shadow: 0 0.5px 0.4px #fe7649;
    position: absolute;
    left: calc(50% - 0.55rem);
}
.goods-price {
    color: #333333;
}

.sell-cell-top {
    line-height: 0.7rem;
}
.sell-cell-top span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
}
.sell-cell-top img {
    width: 0.08rem;
    height: 0.29rem;
    vertical-align: middle;
}

.sell-cell-strip {
    display: flex;
    line-height: 0.6rem;
    justify-content: space-around;
    align-items: center;
}
.strip-left {
    font-size: 0.26rem;
    color: #666666;
}
.bid {
    color: #333333;
    margin-left: 0.2rem;
}
.strip-con {
    min-width: 0.84rem;
    padding: 2px;
    line-height: 0.27rem;
    font-size: 0.2rem;
    color: #ffffff;
    text-align: center;
}
.green-bg {
    background: #45c773;
}
.red-bg {
    background: #ff5e5e;
}
.gray-bg {
    background: #c6c6c6;
}
.time {
    color: #999999;
    font-size: 0.24rem;
}

.hoodle {
    width: 5rem;
    position: fixed;
    top: 35%;
    left: calc(50% - 2.5rem);
    z-index: 9;
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
}
.hoodle img {
    width: 5rem;
    height: 1.64rem;
}
.hoodle-con {
    text-align: center;
    margin-top: 0.4rem;
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
.hoodle-btn {
    display: flex;
    justify-content: space-around;
    margin: 0.4rem 0;
}
.hoodle-btn div {
    width: 1.89rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    font-size: 0.26rem;
    color: #ffffff;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
}
.okBtn {
    background: -webkit-linear-gradient(#fd915f, #fc534a);
    background: -o-linear-gradient(#fd915f, #fc534a);
    background: -moz-linear-gradient(#fd915f, #fc534a);
    background: linear-gradient(to right, #fd915f, #fc534a);
}
.cancelBtn {
    background: #c6c6c6;
}
/* ==========input========= */

input {
    margin: 0;
    padding: 0.1rem;
    font-size: 0.24rem;
    /* border: none; */
    width: 4.6rem;
    height: 0.7rem;
    vertical-align: middle;
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

.list-box-wrap{
    position:relative;
    max-width:640px;
    margin:0 auto;
    height:100vh;
}
.list-wrap {
    top: 1.88rem;
}
.list {
    background:#f6f8fe;
}

.nodata{
    padding-top:1.88rem;
}
</style>
