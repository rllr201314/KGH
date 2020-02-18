<template>
    <!-- 提现 -->
    <div class="wrap">
        <Header v-bind:head_data="comData.head_data"></Header>
        <div class="withdraw-title">
            <div class="auciton-status" @click="seleWithStatus('balance')" :class="withdrawStatus?'switching':''">余额提现</div>
            <div class="auciton-status" @click="seleWithStatus('deposit')" :class="withdrawStatus?'':'switching'">押金提现</div>
        </div>
        <div class="withdraw-content">
            <!-- 余额提现 -->
            <div class="card-strip withdraw-cell" @click="seleCard">
                <div class="left-strip" v-text="withdrawInfo.name"></div>
                <div class="right-strip">
                    <span v-text="withdrawInfo.open_bank"></span>
                    <span v-text="withdrawInfo.account"></span>
                    <img src="../../../../static/img/order/next.png" alt="">
                </div>
            </div>
            <div class="balance-wrap" v-show="withdrawStatus">
                <div class=" withdraw-cell">
                    <div class="withdraw-strip">
                        <div class="left-strip">可提现金额</div>
                        <div class="right-strip">
                            <span>￥</span><span v-text="Number(withdrawInfo.remain_amount)"></span>
                            <span class="blue-color" @click="withdrawAll('balance')">全部提取</span>
                        </div>
                    </div>
                    <div class="withdraw-strip">
                        <div class="left-strip">提现金额</div>
                        <div class="right-strip">
                            <input type="number"  v-model="out_money" placeholder="0">
                            <span>元</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 押金提现 -->
            <div class="balance-wrap" v-show="!withdrawStatus">
                <div class=" withdraw-cell">
                    <div class="withdraw-strip">
                        <div class="left-strip">可提现金额</div>
                        <div class="right-strip">
                            <span>￥</span><span v-text="withdrawInfo.deposit_amount"></span>
                            <span class="blue-color" @click="withdrawAll('deposit')">全部提取</span>
                        </div>
                    </div>
                    <div class="withdraw-strip">
                        <div class="left-strip">提现金额</div>
                        <div class="right-strip">
                            <input type="number" v-model="deposit_price" placeholder="0">
                            <span>元</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="hint">提现申请提交后，余额将被暂时冻结（无法使用）</div>
        </div>
        <div class="okBtn button" @click="withdrowFn">预计24小时内到账，确认提现</div>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Header from '@/components/home-page/Header'
