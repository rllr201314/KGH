<template>
    <!-- 下单 -->
    <div class="wrap">
        <!-- 头部 -->
        <Header v-bind:head_data="head_data"></Header>
        <div class="placeOrder-content">
            <!-- 商品详情 -->
            <div class="placeOrder-cell">
                <img class="badge" src="../../../../static/img/badge/rent-badge.png" alt="">
                <div class="goods-info-top">
                    <img src="../../../../static/image/vertical.png" alt="">
                    <span>商品详情</span>
                </div>
                <div class="goods-info-content"  @click="showAttributeFn(true)">
                    <img class="game-log" :src="goodsInfo.game_logo" alt="">
                    <div class="goods-info">
                        <div class="goods-info-title" v-text="goodsInfo.goods_title"></div>
                    </div>
                    <img class="right-next" src="../../../../static/img/my-center/next_ico.png" alt="">
                </div>
            </div>
            <div class="goods-info-box" @click="showAttributeFn(false)" v-show="show_attribute">
                <div class="goods-info-strip">
                    <div class="text-left">系统</div>
                    <div class="text-right" v-if="goodsInfo.server_name != null" v-text="goodsInfo.platform_name+'>'+ goodsInfo.area_name+'>'+goodsInfo.server_name"></div>
                    <div class="text-right" v-else v-text="goodsInfo.platform_name+'>'+ goodsInfo.area_name"></div>
                </div>
                <div class="goods-info-strip" v-if="goodsInfo.rent_method == 2">
                    <div class="text-left">商品类型</div>
                    <div class="text-right" >租号</div>
                </div>
                <div class="goods-info-strip" v-if="false">
                    <div class="text-left">账号绑定</div>
                    <div class="text-right" v-text="goodsInfo.account_bind"></div>
                </div>
                <div class="goods-info-strip" v-for="(item,index) in extend_attribute" :key="index">
                    <div class="text-left" v-text="item.title"></div>
                    <div class="text-right" v-text="item.value"></div>
                </div>
            </div>
            <div class="shade" @click="showAttributeFn(false)" v-show="show_attribute"></div>
            <!-- 联系方式 -->
            <div class="contact-wrap placeOrder-cell" v-if="orderType">
                <div class="goods-info-top">
                    <img src="../../../../static/image/vertical.png" alt="">
                    <span>联系方式</span>
                </div>
                <div class="contact-content">
                    <div class="contact-cell inpright">
                        <span class="celltext">微信号</span>
                        <input type="text" placeholder="请输入您的微信号" v-model="wx">
                    </div>
                    <div class="contact-cell inpright">
                        <span class="celltext">手机号</span>
                        <input type="number" placeholder="请输入您的手机号" v-model="phone">
                    </div>
                    <div class="contact-bottom dominant-color">请输入您真实的联系方式，以方便客服能在交易过程中的第一时间联系到您。</div>
                </div>
            </div>
            <!-- 订单详情 -->
            <div class="placeOrder-cell">
                <div class="goods-info-top">
                    <img src="../../../../static/image/vertical.png" alt="">
                    <span>订单详情</span>
                </div>
                <div class="contact-content">
                    <div class="contact-cell" v-if="orderType">
                        <span class="celltext">押金</span>
                        <div class="cell-right">
                            <span class=" price">￥
                                <span v-text="goodsInfo.cash"></span>
                            </span>
                        </div>
                    </div>
                    <div class="contact-cell" @click="showTerm">
                        <span class="celltext">租期</span>
                        <div class="cell-right descount">
                            <span class="hint orange" v-if="false">(租7天享9折，租30天享8折)</span>
                            <span class="grey-color" v-text="tenancy_term"></span><span class="grey-color" v-text="goodsInfo.rent_unit"></span>
                            <img src="../../../../static/img/order/next.png" alt="">
                        </div>
                    </div>
                    <div class="contact-cell" v-if="false">
                        <span class="celltext">租金<span class="gray-color">(￥<span v-text="goodsInfo.day_rent"></span>/<span v-text="goodsInfo.rent_unit"></span>)</span></span>
                        <div class="cell-right">
                            <span class="price">￥
                                <span v-text="tremPirce"></span>
                            </span>
                        </div>
                    </div>
                    <div class="contact-cell">
                        <span class="celltext">租金<span class="gray-color">(￥<span v-text="goodsInfo.day_rent"></span>/<span v-text="goodsInfo.rent_unit"></span>)</span></span>
                        <div class="cell-right">
                            <span v-show="hint_text != ''" v-if="false">
                                <span class="chunk gray-bg">原价</span>
                                <span class="unit-price">￥
                                    <span v-text="tremPirce"></span>
                                </span>
                                <span class="chunk  red-bg" v-text="hint_text"></span>
                            </span>
                            <span class="price">￥
                                <span v-text="tremPirce"></span>
                            </span>
                        </div>
                    </div>
                    <div class="contact-cell" >
                        <span class="celltext">优惠券</span>
                        <div class="cell-right descount">
                            <span class="gray-color">无可用优惠券</span>
                            <img src="../../../../static/img/order/next.png" alt="">
                        </div>
                    </div>
                    <div class="contact-cell" v-show="totalPrice != null">
                        <div class="cell-right">
                            <div class="total-price price">
                                实际支付：<span class="dominant-color">￥</span><span class="dominant-color" v-text="totalPrice"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="protocol">
            <img :src="protocol?'../../../../static/img/goodscreen/okcheck.png':'../../../../static/img/goodscreen/nocheck.png'" alt="" @click="lookFn">
            <div>我已阅读<span class="dominant-color" @click="getProtocol">《看个号平台交易协议》</span>
            </div>
        </div>
        <Protocal v-bind:proData="proData" v-on:isProFn="isProFn"></Protocal>
        <div class="nextBtn button" @click="goPayFn">下一步</div>

        <div class="pop-view" v-show="showTime">
            <div class="pop-tit">您希望租号的时长（<span v-text="goodsInfo.rent_unit"></span>）</div>
            <input type="number" placeholder="请输入您的租用时长" ref="inp_time" oninput="if(value.length>3)value=value.slice(0,3)" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')">
            <div class="btn-wrap">
                <div class="okbtn button" @click="affirmFn">确认</div>
                <div class="cancel" @click="cancelFn">取消</div>
            </div>
        </div>
        <!-- 遮罩 -->
        <div class="orderShade" v-show="showOrderShade" @click="hiddenFn"></div>
        <Loading class="black-bg" v-if="showNoData"></Loading>
    </div>
