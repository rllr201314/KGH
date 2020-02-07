<template>
    <div class="payment-wrap">
        <div class="info-title" :class="payInfo.showTitle?'borderBottom':''">
            <img  v-if="payInfo.showTitle" src="../../../static/img/goodscreen/vertical.png" alt="">
            <span>请选择支付方式</span>
        </div>
        <div class="pay-cell-content">
            <div class="pay-online" @click="seleLine('online')">
                <img :src="payInfo.payment.online?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'" alt="">
                <span>在线支付</span><span class="red-color">（建议2万元以内订单）</span>
            </div>
            <div class="showPay" v-show="payInfo.payment.online">
                <div class="pay-strip" v-for="item in payInfo.online" @click="selePayFun(item.key)" :class="item.issele?'red-border':'black-border'">
                    <img :src="item.imgsrc" alt="">
                </div>
            </div>
            <div class="pay-online"  @click="seleLine('noline')">
                <img :src="payInfo.payment.noline?'../../../static/img/order/okcheck.png':'../../../static/img/order/nocheck.png'" alt="">
                <span>线下支付(转账）</span><span class="red-color">建议大额订单</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'Payment',
        
        props:['payInfo'],
        data(){
            return {
                // payInfo:{
                //     showTitle:true,
                //     payment:{
                //         online:true,
                //         noline:false
                //     },
                //     online:[{
                //             key:'visa',
                //             issele:true,
                //             imgsrc:'./static/img/order/visa.png',
                //         },{
                //             key:'wx',
                //             issele:false,
                //             imgsrc:'./static/img/order/wxpay.png',
                //         },{
                //             key:'zfb',
                //             issele:false,
                //             imgsrc:'./static/img/order/zfbpay.png',
                //         }]
                // }
            }
        },
        methods:{
            seleLine(flag){
                if(flag == 'noline'){
                    this.payInfo.payment.noline = true;
                    this.payInfo.payment.online = false;     
                }else if(flag == 'online'){
                    this.payInfo.payment.noline = false;
                    this.payInfo.payment.online = true;                
                }   
            },
            selePayFun(opt){
                var payAll = this.payInfo.online;
                for(var i in payAll){
                    if(opt == payAll[i].key){
                        payAll[i].issele = true;
                        continue;
                    }
                    payAll[i].issele=false;
                }
            }
        }
    }
</script>
<style scoped>
    .borderBottom{
        border-bottom:.01rem solid #E5E5E5;
    }
    .info-title{
        line-height:.7rem;
    }
    
    .info-title span{
        display: inline-block;
        color:#333333;
        font-size:.28rem;
    }
    .info-title img{
        width:.13rem;
        height:.29rem;
        margin-left:.17rem;
        vertical-align:middle;
    }

    .pay-cell-content{
        padding:.3rem 0 .4rem .5rem;
        font-size:.26rem;
    }
    .pay-online{
        margin-bottom:.3rem;
    }
    .pay-online img{
        width:.22rem;
        height:.22rem;
        vertical-align: middle;
    }
    .showPay{
        display:flex;
        justify-content: flex-start;
        margin:0 0 .3rem;
        padding-left:.4rem;
    }

    .pay-strip{
        width:1.4rem;
        height:.58rem;
        margin-right:.5rem;
        overflow: hidden;
    }
    .pay-strip img{
        width:1.4rem;
        height:.58rem;
    }
    .red-border{
        border:.01rem dashed #FE7649;
    }
    .black-border{
        border:.01rem dashed #DCDCDC;
    }
</style>
