<template>
    <div class="wrap">
        <Header v-bind:head_data="head_data"></Header>
        <div class="pay-content">
            <div class="tit">
                请使用微信扫码
            </div>
            <div class="con">
                <vue-qr :text="url" :size="210"></vue-qr>
                <div class="hint">
                    <div>暂时只支持手机扫码</div>
                    <div>不支持长按识别</div>
                </div>
            </div>
            <div class="fot">
                <img src="../../../static/img/wechatpay.png" alt="">
                <span>微信支付</span>
            </div>
            <div class="hint-bot">付款完成后请<span class="orange-color dominant-color" @click="goBuyAll">点击此处</span></div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/home-page/Header'//头部
import VueQr from 'vue-qr'
export default {
    name:'WechatPay',
    components:{
        Header,
        VueQr
    },
    data(){
        return {
            head_data:{
                show_type:2,
                right_icon:2,
                tit_text:"微信支付",
                showBack:false,//显示后退按钮
                showLogo:2,//不显示头部log
                showShare:3,//1搜索2分享
                showBg:true,//是否显示背景
            },
            url:'',
        }
    },
    methods:{
        goBuyAll(){
            this.$router.push({name:'BuyOrderAll'})
        }
    },
    mounted(){
        if(this.$route.query.url){
            this.url = this.$route.query.url;
        }else{
            this.$router.go(-1);
        }
    }
}
</script>
<style scoped>
.pay-content{
    text-align:center;
}
.tit{
    color:#22AB39;
    font-size:.76rem;
    line-height:1.3rem;
    background:#FFFFFF;
    /* font-weight:bold; */
    padding:1rem 0 .5rem;
}
.con{
    padding:.74rem 0 .59rem;
    background:#22AB39;
}
.hint{
    font-size:.38rem;
    line-height:.6rem;
    /* font-weight:bold; */
    margin:0 auto;
    color:#ffffff;
    padding-top:.57rem;
    text-align:center;
}
.fot{
    background:#ffffff;
    padding:.4rem 0 .6rem;
    color:#000000;
    font-size:.62rem;
}
.fot img{
    width:1rem;
    height:1rem;
    margin-right:.25rem;
    vertical-align: middle;
}
.hint-bot{
    font-size:.26rem;
    color:#666666;
    margin-top:.3rem;
}
.orange-color{
    /* color:#ff7e4a; */
    text-decoration: underline;
}
</style>
