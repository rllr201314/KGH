<template>
    <!-- 点卡详情 -->
    <div class="wrap CardDetails">
        <Header v-bind:head_data="head_data"></Header>
        <!-- 点卡面额 -->
        <div class="denomination">
            <div class="denomination-main">
                <img :src="directcharge_img" alt="">
                <span v-text="directcharge_name"></span>
            </div>
            <div class="denomination-box">
                <div class="denomination-main-title" v-text="denomination_title"></div>
                <div class="denomination-main-box" 
                    v-for="(item,index) in denomination_data" :key="index" 
                    :class="{'new1': item.i}" @click="seleNav(index)"
                > 
                    <div class="name" v-text="item.denomination_name"></div>
                    <div>
                        <span class="old">原价：<span v-text="item.denomination_original_price"></span>元</span>
                        <span class="new">现价：<span v-text="item.denomination_present_price"></span>元</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 店铺信誉 -->
        <div class="CardDetails-reputation">
            <img class="CardDetails-logo" src="../../../static/image/index/shop-logo.png" alt />
            <div class="head-con">
                <div class="head-con-top">
                    <span class="store-name">康康游戏交易专营店</span>
                    <van-rate
                        class="vant"
                        v-model="rate" 
                        color="#FF721C" 
                        void-color="#FFE3D2" 
                        allow-half 
                        void-icon="star" 
                        readonly
                    />
                    <img src="../../../static/image/recharge-area/dui.png" alt="">
                    <span class="head-cash-d">已认证</span>
                </div>
                <div class="head-cash">
                    <span>信誉积分 2000</span>
                    <span>保证金:</span>
                    <span class="head-cash-d">
                        50w
                        <span></span>
                    </span>
                    
                    <img
                        class="head-mark"
                        @click="show_pledge = !show_pledge"
                        src="../../../static/image/store/mark.png"
                        alt
                    />
                </div>
            </div>
        </div>
        <div class="pledge-box" v-show="show_pledge" @click="show_pledge = !show_pledge">
            <div class="pledge">
                <div class="pledge-tit">保证金</div>
                <div class="pledge-str">
                    <span class="pledge-left">什么是保证金：</span>
                    <span class="pledge-right">保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指</span>
                </div>
                <div class="pledge-str">
                    <span class="pledge-left">什么是保证金：</span>
                    <span class="pledge-right">保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指</span>
                </div>
                <div class="pledge-str">
                    <span class="pledge-left">什么是保证金：</span>
                    <span class="pledge-right">保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指保证金是指</span>
                </div>
            </div>
        </div>
        <!-- 服务保障 -->
        <div class="service-guarantee">
            <span>服务保障</span>
            <div v-for="(item,index) in service_guarantee_data" :key="index">
                <img :src="item.img" alt="">
            </div>
        </div>
        <!-- 注意事项： -->
        <div class="matters-needing-attention">
            <div class="matters-needing-attention-title" v-text="matters_needing_attention_title"></div>
            <div class="matters-needing-attention-main" v-for="(item,index) in matters_needing_attention_data" :key="index">
                <div><span v-text="item.number"></span></div>
                <div v-text="item.content"></div>
            </div>
        </div>
        <!-- 充值操作 -->
        <div class="operation">
            <div>
                <span>网易通行证：</span><input type="text">
            </div>
            <div class="xl">
                <span>充值游戏：</span>
                <div  @click="isxl=!isxl">
                    <select style="width: 2.66rem; height: .4rem;">
                        <option class="xllx" v-for="sel in sels" v-bind:value="sel.value" v-text="sel.week"></option>
                    </select>
                </div>
                <div :class="{kailong:isxl,new2: !isxl}"></div>
            </div>
            <div>
                <span>选择数量：</span><input type="number">
            </div>
        </div>
        <!-- 底部购买 -->
        <div class="goods-details-bottom">
            <div class="share goods-details-bottom-left" @click="showShareFn">
                <img src="../../../static/img/goods-details/share_ico.png" alt="">
                <div>分享</div>
            </div>
            <div class="collect goods-details-bottom-left" @click="collect()">
                <img :src="detailData.is_collect == 1?'../static/image/collection.png':'../static/image/no_collect_ico.png'" alt="">
                <div>收藏</div>
            </div>
            <div></div>
            <div class="buy goods-details-bottom-right" @click="buyFn" >立即购买</div>
        </div>
        <!-- 分享弹出框 -->
        <div id="sheet-share" class="mui-popover mui-popover-bottom mui-popover-action">
            <!-- 可选择菜单 -->
            <div class="pop-view">
                <div class="pop-hint">
                    分享到其他平台提高浏览量，更快速的卖出商品
                </div>
                <div class="pop-box" @click="shareFn('wechatFriend')" v-if="false">
                    <img src="../../../static/img/share/wechat.png" alt="">
                    <div>微信好友</div>
                </div>
                <div class="pop-box" @click="shareFn('wechatTimeline')" v-if="false">
                    <img src="../../../static/img/share/pyq.png" alt="">
                    <div>朋友圈</div>
                </div>
                <div class="pop-box" @click="copyFn()" :data-clipboard-text="url" id="copy">
                    <img src="../../../static/img/share/copy_link.png" alt="">
                    <div>复制链接</div>
                </div>
            </div>
            <!-- 取消菜单 -->
            <ul class="pop-view">
                <li class="mui-table-view-cell option-black">
                    <a href="#sheet-share">取消</a>
                </li>
            </ul>
        </div>
        <!-- 购买弹框 -->
        <div class="buy-frame" v-show="showShade1">
            <div>您正在使用余额抵扣/押金抵扣</div>
            <div>请输入看个号平台的交易密码</div>
            <div>
                <input type="text" v-model="password">
            </div>
            <div @click="confirm()">确认</div>
            <img src="../../../static/image/recharge-area/delete.png" alt="" @click="disappear()">

        </div>
        <div class="shade" v-show="showShade1||isShowKind" @click="isShowKind?isShowKind = false:''"></div>
