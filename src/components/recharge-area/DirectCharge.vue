<template>
    <!-- 直充 -->
    <div class="wrap directcharge">
        <Header v-bind:head_data="head_data"></Header>
        <div class="denomination">
            <div class="denomination-main">
                <img :src="directcharge_img" alt="">
                <span>{{directcharge_name}}</span>
            </div>
            <div class="denomination-box">
                <div>{{denomination_title}}</div>
                <ul>
                    <li v-for="(item,index) in denomination_data" :key="index"> 
                        <span class="name">{{item.denomination_name}}</span>
                        <span class="old">原价：<span>{{item.denomination_original_price}}元</span></span>
                        <span class="new">现价：<span>{{item.denomination_present_price}}</span></span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 注意事项： -->
        <div class="matters-needing-attention">
            <div class="matters-needing-attention-title">{{matters_needing_attention_title}}</div>
            <div class="matters-needing-attention-main" v-for="(item,index) in matters_needing_attention_data" :key="index">
                <div><span>{{item.number}}</span></div>
                <div>{{item.content}}</div>
            </div>
        </div>
        <!-- 充值区 -->
        <div class="recharge-area">
            <div class="operation">
                <div class="xl">
                    <span>充值游戏：</span>
                    <div @click="isxl1=!isxl1">
                        <select style="width: 2.66rem; height: .4rem;">
                            <option class="xllx" v-for="sel in sels1" v-bind:value="sel.value">{{sel.week}}</option>
                        </select>
                    </div>
                    <div :class="{kailong:isxl1,new2: !isxl1}"></div>
                </div>
                <div class="xl">
                    <span>服务器：</span>
                    <div @click="isxl2=!isxl2">
                        <select style="width: 2.66rem; height: .4rem;">
                            <option class="xllx" v-for="sel in sels2" v-bind:value="sel.value">{{sel.week}}</option>
                        </select>
                    </div>
                    <div :class="{kailong:isxl2,new2: !isxl2}"></div>
                </div>
                <div class="xl">
                    <span>客户端：</span>
                    <div @click="isxl3=!isxl3">
                        <select style="width: 2.66rem; height: .4rem;">
                            <option class="xllx" v-for="sel in sels3" v-bind:value="sel.value">{{sel.week}}</option>
                        </select>
                    </div>
                    <div :class="{kailong:isxl3,new2: !isxl3}"></div>
                </div>
                <div>
                    <span>确认账号：</span><input type="text">
                </div>
            </div>

            <div class="recharge-amount">
                <div class="recharge-amount-title">{{recharge_amount_title}}</div>
                <div class="recharge-amount-main">
                    <div class="recharge-amount-box" v-for="(item,index) in recharge_area_data" :key="index" :class="{'new1': item.i}" @click="recharge(index)">
                        <span>{{item.name}}</span><span>元</span>
                        <img v-show="item.i" src="../../../static/image/recharge-area/selection1.png" alt="">
                    </div>
                    <input class="money" type="text">
                </div>
                
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
            <div class="buy goods-details-bottom-right" @click="buyFn()" >立即购买</div>
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
export default {
    components:{
        Header,
    },
    data(){
        return{
            head_data: {
                show_type:2,
                right_icon:2,
                tit_text:'直充',
            },
            isxl1:true,
            isxl2:true,
            isxl3:true,

            // 底部
            detailData: {},
            bargain_price: "",
            password:"",
            showShade1: false,
            showShade: false,
            isShowKind:false,//点击显示租号套餐列表
            url:null,//当前页的url

            directcharge_img:'../../static/image/recharge-area/dota2.png',
            directcharge_name:'DOTA2',
            denomination_title:'请选择点卡面额：',
            // 面额
            denomination_data:[
                {   
                    denomination_name:'2000钻',
                    denomination_original_price:'350',
                    denomination_present_price:"¥200",
                },
                {   
                    denomination_name:'2000钻',
                    denomination_original_price:'350',
                    denomination_present_price:"¥200",
                },
                {   
                    denomination_name:'2000钻',
                    denomination_original_price:'350',
                    denomination_present_price:"¥200",
                },
                {   
                    denomination_name:'2000钻',
                    denomination_original_price:'350',
                    denomination_present_price:"¥200",
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
            // 充值区
            // 充值操作
            sels1:[
                {value:'1',week:'梦幻西游'},
                {value:'2',week:'王者荣耀'},
                {value:'3',week:'三国杀'},

            ],
            sels2:[
                {value:'1',week:'再续前缘'},
                {value:'2',week:'孤芳自赏'},
                {value:'3',week:'风华绝代'},

            ],
            sels3:[
                {value:'1',week:'安卓'},
                {value:'2',week:'苹果'},

            ],
            recharge_amount_title:'充值金额：',
            recharge_area_data:[
                {
                    name:'10',
                    i:true
                },{
                    name:'30',
                    i:false
                },{
                    name:'50',
                    i:false
                },{
                    name:'100',
                    i:false
                },{
                    name:'300',
                    i:false
                },{
                    name:'500',
                    i:false
                },{
                    name:'1000',
                    i:false
                },{
                    name:'其他',
                    i:false
                }
            ]

        }
    },
    methods:{

        recharge(index){
            for(var i in this.recharge_area_data){
                this.recharge_area_data[i].i = false;
            }
            console.log(index)
            this.recharge_area_data[index].i = true;
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
        }

    },
    mounted(){
        this.bargainFn();
        // this.goBargain();
        this.confirm();
        this.disappear();
    },

}
</script>

<style lang="scss" scoped>

.directcharge{
    font-family:PingFang SC;
    font-weight: 500;
    line-height: .3rem;
    padding-bottom: 1rem;
    height: 17rem;
}
.denomination{
    background: #ffffff;
    padding: 0 .2rem;
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
.denomination-main span,.denomination-box div:nth-child(1){
    font-size: .26rem;
    color: #333333FF;
    font-weight:bold;
}
.denomination-box ul{
    padding: .19rem 0 .08rem .19rem;
}
.denomination-box ul li{
    font-size: .26rem;
    color: #666666FF;
    margin-bottom: .19rem;
}
.denomination-box ul li .new span{
    color: #FFA303FF;
}
.denomination-box ul li .name{
    margin-right: 1.67rem;
}
.denomination-box ul li .old{
    margin-right: .33rem;
}
// 注意事项
.matters-needing-attention{
    background: #ffffff;
    margin: .2rem 0;
    padding: .2rem 0 .2rem .2rem;
}
.matters-needing-attention-title{
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
// 充值区
// 充值操作
.operation{
    background: #ffffff;
    padding-top:.01rem;
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
    align-items: center;
    margin: .35rem 0;
    position: relative;
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
.operation div:nth-child(1) span,.operation div:nth-child(4) span{
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
// 充值金额
.recharge-area{
    height: 6.3rem;
    background: #ffffff;
    padding: 0 .6rem 1rem .6rem;
}
.recharge-amount{
    font-size: .24rem;
    color: #666666FF;
}
.recharge-amount-title{
    padding: .33rem 0 .19rem 0;
}
.recharge-amount-main{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
}
.recharge-amount-main .money{
    width: .7rem;
    height: .3rem;
    font-size: .2rem;
    color: #666666FF;
    border: none;
    padding: 0;
    margin-bottom: .175rem;
    position: absolute;
    right: .29rem;
    bottom: .125rem;
    border-radius: 0;
}
.recharge-amount-box{
    width: 1.5rem;
    height: .5rem;
    margin-right: .1rem;
    background: #EEEEEEFF;
    margin-bottom: .2rem;
    text-align: center;
    line-height: .5rem;
    position: relative;
}
.recharge-amount-main div:nth-child(4n){
    margin-right: 0;
}
.recharge-amount-box img{
    width: 1.5rem;
    height: .5rem;
    position: absolute;
    top: 0;
    left: 0;
}
.recharge-amount-main div:nth-child(8){
    display: flex;
    justify-content: space-between;
    pointer-events: none;
}
.new1{
    background: url(../../../static/image/recharge-area/selection1.png) no-repeat;
    background-size: 100% 100%;
}

// 底部
.goods-details-bottom {
    max-width: 640px;
    height: 1rem;
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