import Loading from "@/components/multi/Loading";
    export default {
        name:'WithdrawDeposit',
        components:{
            Header,
            Loading
        },
        data(){
            return {
                comData:{
                    head_data:{
                        show_type: 2,
                        tit_text: '提现',
                        right_icon: 2,
                    }
                },
                showLoading:false,
                withdrawStatus:true,//true余额false押金
                withdrawInfo:{},
                out_money:'',
                deposit_price:'',
            }
        },
        methods:{
            // 选择默认银行卡
            seleCard(){
                var that = this;
                that.$router.push({name:'CardManage',query:{type:1,identify:that.$route.query.type}})
            },
            // 全部提现
            withdrawAll(flag){
                if(flag == 'balance'){
                    this.out_money = Number(this.withdrawInfo.remain_amount);
                    this.deposit_price = '';
                }else if(flag == 'deposit'){
                    this.deposit_price = Number(this.withdrawInfo.deposit_amount); 
                    this.out_money = '';
                }
            },
            // 余额还是押金
            seleWithStatus(flag){
                if(flag == 'balance'){
                    this.withdrawStatus = true;
                }else if(flag == 'deposit'){
                    this.withdrawStatus = false;
                }
            },
            // 提现按钮
            withdrowFn(){
                var that = this;
                var request = {};
                // 判断是余额提现还是押金提现
                if(that.withdrawStatus){
                    var price = that.out_money;
                    if(price < 1){
                        mui.toast('提现金额不能小于1', {duration: "short",type: "div"});
                        return false;
                    }else if(Number(price) > Number(that.withdrawInfo.remain_amount)){
                        mui.toast('提现金额不能大于余额', {duration: "short",type: "div"});
                        return false;
                    }else{
                        request.withdraw_amount = that.out_money;
                    }
                }else{
                    var price = that.deposit_price;
                    if(price < 1){
                        mui.toast('提现金额不能小于1', {duration: "short",type: "div"});
                        return false;
                    }else if(price > that.withdrawInfo.deposit_amount){
                        mui.toast('提现金额不能大于押金', {duration: "short",type: "div"});
                        return false;
                    }else{
                        request.withdraw_amount = that.deposit_amount;
                    }
                }
                request.account_id = that.withdrawInfo.account_id;
                that.showLoading = true;
                that.$axios.post(process.env.API_HOST+"doWithdraw",request).then((res)=>{
                    // console.log(res);
                    if(res.status == 200){
                        if(res.data.code == 200){
                            // that.getData();
                            that.$router.go(-1);
                        }
                        that.showLoading = false;
                        that.out_money = '';
                        that.deposit_amount = '';
                        mui.toast(res.data.msg, {duration: "short",type: "div"});
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            getData(){
                var that = this;
                that.$axios.post(process.env.API_HOST+"withdrawBank").then((res)=>{
                    // console.log(res);
                    if(res.status == 200){
                        if(res.data.code == 200){
                            that.withdrawInfo = res.data.data
                        }
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            }
        },
        mounted(){
            this.getData();
            if(this.$route.query.status == 2){
                this.withdrawStatus = false;
            }
        }
    
    }
</script>
<style scoped>
    .withdraw-title{
        background:#FFFFFF;
        font-size:.26rem;
        color:#333333;
    }
    .withdraw-title div{
        display: inline-block;
        width:49.3%;
        text-align: center;
        line-height: .8rem;
    }
    /* .red-border{
        color:#FF7E4A;
        border-bottom:.04rem solid #FF7E4A;
    } */
    .withdraw-content{
        padding:.2rem;
    }
    .withdraw-cell{
        font-size:.26rem;
        background:#FFFFFF;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #D6D6D6;
        -moz-box-shadow: .06rem .05rem .09rem #D6D6D6;
        box-shadow: .06rem .05rem .09rem #D6D6D6;
        margin-bottom:.2rem;
        padding:0 0 0 .2rem;
        position: relative;
    }
    .left-strip,.right-strip{
        display: inline-block;
    }
    .card-strip{
        line-height:.9rem;
    }
    .left-strip{
        color:#666666;
    }
    .right-strip{
        color:#333333;
        position:absolute;
        right:.2rem;
        top:0;
    }
    .right-strip img{
        width:.13rem;
        height:.24rem;
        margin-left:.17rem;
        vertical-align: middle;
    }
    .right-strip span{
        vertical-align: middle;

    }

    .withdraw-strip{
        line-height:.9rem;
        border-bottom:.01rem solid #E5E5E5;
        position: relative;
    }
    .blue-color{
        color:#4AC0F4;
        font-size:.28rem;
        margin-left:.2rem;
    }

    .hint{
        color:#999999;
        font-size:.24rem;
        text-align:center;
        line-height:.6rem;
    }


    /* 提交申请 */
    .okBtn{
        color:#FFFFFF;
        font-size:.28rem;
        margin:.2rem auto 0;
        width:6.5rem;
        text-align: center;
        line-height: .8rem;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        -webkit-box-shadow: .06rem .05rem .09rem #FD915F;
        -moz-box-shadow: .06rem .05rem .09rem #FD915F;
        box-shadow: .06rem .05rem .09rem #FD915F;
        
    }
    /* ==========input========= */
    input{
        font-size:.26rem;
        border:none;
        text-align:right;
        padding:0;
        margin:0 .03rem 0 0;
        width:3rem;
        line-height: .9rem;
    }
    input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
    }
    input[type="number"]{
        -moz-appearance: textfield;
        width: 89%;
    }
    ::-webkit-input-placeholder { 
        color:#999999;
        font-size:.26rem;
    }
    :-moz-placeholder {
        color:#999999;
        font-size:.26rem;
    }
    ::-moz-placeholder { 
        color:#999999;
        font-size:.26rem;
    }
    :-ms-input-placeholder {
        color:#999999;
        font-size:.26rem;
    }
</style>