</div>

  
</template>

<script>
import Header from '@/components/home-page/Header'
import DropDownList1 from '@/components/new-business/DropDown/DropDownList1'
export default {
    components:{
        Header,
    },
       
    data(){
        return{
            head_data: {
                show_type:2,
                right_icon:2,
                tit_text:'点卡详情',
            },
            rate: 4,
            show_pledge: false,
            isshow: false,
            isxl:true,

            // 底部
            detailData: {},
            showShade: false,
            bargain_price: "",
            url:null,//当前页的url
            password:"",
            isShowKind:false,//点击显示租号套餐列表
            showShade1: false,

            directcharge_img:'../../static/image/recharge-area/dota2.png',
            directcharge_name:'DOTA2',
            denomination_title:'请选择点卡面额：',
            // 面额
            denomination_data:[
                {   
                    denomination_name:'网易一卡通1元10点券自动充值',
                    denomination_original_price:'1',
                    denomination_present_price:"0.98",
                    i:true
                },
                {   
                    denomination_name:'网易一卡通10元100点券自动充值',
                    denomination_original_price:'10',
                    denomination_present_price:"9.8",
                    i:false
                },
                {   
                    denomination_name:'网易一卡通50元500点券自动充值',
                    denomination_original_price:'50',
                    denomination_present_price:"49",
                    i:false
                },
                {   
                    denomination_name:'网易一卡通100元1000点券自动充值',
                    denomination_original_price:'100',
                    denomination_present_price:"98",
                    i:false
                }
            ],
            // 服务保障
            service_guarantee_data:[
                {
                    img:'../../static/image/recharge-area/b.png'
                },
                {
                    img:'../../static/image/recharge-area/f.png'
                },
                {
                    img:'../../static/image/recharge-area/y.png'
                },
                {
                    img:'../../static/image/recharge-area/h.png'
                }
            ],

            // 注意事项
            matters_needing_attention_title:'注意事项：',
            matters_needing_attention_data:[
                {
                    number:'1.',
                    content:'非渠道充值，所以不能保证及时冲进去。所以客服会快 马加鞭的为您充',
                },
                {
                    number:'2.',
                    content:'非渠道充值，所以不能保证及时冲进去。所以客服会快 马加鞭的为您充',
                },
                {
                    number:'3.',
                    content:'非渠道充值，所以不能保证及时冲进去。所以客服会快 马加鞭的为您充',
                }
            ],

            // 充值操作
            sels:[
                {value:'1',week:'梦幻西游'},
                {value:'2',week:'王者荣耀'},
                {value:'3',week:'三国杀'},

            ]

        }
    },

    methods:{

        // 点券
        seleNav(index){
            for(var i in this.denomination_data){
                this.denomination_data[i].i = false;
            }
            console.log(index)
            this.denomination_data[index].i = true;
        },

        // 显示分享
        showShareFn(){
            mui("#sheet-share").popover("toggle");
        },
        // 收藏
        collect() {
            var that = this;
            var token = this.$store.state.token;
            if (token == undefined || token == "") {
                that.$router.push({
                    name: "AccountLogin",
                    params: {
                        redirect: that.$router.currentRoute.name
                    }
                });
            } else {
                that.$axios
                    .post(process.env.API_HOST+"collect", {
                        goods_id: that.goods_id
                    })
                    .then(function(res) {
                        // console.log(res);
                        if (res.status == 200) {
                            if (res.data.code == 200) {
                                if (that.detailData.is_collect == 1) {
                                    that.detailData.is_collect = 2;
                                    mui.toast(res.data.msg, {
                                        duration: "short",
                                        type: "div"
                                    });
                                } else {
                                    that.detailData.is_collect = 1;
                                    mui.toast(res.data.msg, {
                                        duration: "short",
                                        type: "div"
                                    });
                                }
                            }else{
                                mui.toast(res.data.msg,{ duration:'short', type:'div' });
                            }
                        }
                    })
                    .catch(function(err) {});
            }
        },
        // 显示议价框
        bargainFn() {
            var that = this;
            var token = that.$store.state.token;
            // console.log(token);
            if (token) {
                this.showShade = true;
                // var mo = function(e) {
                //     e.preventDefault();
                // };
                // document.body.style.overflow = "hidden";
                // document.addEventListener("touchmove", mo, false); //禁止页面滑动
            } else {
                that.$router.push({ name: "AccountLogin" });
            }
        },
        
        // 购买
        buyFn() {
            var that = this;
            that.showShade1 = true;
        },
        // 购买确认
        confirm(){
            
        },
        // 取消购买弹框
        disappear(){
            var that = this;
            this.showShade1=false;
        },

    },
    mounted(){
        this.bargainFn();
        this.disappear();
    },
}
</script>
<style lang="scss" scoped>
.CardDetails{
    font-family:PingFang SC;
    line-height: .3rem;
    padding-bottom: 1rem;
    height: 16rem;
}
// 点卡面额
.denomination{
    background: #ffffff;
    padding: 0 .15rem 0 .15rem;
}
.denomination-main{
    display: flex;
    align-items: center;
}
.denomination-main img{
    width: .8rem;
    height: .8rem;
    margin: .19rem .24rem .26rem 0;
}
.denomination-box{
    padding-bottom: .01rem;
}
.denomination-main span,.denomination-main-title{
    font-size: .26rem;
    color: #333333FF;
    font-weight:bold;
}
.denomination-main-title{
    margin-bottom: .2rem;
}
.denomination-main-box{
    font-size: .22rem;
    color: #666666FF;
    padding-left: .38rem;
    margin-bottom: .19rem;
    display: flex;
    justify-content: space-between;
    background: url(../../../static/image/recharge-area/initial.png) no-repeat;
    background-size: .25rem .25rem;
}
.denomination-main-box div:nth-child(2){
    width: 2.85rem;
}
.denomination-main-box div:nth-child(2) span:nth-child(1){
    margin-right: .05rem;
}
.new1{
    color: #FFA303FF;
    background: url(../../../static/image/recharge-area/selection.png) no-repeat;
    background-size: .25rem .25rem;
}
// 店铺信誉
.CardDetails-reputation{
    height: 1.2rem;
    background: #FFFFFF;
    margin: .2rem 0;
    padding: .2rem;
    display: flex;
    align-items: center;
}
.CardDetails-logo{
    width: .8rem;
    height: .8rem;
    margin-right: .08rem;
}
.store-name{
    font-size: .28rem;
    color: #333333FF;
}
.head-con-top{
    display: flex;
    align-items: center;
}
.head-con-top img{
    width: .24rem;
    height: .24rem;
    margin-right: .09rem;
}
.head-cash-d,.head-cash{
    font-size: .26rem;
    color: #666666;
    font-weight: 500;
}
.head-cash{
    font-size: .24rem;
    margin-top: .19rem;
}
.head-cash img{
    width: .25rem;
    height: .25rem;
}
.head-cash span:nth-child(1){
    margin-right: .4rem;
}
.head-cash span:nth-child(2){
    margin-right: .1rem;
}
.head-cash span:nth-child(3){
    margin-right: .14rem;
    position: relative;
}
.head-cash span:nth-child(3) span{
    display: inline-block;
    width: .6rem;
    border: 1px solid #FF7800FF;
    position: absolute;
    right: -.36rem;
    bottom: -.04rem;
}
.vant{
    margin: 0 .13rem 0 .11rem;
}
.pledge-box {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba($color: #000000, $alpha: 0.6);
    z-index: 4;
    .pledge {
        background: #fff;
        position: absolute;
        top: 30%;
        width: 6rem;
        left: calc(50% - 3rem);
        border-radius: 0.1rem;
        padding: 0.2rem;
        .pledge-tit {
            color: #ff721c;
            line-height: 0.4rem;
            font-size: 0.3rem;
        }
        .pledge-str {
            margin-top: 0.1rem;
            .pledge-left {
                font-size: 0.24rem;
                color: #000;
            }
            .pledge-right {
                font-size: 0.16rem;
                color: #666666;
            }
        }
    }
}
// 服务保障
.service-guarantee{
    height: .9rem;
    background: #ffffff;
    display: flex;
    align-items: center;
}
.service-guarantee span{
    font-size: .26rem;
    color: #666666;
    margin: 0 .29rem 0 .2rem;
}
.service-guarantee img{
    width: .36rem;
    height: .36rem;
    margin-right: .14rem;
}
// 注意事项
.matters-needing-attention{
    background: #ffffff;
    margin: .2rem 0;
    padding: .2rem 0 .2rem .2rem;
    margin: .2rem 0;
}
.matters-needing-attention-title{
    // margin-top: .1rem;
    font-size: .26rem;
    color: #666666FF;
    margin-bottom: .3rem;
}
.matters-needing-attention-main{
    display: flex;
}
.matters-needing-attention-main div{
    font-size: .24rem;
    line-height: .5rem;
    color: #666666FF;
}
.matters-needing-attention-main div:nth-child(1) span{
    padding: 0 .07rem;
    background: #EEEEEEFF;
    margin: 0 .23rem 0 .29rem;
}
.matters-needing-attention-main div:nth-child(2){
    width: 5.74rem;
}
// 充值操作
.operation{
    background: #ffffff;
    padding: .26rem 0 .33rem .95rem;
}
.operation input{
    width: 2.7rem;
    height: .4rem;
    border: 1px solid #999999FF;
    border-radius: 0;
    font-size: .24rem;
    color: #666666FF;
}
.operation .xl{
    display: flex;
    margin: .35rem 0;
    position: relative;
}
.operation .xl span{
    display: flex;
    align-items: center;
}
.operation .xl div:nth-child(2){
    border: 1px solid #999999FF;
}
select{
    margin-bottom: 0;
    padding: 0 .47rem;
    font-size: .24rem;
    color: #666666FF;
}
.operation span{
    font-size: .24rem;
    color: #666666FF;
}
.operation div:nth-child(1) span{
    margin-right: .29rem;
}
.operation div:nth-child(2) span,.operation div:nth-child(3) span{
    margin-right: .53rem;
}

.operation .xl .kailong{
	width:0;
	height:0;
	border-right:.15rem solid transparent;
	border-left:.15rem solid transparent;
	border-top:.15rem solid #999999FF;
    position: absolute;
    right: 2.8rem;
    top: .16rem;
}
.new2{
	width:0;
    height:0;
	border-right:.15rem solid transparent;
	border-left:.15rem solid transparent;
	border-bottom:.15rem solid #999999FF;
    position: absolute;
    right: 2.8rem;
    top: .16rem;
}
// 底部
.goods-details-bottom {
    max-width: 640px;
    margin: 0.2rem auto 0;
    background: #ffffff;
    display: flex;
    justify-content: flex-start;
    -webkit-box-shadow: 0 -2px 8px #d6d6d6;
    -moz-box-shadow: 0 -2px 8px #d6d6d6;
    box-shadow: 0 -2px 8px #d6d6d6;
    position:fixed;
    left:0;
    right:0;
    bottom:0;
    z-index:4;
}
.goods-details-bottom-left,
.goods-details-bottom-right {
    display: inline-block;
    text-align: center;
}
.goods-details-bottom-left {
    color: #999999;
    width: 1.3rem;
    font-size: 0.24rem;
    padding-top: 0.1rem;
    border-right: 1px solid #dcdcdc;
}
.goods-details-bottom-right {
    width: 2.5rem;
    font-size: 0.3rem;
    line-height: 1rem;
    color: #ffffff;
}
.share img {
    width: 0.43rem;
    height: 0.34rem;
}
.collect img {
    width: 0.4rem;
    height: 0.37rem;
}
.bargain {
    background: -webkit-linear-gradient(#ffcc4b, #feab49);
    background: -o-linear-gradient(#ffcc4b, #feab49);
    background: -moz-linear-gradient(#ffcc4b, #feab49);
    background: linear-gradient(to right, #ffcc4b, #feab49);
}
.rent-btn {
    background:#65BAFF;
}
.outrent-btn{
    background:#999999;
}
.buy {
    background: #feab49;
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

</style>
<style lang="scss">
.van-rate {
    padding-top: 0.05rem;
}
.van-rate__icon {
    font-size: 0.2rem;
}

// 购买弹框
.buy-frame{
    width: 6.37rem;
    height: 3.8rem;
    background: #ffffff;
    padding: .75rem 0 0 .62rem;
    position: relative;
    position: fixed;
    top: 35%;
    left: calc(50% - 3.18rem);
    z-index: 9;
}
.buy-frame div:nth-child(1){
    font-size: .24rem;
    color: #999999FF;
}
.buy-frame div:nth-child(2){
    font-size: .26rem;
    color: #333333FF;
    margin: .28rem 0 .3rem 0
}
.buy-frame div:nth-child(3) input{
    width: 4.86rem;
    height: .65rem;
    border-radius: 0;
    border: 1px solid #666666FF;
}
.buy-frame div:nth-child(4){
    width: 2.25rem;
    height: .65rem;
    background: #FFA303FF;
    font-size: .26rem;
    color: #ffffff;
    border-radius: .1rem;
    text-align: center;
    line-height: .65rem;
    margin: .34rem 0 0 1.44rem;
}
.buy-frame img{
    width: .25rem;
    height: .25rem;
    position: absolute;
    top: .19rem;
    right: .37rem;
}
</style>