</template>
<script>
import Header from "@/components/home-page/Header"; //头部
import Loading from "@/components/multi/Loading";
import Protocal from "@/components/multi/Protocal";

export default {
    name: "RentPlaceOrder",
    components: {
        Header,
        Loading,
        Protocal
    },
    data() {
        return {
            head_data:{
                show_type: 2,
                go_back: 1,
                right_icon: 2,
                tit_text: '商品下单',
            },
            orderType:true,//true 下单 false 续租
            proData: {
                isShow: false,
                con: "",
                btn: "确认已读",
                val: ""
            },

            tenancy_term:'',//租期
            hint_text:'',//几折
            break_price:'',//折后钱数
            // showMenu:false,//显示租期选项
            // optionData:[{name:'7天',value:1},{name:'8天',value:2}],
            showPro:false,//是否显示协议
            protocalText:'',//协议
            protocol: true, //阅读协议
            showNoData:true,
            goodsInfo: {},
            num: 1,
            phone:'',
            wx:'',
            tremVal:'',//选择租期值
            tremPirce:0,//租期*日租金=租金
            showTime:false,//--------------------------------------------------------------------点击下一步显示 
           
            showOrderShade: false, //遮罩
            totalPrice:null,
            // 是否分期
            operaStage: {
                stage: false,
                noStage: true
            },
            // 是否购买保险
            operaSafe: {
                safe: true,
                noSafe: false
            },
            show_attribute:false,
            extend_attribute:[],
        };
    },
    watch:{
        tenancy_term(newVal,oldVal){
            if(newVal >= 7 && newVal < 30){
                this.hint_text = '9折';
                this.break_price = parseInt(this.tremPirce * 0.9);
                
            }else if(newVal >= 30){
                this.hint_text = '8折';
                this.break_price = parseInt(this.tremPirce * 0.8);
            }else{
                this.hint_text = '';
                this.break_price = this.tremPirce;
            }
            if(this.orderType){
                this.totalPrice = this.tremPirce + Number(this.goodsInfo.cash);
            }else{
                this.totalPrice = this.tremPirce;
            }
        }
    },
    methods: {
        showAttributeFn(flag){
            var that = this;   
            if(flag){
                that.show_attribute = true;
            }else{
                that.show_attribute = false;
            }
        },
        // 隐藏遮罩
        hiddenFn(){
            this.showTime = false;
            this.showOrderShade = false;
        },
        // 显示租期选项
        showTerm(){
            this.showOrderShade = true;
            this.showTime = true;
        },
        // 选择租期
        // seleTrem(val){
        //     var that = this;
        //     var data = that.optionData;
        //     for(var i in data){
        //         if(val == data[i].value){
        //             that.tenancy_term = data[i].name;
        //             that.tremVal = val;
        //             break;
        //         }
        //     }
        //     that.hiddenFn();
        // },
        // 协议
        getProtocol(){
            var that = this;
            that.$axios.post(process.env.API_HOST+'protocolSafe').then((res)=>{
                // console.log(res);
                if(res.status == 200){
                    if(res.data.code == 200){
                        that.proData.isShow = true;
                        that.proData.con = res.data.data;
                        that.proData.val = true;
                    }
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        isProFn(flag){
            var that = this;
            if(flag){
                that.protocol = true;
            }
        },
        // 商品数量
        addbtn(flag) {
            var that = this;
            if (flag == "sub") {
                that.num--;
                if (that.num <= 0) {
                    that.num = 1;
                }
            } else if (flag == "add") {
                that.num++;
            }
        },
        // 确认
        affirmFn(){
            var that = this;
            var val = that.$refs.inp_time.value;
            var data = that.goodsInfo;
            //下单
            if(that.orderType){
                if(Number(val) >= Number(data.least_lease)){
                    that.tremPirce = Number(data.day_rent) * val;
                    that.tenancy_term = val;
                    that.$refs.inp_time.value = '';
                    that.hiddenFn();
                }else{
                    mui.alert('租期不得小于最短租期','提示','确认','','div');
                }
            }else{
                that.tremPirce = Number(data.day_rent) * val;//租金/天 * 天数
                that.tenancy_term = val;
                that.$refs.inp_time.value = '';
                that.hiddenFn();
            }
            
        },
        // 取消
        cancelFn(){
            var that = this;
            that.$refs.inp_time.value = '';
            that.hiddenFn();
        },
        // 阅读协议
        lookFn(){
            this.protocol = !this.protocol;
        },
        getData() {
            var that = this;
            that.$axios
                .post(process.env.API_HOST+"rentInfo", {
                    goods_id: that.$route.query.goods_id,
                    package_id:that.$route.query.package_id?that.$route.query.package_id:'',
                })
                .then(res => {
                    // console.log(res);
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            that.goodsInfo = res.data.data;
                            that.tenancy_term = res.data.data.least_lease;
                            that.tremPirce = Number(res.data.data.day_rent) * Number(res.data.data.least_lease);
                            that.showNoData = false;
                            that.extend_attribute = that.goodsInfo.goods_attribute;
                        }else if(res.data.code == 400){
                            that.showNoData = true;
                            mui.alert(res.data.msg,'提示','确认',function(){
                                that.$router.go(-1);
                            },'div')
                        } 
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 续租
        goRelect(id){
            var that = this;
            that.$axios.post(process.env.API_HOST+'reletInfo',{
                order_id:id
            }).then((res)=>{
                // console.log(res);
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        that.goodsInfo = res.data.data;
                        that.tenancy_term = res.data.data.least_lease;
                        that.tremPirce = Number(res.data.data.day_rent) * Number(res.data.data.least_lease);
                        that.showNoData = false;
                        that.extend_attribute = that.goodsInfo.goods_attribute;
                        that.totalPrice = Number(that.tremPirce);
                    }else if(res.data.code == 400){
                        that.showNoData = true;
                        mui.alert(res.data.msg,'提示','确认',function(){
                            that.$router.go(-1);
                        },'div')
                    } 
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        goPayFn(){
            var that = this;
            var request = {};
            // 判断如果是下单的话填写联系方式 续租不用
            if(that.orderType){
                 // 微信
                if (that.wx == "") {
                    mui.alert("请输入微信账号", "提示", "确认", "", "div");
                    return false;
                }else{
                    var reg = /[\u4e00-\u9fa5]/g;
                    if(that.wx.match(reg)){
                        mui.alert("请输入正确微信账号", "提示", "确认", "", "div");
                        return false;
                    }
                     request.wx = that.wx;
                }
                // 手机号
                if (that.phone == "") {
                    mui.alert("请输入手机号", "提示", "确认", "", "div");
                    return false;
                }else{
                    var reg = /^1[3-9][0-9]{9}$/g;
                    if (!that.phone.match(reg)) {
                        mui.alert("您输入的手机号不正确","提示","确定","","div");
                        return false;
                    }
                    request.mobile = that.phone;
                }
                request.goods_id = that.$route.query.goods_id;//下单的goods_id
            }else{
                request.order_id = that.$route.query.order_id;
            }
            if(that.$route.query.package_id){
                request.package_id = that.$route.query.package_id;
            }

            if(that.tenancy_term == ''){
                mui.alert("请选择租期", "提示", "确认", "", "div");
                return false;
            }else{
                request.lease_time = that.tenancy_term;
            }
            // 判断是否勾选协议
            if(!that.protocol){
                mui.alert("请阅读并同意《看个号平台交易协议》","提示","确定","","div");
                return false;
            }
            if(that.orderType){
                request.pay_type = 4;//租号下单****
            }else{
                request.pay_type = 6;//续租下单***
            }
            request = JSON.stringify(request)
            sessionStorage.info = request;
            that.$router.push({name:'Pay',params:{info:request}})
            
        }
    },
    mounted() {
        var that = this;
        if(that.$route.query.goods_id != "" && that.$route.query.goods_id != undefined) {
            that.getData();
        }else if(that.$route.query.order_id != "" && that.$route.query.order_id != undefined){
            that.goRelect(that.$route.query.order_id);
            that.orderType = false;//续租--不展示联系方式和押金
        } else {
            that.$router.go(-1);
        }
    }
};
</script>
<style scoped>
.placeOrder-content {
    padding: 0.2rem 0.2rem 0;
}
/* 商品信息 */
.placeOrder-cell {
    background: #ffffff;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    box-shadow: 0.06rem 0.05rem 0.09rem #d6d6d6;
    margin-bottom: 0.2rem;
    position: relative;
}
.badge{
    width:1.03rem;
    height:1rem;
    position: absolute;
    top:0;
    right: 0;
}
.goods-info-top {
    line-height: 0.7rem;
    border-bottom: 0.01rem solid #e5e5e5;
}

.goods-info-top span {
    display: inline-block;
    color: #333333;
    font-size: 0.28rem;
}
.goods-info-top img {
    width: 0.1rem;
    height: 0.29rem;
    margin-left: 0.17rem;
    vertical-align: middle;
    border-radius: 0.1rem;
}

.goods-info-content {
    padding: 0.2rem 0;
    font-size: 0.26rem;
    color: #666666;
}
.game-log{
    width: 1.1rem;
    height: 1.1rem;
    margin: 0 0.6rem 0 0.35rem;
    vertical-align: middle;
}
.right-next{
    width:.13rem;
    height:.24rem;
    vertical-align: middle;
    margin-right:.2rem;
}
.goods-info {
    display: inline-block;
    width: 4.5rem;
    vertical-align: middle;
}
.goods-info-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333333;
}

.goods-info-box {
    max-width: 630px;
    margin:0 auto;
    background: #ffffff;
    font-size: 0.26rem;
    color: #666666;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.2rem;
    line-height: .4rem;
    padding:.2rem .38rem;
    left:.2rem;
    right:.2rem;
    position: fixed;
    z-index:6;
}
.goods-info-strip{
    display:flex;
    align-items: top;
    margin-bottom:.1rem;
    user-select:text;
}
.text-left{
    color: #666666;
    min-width:1.5rem;
    margin-right:.3rem;
}
.text-right{
    color: #333333;
    word-break: break-all;
    white-space: normal;
}
.shade {
    position: fixed;
    left: 0;
    top: .88rem;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 4;
    margin:0 auto;
    max-width:640px;
}
.goods-info-left{
    width: 40%;
    overflow: hidden;
}
.goods-info-left div {
    margin-bottom: 0.1rem;
    white-space: nowrap;
}
.goods-info-right div {
    margin-bottom: 0.1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #333333;
}
.contact-content {
    padding-left: 0.2rem;
}
.contact-cell {
    line-height: 0.9rem;
    border-bottom: 0.01rem solid #e5e5e5;
    padding-right: 0.2rem;
}
.contact-cell::after {
    display: block;
    clear: both;
    content: "";
}
.inpright input {
    width: 70%;
    text-align: right;
    border: 0;
    margin: 0;
    height: 0.9rem;
    float: right;
}
.celltext {
    color: #666666;
    font-size: 0.26rem;
    display: inline-block;
    min-width: 1.35rem;
}
.hint{
    font-size:.26rem;
}
.orange{
    color:#FF9D1D;
}


.contact-bottom {
    padding: 0.17rem;
    font-size: 0.24rem;
    line-height: .3rem;
}
/*  */
.cell-right {
    float: right;
}
/* 价格 */
.price {
    font-size: 0.26rem;
    color: #333333;
}
.chunk{
    display: inline-block;
    width:.65rem;
    line-height:.35rem;
    font-size:.26rem;
    text-align:center;
    color:#FFFFFF;
}
.gray-bg{
    background:#bdbcbc;
}
.red-bg{
    background:#ff2a2a;
}
.unit-price{
    text-decoration: line-through;
    color:#999999;
    font-size:.26rem;
    margin-right:.3rem;
}

/* 商品数量 */
.raise-good input {
    width: 0.8rem;
    height: 0.42rem;
    padding: 0 0.05rem;
    outline: none;
    border: 0.01rem solid #d2d2d2;
    vertical-align: middle;
    margin: 0 0.2rem;
}
.raise-good img {
    width: 0.29rem;
    height: 0.29rem;
    vertical-align: middle;
}
/*  */
.order-cell {
    border-bottom: 0.01rem solid #e5e5e5;
    padding: 0.2rem 0.2rem 0.2rem 0;
}
/* 优惠券 */
.descount img {
    width: 0.13rem;
    height: 0.24rem;
    vertical-align: middle;
}
.grey-color{
    color: #666666;
    font-size: 0.24rem;
}
.gray-color {
    color: #999999;
    font-size: 0.24rem;
}
.periodsNum{
    min-width:.8rem;
    color:#333333;
    display: inline-block;
}
/* 选项 */
.sele-opera {
    width: 5rem;
    display: inline-block;
}
.opera {
    display: inline-block;
    margin-right: 0.7rem;
}
.opera img {
    width: 0.22rem;
    height: 0.22rem;
    vertical-align: middle;
}
.opera span {
    font-size: 0.26rem;
    color: #333333;
    vertical-align: middle;
}
/* 首付金额 */
.downPay-left {
    margin-top: 0.1rem;
}
.downPay-left,.downPay-right {
    vertical-align: top;
}
.downPay-right input {
    width: 3rem;
    height: 0.5rem;
    margin: 0;
    padding: 0 0.1rem;
}
.custom{
    color: #FFFFFF;
    font-size: 0.26rem;
    background:#fc5f4e;
    display: inline-block;
    margin-left:.5rem;
    width:.8rem;

    text-align:center;
}
.sele-downPay {
    line-height: 0.5rem;
    color: #333333;
    font-size: 0.24rem;
    border: 0.01rem solid #d2d2d2;
    -webkit-border-radius: 0.06rem;
    -moz-border-radius: 0.06rem;
    border-radius: 0.06rem;
    padding: 0 0.15rem;
    display: inline-block;
    margin-bottom: 0.2rem;
}
.sele-downPay span {
    margin-right: 0.5rem;
    vertical-align: middle;
}
.sele-downPay img {
    width: 0.2rem;
    height: 0.1rem;
    vertical-align: middle;
}
.sole {
    color: #333333;
    font-size: 0.26rem;
    margin-left: 0.1rem;
}

/* 协议 */
.protocol {
    margin: 0 0 0.2rem;
    padding: 0 0.2rem;
}
.protocol img {
    width: 0.28rem;
    height: 0.28rem;
    vertical-align: middle;
}
.protocol div {
    display: inline-block;
    font-size: 0.22rem;
}
/* 下一步 */
.nextBtn {
    color: #ffffff;
    font-size: 0.28rem;
    margin: 0 auto 0.3rem;
    width: 6.5rem;
    text-align: center;
    line-height: 0.8rem;
    -webkit-border-radius: 0.1rem;
    -moz-border-radius: 0.1rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    -moz-box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    box-shadow: 0.06rem 0.05rem 0.09rem #fd915f;
    /* background: -webkit-linear-gradient(#fd915f, #fc534a);
    background: -o-linear-gradient(#fd915f, #fc534a);
    background: -moz-linear-gradient(#fd915f, #fc534a);
    background: linear-gradient(to right, #fd915f, #fc534a); */
}
.orderShade {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 8;
}

/* ==========input========= */
input {
    font-size: 0.24rem;
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

.black-bg{
    background:rgba(255, 255,255, 1);
}


/* 协议 */
.pop-view{
    background:#ffffff;
    width:5rem;
    position: fixed;
    top:30%;
    left: calc(50% - 2.5rem);
    z-index:15;
    border-radius: .1rem;
    padding:.4rem .2rem;
}
.pop-tit{
    font-size:.28rem;
    color:#666666;
    margin-bottom: .2rem;
}
.pop-view input{
    margin-bottom:.4rem;
    padding: .4rem .2rem;
}
.btn-wrap{
    display: flex;
    justify-content: space-around;
    font-size:.26rem;
}
.btn-wrap div{
    width:1.89rem;
    line-height:.6rem;
    text-align: center;
    border-radius: .3rem;
    color:#ffffff;
}
.okbtn{
    /* background: -webkit-linear-gradient(#fd915f, #fc534a);
    background: -o-linear-gradient(#fd915f, #fc534a);
    background: -moz-linear-gradient(#fd915f, #fc534a);
    background: linear-gradient(to right, #fd915f, #fc534a); */
}
.cancel{
    background:#C6C6C6;
}

.type-mu{
    min-height:2rem;
    color: #333333;
    font-size: 0.28rem;
    background:#FFFFFF;
    text-align:center;
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    z-index:50;
    max-width: 640px;
    margin:0 auto;
}
.pop-view-tit,.pop-view-bot{
    line-height: .9rem;
}
.pop-view-con{
    height:.2rem;
    background:rgba(0,0,0,0.3);
}
.type-mu ul{
    border-top:1px solid #e5e5e5;
    border-bottom:1px solid #e5e5e5;
    max-height:4rem;
    overflow-y:scroll;
}
/* 弹出框 */
.option-gray {
    color: #666666;
    font-size: 0.28rem;
}
.option-black {
    font-weight: 100;
    line-height:.9rem;
    border-bottom:1px solid #e5e5e5;
}

</style>
